'use client';

// Lib Imports
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
// Shadcn Imports
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Textarea } from '@/components/shadcn/textarea';
import { Label } from '@/components/shadcn/label';
import { Card, CardContent } from '@/components/shadcn/card';
import { Separator } from '@/components/shadcn/separator';
// Animations
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
// Typography
import { H2, H3, Muted, SectionLabel } from '@/components/shadcn/typography';

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Street, Sukkur, Pakistan',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 321 0123456',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@urbandish.com',
  },
];

const HOURS = [
  { day: 'Monday – Saturday', time: '7:00 am – 11:00 pm' },
  { day: 'Sunday', time: '12:00 pm – 9:00 pm' },
];

export function ContactSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left — Contact Form */}
        <FadeIn direction="right" className="flex flex-col gap-6">
          <div>
            <SectionLabel>Send a Message</SectionLabel>
            <H2 className="mt-1">Let&apos;s talk.</H2>
          </div>

          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your message here..."
                rows={5}
                className="resize-none"
              />
            </div>
            <Button type="submit" className="w-full sm:w-fit">
              Send Message
            </Button>
          </form>
        </FadeIn>

        {/* Right — Info + Hours */}
        <FadeIn direction="left" className="flex flex-col gap-8">
          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <div>
              <SectionLabel>Contact Info</SectionLabel>
              <H3 className="mt-1">Find us here.</H3>
            </div>
            <StaggerChildren className="flex flex-col gap-3">
              {CONTACT_INFO.map((info) => (
                <StaggerItem key={info.label}>
                  <Card className="border border-border shadow-sm">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <info.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <Muted className="text-xs">{info.label}</Muted>
                        <p className="text-sm font-medium">{info.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>

          <Separator />

          {/* Opening Hours */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <H3 className="text-lg">Opening Hours</H3>
            </div>
            <div className="flex flex-col gap-3">
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <Muted className="font-medium text-foreground text-sm">{h.day}</Muted>
                  <Muted className="text-sm">{h.time}</Muted>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
