'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/tabs';
import { ShoppingBag, CalendarCheck, UserCog } from 'lucide-react';
import { AccountOrders } from '@/components/account/orders';
import { AccountReservations } from '@/components/account/reservation';
import { AccountProfile } from '@/components/account/profile';
import { FadeIn } from '@/components/animations';

export function AccountTabs() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
      <FadeIn>
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-8 h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="reservations" className="gap-2">
              <CalendarCheck className="h-4 w-4" />
              Reservations
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <UserCog className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <AccountOrders />
          </TabsContent>
          <TabsContent value="reservations">
            <AccountReservations />
          </TabsContent>
          <TabsContent value="profile">
            <AccountProfile />
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
}
