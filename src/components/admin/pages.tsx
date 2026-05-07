'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { updatePageContent } from '@/actions/admin';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import { Card, CardContent } from '@/components/shadcn/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/tabs';
import { FadeIn } from '@/components/animations';
import { H2, H3, Muted, SectionLabel } from '@/components/shadcn/typography';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { PageContent } from '@/prisma/client';

export function AdminPages({ pages }: { pages: PageContent[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <SectionLabel>Admin</SectionLabel>
        <H2 className="mt-1">Pages</H2>
        <Muted className="mt-1 text-sm">
          Manage content for Terms & Conditions and Privacy Policy pages.
        </Muted>
      </FadeIn>

      <Tabs defaultValue={pages[0]?.key ?? 'terms'} className="w-full">
        <FadeIn>
          <TabsList className="mb-6 h-auto gap-1 bg-muted p-1">
            {pages.map((page) => (
              <TabsTrigger key={page.key} value={page.key}>
                {page.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </FadeIn>

        {pages.map((page) => (
          <TabsContent key={page.key} value={page.key}>
            <PageEditor page={page} onSave={() => router.refresh()} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function PageEditor({ page, onSave }: { page: PageContent; onSave: () => void }) {
  const [title, setTitle] = React.useState(page.title);
  const [content, setContent] = React.useState(page.content);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState('');
  const [preview, setPreview] = React.useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setSaving(true);
    setError('');
    const result = await updatePageContent(page.key, { title, content });
    setSaving(false);
    if (result.success) {
      setSaved(true);
      onSave();
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <FadeIn className="flex flex-col gap-6 max-w-4xl">
      <Card className="border border-border shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <H3 className="text-base">{page.title}</H3>
              <Muted className="text-xs mt-0.5">
                Last updated: {format(new Date(page.updatedAt), 'PPP')}
              </Muted>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => setPreview((v) => !v)}
              >
                <Eye className="h-3.5 w-3.5" />
                {preview ? 'Edit' : 'Preview'}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/${page.key}`} target="_blank">
                  View Live
                </Link>
              </Button>
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor={`title-${page.key}`}>Page Title</Label>
            <Input
              id={`title-${page.key}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="Page title"
            />
          </div>

          {/* Content — Edit or Preview */}
          <div className="flex flex-col gap-2">
            <Label>{preview ? 'Preview' : 'Content (HTML)'}</Label>
            {preview ? (
              <div
                className="prose prose-neutral dark:prose-invert max-w-none min-h-[400px] p-4 rounded-lg border border-border bg-muted/30 prose-headings:font-semibold prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="font-mono text-sm resize-y"
                placeholder="<h2>Section Title</h2><p>Content here...</p>"
              />
            )}
            <Muted className="text-xs">
              Use standard HTML tags: &lt;h2&gt;, &lt;p&gt;, &lt;a href=""&gt;, &lt;ul&gt;,
              &lt;li&gt;, &lt;strong&gt;
            </Muted>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            {saved && (
              <p className="text-sm text-green-600 dark:text-green-400">Saved and published.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
