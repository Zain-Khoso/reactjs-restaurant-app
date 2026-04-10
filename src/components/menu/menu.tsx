'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/shadcn/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/shadcn/tabs';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { MenuCard } from '@/components/menu/card';
import { Muted } from '@/components/shadcn/typography';
import { Category, MenuItem } from '@/prisma/client';

interface MenuSectionProps {
  items: MenuItem[];
  categories: Category[];
}

export function MenuSection({ items, categories }: MenuSectionProps) {
  const [search, setSearch] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');

  const filtered = items.filter((item) => {
    const matchesCategory = activeTab === 'all' || item.categoryId === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        {/* Search */}
        <FadeIn className="relative max-w-md w-full mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search dishes..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FadeIn>

        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <FadeIn>
            <TabsList className="flex flex-wrap h-auto gap-1 mb-8 bg-muted p-1 w-full sm:w-fit mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </FadeIn>

          {['all', ...categories.map((c) => c.slug)].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {filtered.length === 0 ? (
                <FadeIn className="flex flex-col items-center gap-3 py-20 text-center">
                  <Muted>No dishes found{search ? ` for "${search}"` : ''}.</Muted>
                </FadeIn>
              ) : (
                <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filtered.map((dish) => (
                    <StaggerItem key={dish.id}>
                      <MenuCard dish={dish} />
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
