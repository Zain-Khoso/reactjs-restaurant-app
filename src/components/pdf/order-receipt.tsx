import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    padding: 40,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
    paddingBottom: 20,
    borderBottom: '1 solid #e5e5e5',
  },
  brandName: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#c0392b',
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 9,
    color: '#888888',
    marginTop: 3,
  },
  receiptInfo: {
    alignItems: 'flex-end',
  },
  receiptTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  receiptMeta: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 2,
  },
  // Status badge
  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: '#dcfce7',
  },
  statusText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#16a34a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  // Customer info
  infoGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 8,
    color: '#888888',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 10,
    color: '#1a1a1a',
  },
  // Table
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottom: '1 solid #f0f0f0',
  },
  tableRowLast: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  colItem: { flex: 3 },
  colQty: { flex: 1, textAlign: 'center' },
  colPrice: { flex: 1, textAlign: 'right' },
  colTotal: { flex: 1, textAlign: 'right' },
  tableHeaderText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableText: {
    fontSize: 10,
    color: '#1a1a1a',
  },
  // Totals
  totalsContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    paddingVertical: 3,
  },
  totalDivider: {
    width: 200,
    borderBottom: '1 solid #e5e5e5',
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 10,
    color: '#666666',
  },
  totalValue: {
    fontSize: 10,
    color: '#1a1a1a',
  },
  grandTotalLabel: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  grandTotalValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#c0392b',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTop: '1 solid #e5e5e5',
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#aaaaaa',
  },
  thankYou: {
    fontSize: 10,
    fontFamily: 'Helvetica-BoldOblique',
    color: '#c0392b',
  },
});

type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  menuItem: { name: string };
};

type Order = {
  id: string;
  createdAt: Date | string;
  status: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  address: string | null;
  phone: string | null;
  notes: string | null;
  items: OrderItem[];
  user?: { name: string; email: string } | null;
};

function formatPKR(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function OrderReceipt({ order }: { order: Order }) {
  const shortId = order.id.slice(0, 8).toUpperCase();

  return (
    <Document title={`Urban Dish Receipt — ${shortId}`} author="Urban Dish" subject="Order Receipt">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>Urban Dish</Text>
            <Text style={styles.brandTagline}>Your Culinary Journey Starts Here</Text>
          </View>
          <View style={styles.receiptInfo}>
            <Text style={styles.receiptTitle}>Receipt</Text>
            <Text style={styles.receiptMeta}>Order #{shortId}</Text>
            <Text style={styles.receiptMeta}>{formatDate(order.createdAt)}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>
        </View>

        {/* Customer + Delivery Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={styles.infoGrid}>
            {order.user && (
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Customer</Text>
                <Text style={styles.infoValue}>{order.user.name}</Text>
                <Text style={[styles.infoValue, { color: '#666666' }]}>{order.user.email}</Text>
              </View>
            )}
            {order.phone && (
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{order.phone}</Text>
              </View>
            )}
            {order.address && (
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Delivery Address</Text>
                <Text style={styles.infoValue}>{order.address}</Text>
              </View>
            )}
          </View>
          {order.notes && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.infoLabel}>Notes</Text>
              <Text style={styles.infoValue}>{order.notes}</Text>
            </View>
          )}
        </View>

        {/* Items Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items Ordered</Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colItem]}>Item</Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.colPrice]}>Price</Text>
            <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
          </View>

          {/* Items */}
          {order.items.map((item, index) => (
            <View
              key={item.id}
              style={index === order.items.length - 1 ? styles.tableRowLast : styles.tableRow}
            >
              <Text style={[styles.tableText, styles.colItem]}>{item.menuItem.name}</Text>
              <Text style={[styles.tableText, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.tableText, styles.colPrice]}>{formatPKR(item.unitPrice)}</Text>
              <Text style={[styles.tableText, styles.colTotal]}>
                {formatPKR(item.unitPrice * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatPKR(order.subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Fee</Text>
            <Text style={styles.totalValue}>{formatPKR(order.deliveryFee)}</Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>{formatPKR(order.total)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            123 Street, Sukkur, Pakistan • contact@urbandish.com • +92 321 0123456
          </Text>
          <Text style={styles.thankYou}>Thank you!</Text>
        </View>
      </Page>
    </Document>
  );
}
