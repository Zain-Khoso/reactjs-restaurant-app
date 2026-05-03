'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileInput } from '@/utils/validations';
import { updateProfile } from '@/actions/account';
import { useUserStore } from '@/store/user';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Separator } from '@/components/shadcn/separator';
import { Card, CardContent } from '@/components/shadcn/card';
import { FadeIn } from '@/components/animations';
import { H3, Muted } from '@/components/shadcn/typography';
import { User, Mail, Phone, Lock } from 'lucide-react';
import React from 'react';

export function AccountProfile({ user }: { user: any }) {
  const updateUser = useUserStore((s) => s.updateUser);
  const [saved, setSaved] = React.useState(false);
  const [serverError, setServerError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? '',
      phone: user.phone ?? '',
    },
  });

  const onSubmit = async (data: ProfileInput) => {
    setServerError('');
    const result = await updateProfile({
      name: data.name,
      phone: data.phone ?? '',
    });
    if (result.success) {
      updateUser({ name: data.name, phone: data.phone });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setServerError(result.error ?? 'Something went wrong.');
    }
  };

  return (
    <FadeIn className="flex flex-col gap-6 max-w-2xl">
      <Card className="border border-border shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6">
          <div>
            <H3 className="text-base">Personal Information</H3>
            <Muted className="text-xs mt-1">Update your name and phone number.</Muted>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-name">
                <User className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Full Name
              </Label>
              <Input id="profile-name" maxLength={50} {...register('name')} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-email">
                <Mail className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Email
              </Label>
              <Input id="profile-email" value={user.email} disabled className="opacity-60" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-phone">
                <Phone className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Phone
              </Label>
              <Input id="profile-phone" type="tel" maxLength={20} {...register('phone')} />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <Button type="submit" className="w-fit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              {saved && (
                <p className="text-sm text-green-600 dark:text-green-400">Saved successfully.</p>
              )}
              {serverError && <p className="text-sm text-destructive">{serverError}</p>}
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
