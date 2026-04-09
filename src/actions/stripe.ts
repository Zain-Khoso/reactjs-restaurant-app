'use server';

import Stripe from 'stripe';
import { getUser } from '@/utils/session';
import prisma from '@/utils/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const DELIVERY_FEE = 150;

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
};

type CheckoutInput = {
  items: CartItem[];
  address: string;
  phone: string;
  notes?: string;
};

export async function createCheckoutSession(input: CheckoutInput) {
  const user = await getUser();

  const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  // Create order in DB first with PENDING status
  const order = await prisma.order.create({
    data: {
      userId: user?.id ?? null,
      status: 'PENDING',
      subtotal,
      total,
      deliveryFee: DELIVERY_FEE,
      address: input.address,
      phone: input.phone,
      notes: input.notes ?? null,
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
    line_items: [
      ...input.items.map((item) => ({
        price_data: {
          currency: 'usd',
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
          currency: 'usd',
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
    cancel_url: `${process.env.BETTER_AUTH_URL}/order`,
  });

  return { url: session.url, orderId: order.id };
}
