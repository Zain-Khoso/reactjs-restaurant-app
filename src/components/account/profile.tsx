'use client';

import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Separator } from '@/components/shadcn/separator';
import { Card, CardContent } from '@/components/shadcn/card';
import { FadeIn } from '@/components/animations';
import { H3, Muted } from '@/components/shadcn/typography';
import { User, Mail, Phone, Lock } from 'lucide-react';
import { updateProfile } from '@/actions/account';
import React from 'react';

export function AccountProfile({ user }: { user: any }) {
  const [success, setSuccess] = React.useState(false);

  const handleProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    await updateProfile({
      name: data.get('name') as string,
      phone: data.get('phone') as string,
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <FadeIn className="flex flex-col gap-6 max-w-2xl">
      <Card className="border border-border shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6">
          <div>
            <H3 className="text-base">Personal Information</H3>
            <Muted className="text-xs mt-1">Update your name and phone number.</Muted>
          </div>
          <form onSubmit={handleProfile} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">
                <User className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Full Name
              </Label>
              <Input id="name" name="name" defaultValue={user.name} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">
                <Mail className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Email
              </Label>
              <Input id="email" value={user.email} disabled className="opacity-60" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">
                <Phone className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Phone
              </Label>
              <Input id="phone" name="phone" defaultValue={user.phone ?? ''} />
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <Button type="submit" className="w-fit">
                Save Changes
              </Button>
              {success && (
                <p className="text-sm text-green-600 dark:text-green-400">Saved successfully.</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border border-destructive/30 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-6">
          <div>
            <H3 className="text-base text-destructive">Danger Zone</H3>
            <Muted className="text-xs mt-1">
              Permanently delete your account and all associated data.
            </Muted>
          </div>
          <Button variant="destructive" className="w-fit">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
