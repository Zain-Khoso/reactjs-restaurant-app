'use client';

import * as React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import { Card, CardContent } from '@/components/shadcn/card';
import { Separator } from '@/components/shadcn/separator';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { H2, H3, Muted, SectionLabel } from '@/components/shadcn/typography';
import { submitContactForm } from '@/actions/contact';

const CONTACT_INFO = [
  { icon: MapPin, label: 'Address', value: '123 Street, Sukkur, Pakistan' },
  { icon: Phone, label: 'Phone', value: '+92 321 0123456' },
  { icon: Mail, label: 'Email', value: 'contact@urbandish.com' },
];

const HOURS = [
  { day: 'Monday – Saturday', time: '7:00 am – 11:00 pm' },
  { day: 'Sunday', time: '12:00 pm – 9:00 pm' },
];

export function ContactSection() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await submitContactForm({ name, email, subject, message });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      setError(result.error ?? 'Something went wrong.');
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left — Form */}
        <FadeIn direction="right" className="flex flex-col gap-6">
          <div>
            <SectionLabel>Send a Message</SectionLabel>
            <H2 className="mt-1">Let&apos;s talk.</H2>
          </div>

          {success ? (
            <div className="flex flex-col gap-2 p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Message sent successfully!
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                We&apos;ll get back to you as soon as possible.
              </p>
              <Button variant="outline" className="w-fit mt-2" onClick={() => setSuccess(false)}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  className="resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full sm:w-fit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </FadeIn>

        {/* Right — Info + Hours */}
        <FadeIn direction="left" className="flex flex-col gap-8">
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
