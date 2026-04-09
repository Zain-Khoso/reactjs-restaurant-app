'use client';

import * as React from 'react';
import Image from 'next/image';
import { Search, Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { Badge } from '@/components/shadcn/badge';
import { Card, CardContent } from '@/components/shadcn/card';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import { Switch } from '@/components/shadcn/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { H2, H4, Muted, SectionLabel } from '@/components/shadcn/typography';
import { createMenuItem, updateMenuItem, deleteMenuItem } from '@/actions/admin';
import { uploadImage } from '@/actions/upload';

type Category = { id: string; name: string; slug: string };
type MenuItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string | null;
  category: Category;
  tags: string[];
  featured: boolean;
  available: boolean;
};

const CATEGORIES_FILTER = ['ALL', 'starters', 'mains', 'desserts', 'drinks'];

const DEFAULT_FORM = {
  name: '',
  slug: '',
  description: '',
  price: '',
  categoryId: '',
  tags: '',
  featured: false,
  available: true,
  image: '',
};

export function AdminMenu({ items, categories }: { items: MenuItem[]; categories: Category[] }) {
  const [search, setSearch] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('ALL');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<MenuItem | null>(null);
  const [form, setForm] = React.useState(DEFAULT_FORM);
  const [uploading, setUploading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState<string | null>(null);

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || item.category.slug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openCreate = () => {
    setEditingItem(null);
    setForm(DEFAULT_FORM);
    setDialogOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price.toString(),
      categoryId: item.category.id,
      tags: item.tags.join(', '),
      featured: item.featured,
      available: item.available,
      image: item.image ?? '',
    });
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const result = await uploadImage(fd);
    if (result.url) setForm((f) => ({ ...f, image: result.url! }));
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      description: form.description,
      price: parseFloat(form.price),
      categoryId: form.categoryId,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured: form.featured,
      available: form.available,
      image: form.image || undefined,
    };

    if (editingItem) {
      await updateMenuItem(editingItem.id, data);
    } else {
      await createMenuItem(data);
    }

    setSaving(false);
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteMenuItem(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <FadeIn className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <SectionLabel>Admin</SectionLabel>
          <H2 className="mt-1">Menu</H2>
        </div>
        <Button className="gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </FadeIn>

      {/* Filters */}
      <FadeIn className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menu..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES_FILTER.map((c) => (
              <SelectItem key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FadeIn>

      {/* Grid */}
      <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((item) => (
          <StaggerItem key={item.id}>
            <Card className="border border-border shadow-sm overflow-hidden group">
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <Muted className="text-xs">No image</Muted>
                  </div>
                )}
                <div className="absolute top-2 left-2 flex gap-1.5">
                  {item.featured && <Badge className="text-xs">Featured</Badge>}
                  {!item.available && (
                    <Badge variant="destructive" className="text-xs">
                      Unavailable
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <H4 className="text-sm">{item.name}</H4>
                    <Muted className="text-xs capitalize">{item.category.name}</Muted>
                  </div>
                  <p className="text-sm font-bold text-primary shrink-0">
                    Rs {item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5"
                    onClick={() => openEdit(item)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => setDeleteConfirm(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 pt-2">
            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <Label>Image</Label>
              <div className="flex items-center gap-3">
                {form.image && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted shrink-0">
                    <Image
                      src={form.image}
                      alt="Preview"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                )}
                <Label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? 'Uploading...' : 'Upload image'}
                </Label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="item-name">Name</Label>
              <Input
                id="item-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Margherita Pizza"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="item-desc">Description</Label>
              <Textarea
                id="item-desc"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Classic tomato sauce, fresh mozzarella..."
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Price + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="item-price">Price (Rs)</Label>
                <Input
                  id="item-price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  placeholder="1299"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select
                  value={form.categoryId}
                  onValueChange={(val) => setForm((f) => ({ ...f, categoryId: val }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="item-tags">
                Tags <span className="text-muted-foreground text-xs">(comma separated)</span>
              </Label>
              <Input
                id="item-tags"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="Vegetarian, Spicy, Gluten Free"
              />
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(val) => setForm((f) => ({ ...f, featured: val }))}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="available"
                  checked={form.available}
                  onCheckedChange={(val) => setForm((f) => ({ ...f, available: val }))}
                />
                <Label htmlFor="available">Available</Label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <Button className="flex-1" onClick={handleSave} disabled={saving || uploading}>
                {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Item'}
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete menu item?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. The item will be permanently removed from the menu.
          </p>
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
    </div>
  );
}
