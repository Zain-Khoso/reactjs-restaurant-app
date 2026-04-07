'use client';

import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Separator } from '@/components/shadcn/separator';
import { Card, CardContent } from '@/components/shadcn/card';
import { FadeIn } from '@/components/animations';
import { H3, Muted } from '@/components/shadcn/typography';
import { User, Mail, Phone, Lock } from 'lucide-react';

export function AccountProfile() {
  return (
    <FadeIn className="flex flex-col gap-6 max-w-2xl">
      {/* Personal Info */}
      <Card className="border border-border shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6">
          <div>
            <H3 className="text-base">Personal Information</H3>
            <Muted className="text-xs mt-1">Update your name, email and phone number.</Muted>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-name">
                <User className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Full Name
              </Label>
              <Input id="profile-name" defaultValue="John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-email">
                <Mail className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Email
              </Label>
              <Input id="profile-email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-phone">
                <Phone className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Phone
              </Label>
              <Input id="profile-phone" type="tel" defaultValue="+92 300 0000000" />
            </div>
          </div>
          <Button className="w-fit">Save Changes</Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Change Password */}
      <Card className="border border-border shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6">
          <div>
            <H3 className="text-base">Change Password</H3>
            <Muted className="text-xs mt-1">Choose a strong password for your account.</Muted>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="current-password">
                <Lock className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Current Password
              </Label>
              <Input id="current-password" type="password" placeholder="••••••••" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-password">
                <Lock className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                New Password
              </Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm-password">
                <Lock className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Confirm New Password
              </Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button className="w-fit">Update Password</Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Danger Zone */}
      <Card className="border border-destructive/30 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-6">
          <div>
            <H3 className="text-base text-destructive">Danger Zone</H3>
            <Muted className="text-xs mt-1">
              Permanently delete your account and all associated data. This action cannot be undone.
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
