'use server';

import Stripe from 'stripe';
import { getUser } from '@/utils/session';
import prisma from '@/utils/prisma';
import { getDeliveryFee } from './settings';
import { sanitizeInput, sanitizeOptional } from '@/utils/sanitize';
import { checkoutSchema } from '@/utils/validations';
import { CartItem } from '@/store/cart';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(input: {
  items: CartItem[];
  address: string;
  phone: string;
  notes?: string;
}) {
  try {
    const user = await getUser();
    const DELIVERY_FEE = await getDeliveryFee();

    // Validate all menu items exist in DB
    const menuItemIds = input.items.map((i) => i.id);
    const existingItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
      select: { id: true },
    });

    const existingIds = new Set(existingItems.map((i) => i.id));
    const invalidItems = input.items.filter((i) => !existingIds.has(i.id));

    if (invalidItems.length > 0) {
      return {
        url: null,
        error: `Some items in your cart are no longer available: ${invalidItems.map((i) => i.name).join(', ')}. Please remove them and try again.`,
      };
    }

    const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + DELIVERY_FEE;

    const order = await prisma.order.create({
      data: {
        userId: user?.id ?? null,
        status: 'PENDING',
        subtotal,
        total,
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      ...(user?.email && { customer_email: user.email }),
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: true },
      line_items: [
        ...input.items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
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
      metadata: { orderId: order.id },
      success_url: `${process.env.BETTER_AUTH_URL}/order/success?orderId=${order.id}`,
      cancel_url: `${process.env.BETTER_AUTH_URL}/order/cancel?orderId=${order.id}`,
    });

    return { url: session.url, orderId: order.id };
  } catch (error) {
    console.error('createCheckoutSession error:', error);
    return { url: null, error: 'Failed to create checkout session.' };
  }
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
