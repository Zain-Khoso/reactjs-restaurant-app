'use server';

import Stripe from 'stripe';
import { getUser } from '@/utils/session';
import prisma from '@/utils/prisma';
import { getDeliveryFee } from './settings';
import { sanitizeInput, sanitizeOptional } from '@/utils/sanitize';
import { checkoutSchema } from '@/utils/validations';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
};

export async function createCheckoutSession(input: {
  items: CartItem[];
  address: string;
  phone: string;
  notes?: string;
}) {
  // Validate
  const parsed = checkoutSchema.safeParse({
    deliveryName: 'Guest', // name not collected separately
    deliveryPhone: input.phone,
    deliveryAddress: input.address,
    deliveryNotes: input.notes,
  });

  if (!parsed.success) {
    return {
      url: null,
      error: parsed.error.message ?? 'Invalid input.',
    };
  }

  const user = await getUser();
  const DELIVERY_FEE = await getDeliveryFee();

  const order = await prisma.order.create({
    data: {
      userId: user?.id ?? null,
      status: 'PENDING',
      subtotal: input.items.reduce((s, i) => s + i.price * i.quantity, 0),
      total: input.items.reduce((s, i) => s + i.price * i.quantity, 0) + DELIVERY_FEE,
      deliveryFee: DELIVERY_FEE,
      address: sanitizeInput(input.address),
      phone: sanitizeInput(input.phone),
      notes: sanitizeOptional(input.notes),
      items: {
        create: input.items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      },
    },
  });

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    ...(user?.email && { customer_email: user.email }),
    billing_address_collection: 'auto',
    phone_number_collection: {
      enabled: true,
    },
    line_items: [
      ...input.items.map((item) => ({
        price_data: {
          currency: 'pkr',
          product_data: {
            name: item.name,
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: 'pkr',
          product_data: { name: 'Delivery Fee' },
          unit_amount: DELIVERY_FEE * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      orderId: order.id,
    },
    success_url: `${process.env.BETTER_AUTH_URL}/order/success?orderId=${order.id}`,
    cancel_url: `${process.env.BETTER_AUTH_URL}/order/cancel?orderId=${order.id}`,
  });

  return { url: session.url, orderId: order.id };
}

export async function cancelPendingOrder(orderId: string) {
  try {
    await prisma.order.update({
      where: { id: orderId, status: 'PENDING' },
      data: { status: 'CANCELLED' },
    });
  } catch {
    // Order may not exist or already updated — ignore
  }
}
