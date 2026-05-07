'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import { Card, CardContent } from '@/components/shadcn/card';
import { Badge } from '@/components/shadcn/badge';
import { Switch } from '@/components/shadcn/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { H2, H3, H4, Muted, SectionLabel } from '@/components/shadcn/typography';
import { Separator } from '@/components/shadcn/separator';
import { ImageCropper } from '@/components/shadcn/image-cropper';
import { uploadImage } from '@/actions/upload';
import {
  createChef,
  updateChef,
  deleteChef,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateMenuItem,
} from '@/actions/admin';
import { Chef, Testimonial, MenuItem } from '@/prisma/client';

const DEFAULT_CHEF = { name: '', cuisine: '', image: '', sortOrder: 0 };
const DEFAULT_TESTIMONIAL = {
  name: '',
  location: '',
  comment: '',
  image: '',
  sortOrder: 0,
};

export function AdminHomeContent({
  chefs,
  testimonials,
  featuredDishes,
}: {
  chefs: Chef[];
  testimonials: Testimonial[];
  featuredDishes: MenuItem[];
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <SectionLabel>Admin</SectionLabel>
        <H2 className="mt-1">Home Content</H2>
        <Muted className="text-sm mt-1">
          Manage chefs, testimonials, and featured dishes shown on the home page.
        </Muted>
      </FadeIn>

      <Tabs defaultValue="chefs">
        <FadeIn>
          <TabsList className="mb-6 h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="chefs">Chefs</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="featured">Featured Dishes</TabsTrigger>
          </TabsList>
        </FadeIn>

        <TabsContent value="chefs">
          <ChefsManager chefs={chefs} onSave={() => router.refresh()} />
        </TabsContent>
        <TabsContent value="testimonials">
          <TestimonialsManager testimonials={testimonials} onSave={() => router.refresh()} />
        </TabsContent>
        <TabsContent value="featured">
          <FeaturedManager dishes={featuredDishes} onSave={() => router.refresh()} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Chefs Manager ─────────────────────────────────────────────

function ChefsManager({ chefs, onSave }: { chefs: Chef[]; onSave: () => void }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingChef, setEditingChef] = React.useState<Chef | null>(null);
  const [form, setForm] = React.useState(DEFAULT_CHEF);
  const [saving, setSaving] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [rawImage, setRawImage] = React.useState('');
  const [cropperOpen, setCropperOpen] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState<string | null>(null);

  const openCreate = () => {
    setEditingChef(null);
    setForm(DEFAULT_CHEF);
    setDialogOpen(true);
  };

  const openEdit = (chef: Chef) => {
    setEditingChef(chef);
    setForm({
      name: chef.name,
      cuisine: chef.cuisine,
      image: chef.image ?? '',
      sortOrder: chef.sortOrder,
    });
    setDialogOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(reader.result as string);
      setCropperOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCropComplete = async (blob: Blob) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', blob, 'chef.webp');
    const result = await uploadImage(fd);
    if (result.url) setForm((f) => ({ ...f, image: result.url! }));
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editingChef) {
      await updateChef(editingChef.id, form);
    } else {
      await createChef(form);
    }
    setSaving(false);
    setDialogOpen(false);
    onSave();
  };

  const handleDelete = async (id: string) => {
    await deleteChef(id);
    setDeleteConfirm(null);
    onSave();
  };

  const handleToggleActive = async (chef: Chef) => {
    await updateChef(chef.id, { active: !chef.active });
    onSave();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <H3 className="text-base">Chefs ({chefs.length})</H3>
        <Button className="gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add Chef
        </Button>
      </div>

      <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {chefs.map((chef) => (
          <StaggerItem key={chef.id}>
            <Card className="border border-border shadow-sm">
              <CardContent className="flex flex-col items-center gap-3 p-4 text-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
                  {chef.image ? (
                    <Image
                      src={chef.image}
                      alt={chef.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <Muted className="text-xs">No img</Muted>
                    </div>
                  )}
                </div>
                <div>
                  <Muted className="text-xs">{chef.cuisine}</Muted>
                  <H4 className="text-sm mt-0.5">{chef.name}</H4>
                </div>
                <div className="flex items-center gap-1.5">
                  <Switch
                    checked={chef.active}
                    onCheckedChange={() => handleToggleActive(chef)}
                    className="scale-75"
                  />
                  <Muted className="text-xs">{chef.active ? 'Active' : 'Hidden'}</Muted>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => openEdit(chef)}
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeleteConfirm(chef.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Chef Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editingChef ? 'Edit Chef' : 'Add Chef'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 pt-2">
            {/* Image */}
            <div className="flex flex-col gap-2">
              <Label>Photo</Label>
              <div className="flex items-center gap-3">
                {form.image && (
                  <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted shrink-0">
                    <Image
                      src={form.image}
                      alt="Preview"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                )}
                <Label
                  htmlFor="chef-image"
                  className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg px-3 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Upload className="h-3.5 w-3.5" />
                  {uploading ? 'Uploading...' : 'Upload photo'}
                </Label>
                <input
                  id="chef-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Chef John Doe"
                maxLength={50}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Cuisine</Label>
              <Input
                value={form.cuisine}
                onChange={(e) => setForm((f) => ({ ...f, cuisine: e.target.value }))}
                placeholder="Italian"
                maxLength={50}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))
                }
                min={0}
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button className="flex-1" onClick={handleSave} disabled={saving || uploading}>
                {saving ? 'Saving...' : editingChef ? 'Save Changes' : 'Add Chef'}
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete chef?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cropper */}
      <ImageCropper
        imageSrc={rawImage}
        aspectRatio={1}
        open={cropperOpen}
        onClose={() => setCropperOpen(false)}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}

// ── Testimonials Manager ──────────────────────────────────────

function TestimonialsManager({
  testimonials,
  onSave,
}: {
  testimonials: Testimonial[];
  onSave: () => void;
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<Testimonial | null>(null);
  const [form, setForm] = React.useState(DEFAULT_TESTIMONIAL);
  const [saving, setSaving] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [rawImage, setRawImage] = React.useState('');
  const [cropperOpen, setCropperOpen] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState<string | null>(null);

  const openCreate = () => {
    setEditingItem(null);
    setForm(DEFAULT_TESTIMONIAL);
    setDialogOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      location: item.location,
      comment: item.comment,
      image: item.image ?? '',
      sortOrder: item.sortOrder,
    });
    setDialogOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(reader.result as string);
      setCropperOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCropComplete = async (blob: Blob) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', blob, 'testimonial.webp');
    const result = await uploadImage(fd);
    if (result.url) setForm((f) => ({ ...f, image: result.url! }));
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editingItem) {
      await updateTestimonial(editingItem.id, form);
    } else {
      await createTestimonial(form);
    }
    setSaving(false);
    setDialogOpen(false);
    onSave();
  };

  const handleDelete = async (id: string) => {
    await deleteTestimonial(id);
    setDeleteConfirm(null);
    onSave();
  };

  const handleToggleActive = async (item: Testimonial) => {
    await updateTestimonial(item.id, { active: !item.active });
    onSave();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <H3 className="text-base">Testimonials ({testimonials.length})</H3>
        <Button className="gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <StaggerChildren className="flex flex-col gap-4">
        {testimonials.map((item) => (
          <StaggerItem key={item.id}>
            <Card className="border border-border shadow-sm">
              <CardContent className="flex items-start justify-between gap-4 p-4">
                <div className="flex items-start gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <H4 className="text-sm">{item.name}</H4>
                      <Muted className="text-xs">— {item.location}</Muted>
                      {!item.active && (
                        <Badge variant="secondary" className="text-xs">
                          Hidden
                        </Badge>
                      )}
                    </div>
                    <Muted className="text-xs line-clamp-2">{item.comment}</Muted>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Switch
                    checked={item.active}
                    onCheckedChange={() => handleToggleActive(item)}
                    className="scale-75"
                  />
                  <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeleteConfirm(item.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Testimonial Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <Label>Photo</Label>
              <div className="flex items-center gap-3">
                {form.image && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted shrink-0">
                    <Image
                      src={form.image}
                      alt="Preview"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                )}
                <Label
                  htmlFor="testimonial-image"
                  className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg px-3 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Upload className="h-3.5 w-3.5" />
                  {uploading ? 'Uploading...' : 'Upload photo'}
                </Label>
                <input
                  id="testimonial-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                maxLength={50}
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                maxLength={50}
                placeholder="Spain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Comment</Label>
              <Textarea
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                maxLength={300}
                rows={3}
                className="resize-none"
                placeholder="The food was amazing..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))
                }
                min={0}
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button className="flex-1" onClick={handleSave} disabled={saving || uploading}>
                {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add'}
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete testimonial?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This cannot be undone.</p>
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ImageCropper
        imageSrc={rawImage}
        aspectRatio={1}
        open={cropperOpen}
        onClose={() => setCropperOpen(false)}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}

// ── Featured Dishes Manager ───────────────────────────────────

function FeaturedManager({ dishes, onSave }: { dishes: MenuItem[]; onSave: () => void }) {
  const handleToggleFeatured = async (dish: MenuItem) => {
    await updateMenuItem(dish.id, { featured: !dish.featured });
    onSave();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <H3 className="text-base">Featured Dishes</H3>
        <Muted className="text-sm">
          Toggle which dishes appear in the Best Dishes section on the home page.
        </Muted>
      </div>

      <StaggerChildren className="flex flex-col gap-3">
        {dishes.map((dish) => (
          <StaggerItem key={dish.id}>
            <Card className="border border-border shadow-sm">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {dish.image ? (
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted" />
                    )}
                  </div>
                  <H4 className="text-sm">{dish.name}</H4>
                </div>
                <div className="flex items-center gap-2">
                  {dish.featured && <Badge className="text-xs">Featured</Badge>}
                  <Switch
                    checked={dish.featured}
                    onCheckedChange={() => handleToggleFeatured(dish)}
                  />
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
