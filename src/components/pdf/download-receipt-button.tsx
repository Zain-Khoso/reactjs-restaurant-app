'use client';

import * as React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/shadcn/button';

export function DownloadReceiptButton({
  orderId,
  variant = 'outline',
  size = 'sm',
}: {
  orderId: string;
  variant?: 'outline' | 'default' | 'ghost';
  size?: 'sm' | 'default';
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/receipt/${orderId}`);
      if (!response.ok) throw new Error('Failed to generate receipt');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `urban-dish-receipt-${orderId.slice(0, 8).toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={loading}
      className="gap-1.5"
    >
      <Download className="h-3.5 w-3.5" />
      {loading ? 'Generating...' : 'Receipt'}
    </Button>
  );
}
