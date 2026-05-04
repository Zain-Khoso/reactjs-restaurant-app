import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { createElement } from 'react';
import prisma from '@/utils/prisma';
import { getSession } from '@/utils/session';
import { headers } from 'next/headers';
import { OrderReceipt } from '@/components/pdf/order-receipt';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  // Auth check
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch order
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      items: {
        include: { menuItem: true },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  // Only allow the order owner or an admin
  const isOwner = order.userId === session.user.id;
  const isAdmin = session.user.role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Generate PDF
  const buffer = await renderToBuffer(createElement(OrderReceipt, { order: order as any }));

  const shortId = orderId.slice(0, 8).toUpperCase();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="urban-dish-receipt-${shortId}.pdf"`,
      'Content-Length': buffer.length.toString(),
    },
  });
}
