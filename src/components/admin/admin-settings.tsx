'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateDeliveryFee } from '@/actions/settings';
import { useSettingsStore } from '@/store/settings';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Card, CardContent } from '@/components/shadcn/card';
import { Separator } from '@/components/shadcn/separator';
import { FadeIn } from '@/components/animations';
import { H2, H3, Muted, SectionLabel } from '@/components/shadcn/typography';
import { Truck } from 'lucide-react';

const settingsSchema = z.object({
  deliveryFee: z
    .string()
    .min(1, 'Required')
    .refine(
      (val) => !isNaN(parseInt(val)) && parseInt(val) >= 0,
      'Must be a valid non-negative number'
    ),
});

type SettingsInput = z.infer<typeof settingsSchema>;

export function AdminSettings({ deliveryFee }: { deliveryFee: number }) {
  const setDeliveryFee = useSettingsStore((s) => s.setDeliveryFee);
  const [saved, setSaved] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { deliveryFee: deliveryFee.toString() },
  });

  const onSubmit = async (data: SettingsInput) => {
    const fee = parseInt(data.deliveryFee);
    await updateDeliveryFee(fee);
    setDeliveryFee(fee);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <FadeIn>
        <SectionLabel>Admin</SectionLabel>
        <H2 className="mt-1">Settings</H2>
      </FadeIn>

      {/* Delivery Settings */}
      <FadeIn delay={0.1}>
        <Card className="border border-border shadow-sm">
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <H3 className="text-base">Delivery Settings</H3>
                <Muted className="text-xs mt-0.5">
                  Manage delivery fee applied to all orders at checkout.
                </Muted>
              </div>
            </div>

            <Separator />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="deliveryFee">Delivery Fee (Rs)</Label>
                <div className="flex items-center gap-3 max-w-xs">
                  <Input
                    id="deliveryFee"
                    type="number"
                    min={0}
                    max={10000}
                    {...register('deliveryFee')}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Update'}
                  </Button>
                </div>
                {errors.deliveryFee && (
                  <p className="text-xs text-destructive">{errors.deliveryFee.message}</p>
                )}
                {saved && (
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Delivery fee updated successfully.
                  </p>
                )}
              </div>
              <Muted className="text-xs">
                Currently applied to all orders: Rs {deliveryFee.toLocaleString()}
              </Muted>
            </form>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
