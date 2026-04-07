'use client';

import * as React from 'react';
import Image from 'next/image';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { Badge } from '@/components/shadcn/badge';
import { Card, CardContent } from '@/components/shadcn/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { H2, H4, Muted, SectionLabel } from '@/components/shadcn/typography';

const CATEGORIES = ['ALL', 'starters', 'mains', 'desserts', 'drinks'];

const MENU_ITEMS = [
  {
    id: '1',
    name: 'Margherita Pizza',
    category: 'mains',
    price: 1299,
    image: '/images/gallery/dishes/1.webp',
    available: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Spaghetti Carbonara',
    category: 'mains',
    price: 1099,
    image: '/images/gallery/dishes/2.webp',
    available: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Classic Cheeseburger',
    category: 'mains',
    price: 999,
    image: '/images/gallery/dishes/3.webp',
    available: true,
    featured: false,
  },
  {
    id: '4',
    name: 'Sushi Platter',
    category: 'mains',
    price: 1599,
    image: '/images/gallery/dishes/4.webp',
    available: false,
    featured: true,
  },
  {
    id: '5',
    name: 'Bruschetta',
    category: 'starters',
    price: 499,
    image: '/images/gallery/dishes/1.webp',
    available: true,
    featured: false,
  },
  {
    id: '6',
    name: 'Chicken Wings',
    category: 'starters',
    price: 799,
    image: '/images/gallery/dishes/2.webp',
    available: true,
    featured: false,
  },
  {
    id: '7',
    name: 'Tiramisu',
    category: 'desserts',
    price: 599,
    image: '/images/gallery/dishes/3.webp',
    available: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Fresh Lemonade',
    category: 'drinks',
    price: 299,
    image: '/images/gallery/dishes/4.webp',
    available: true,
    featured: false,
  },
];

export function AdminMenu() {
  const [search, setSearch] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('ALL');

  const filtered = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-8">
      <FadeIn className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <SectionLabel>Admin</SectionLabel>
          <H2 className="mt-1">Menu</H2>
        </div>
        <Button className="gap-2">
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
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
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
              <div className="relative aspect-4/3 bg-muted overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
                    <Muted className="text-xs capitalize">{item.category}</Muted>
                  </div>
                  <p className="text-sm font-bold text-primary shrink-0">
                    Rs {item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="gap-1.5">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
