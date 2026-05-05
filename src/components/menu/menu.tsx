'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/shadcn/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/shadcn/tabs';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { MenuCard } from '@/components/menu/card';
import { Muted } from '@/components/shadcn/typography';

type Category = {
  id: string;
  name: string;
  slug: string;
};

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
};

interface MenuSectionProps {
  items: MenuItem[];
  categories: Category[];
}

export function MenuSection({ items, categories }: MenuSectionProps) {
  const [search, setSearch] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');

  // Filter based on both search and active tab
  const filtered = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = activeTab === 'all' || item.category.slug === activeTab;
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [items, search, activeTab]);

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

        <Tabs
          defaultValue="all"
          onValueChange={(val) => {
            setActiveTab(val);
          }}
          className="w-full"
        >
          <FadeIn>
            <TabsList className="flex flex-wrap h-auto gap-1 mb-8 bg-muted p-1 w-full sm:w-fit mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.slug}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </FadeIn>

          {/* Single content area — not per tab */}
          {['all', ...categories.map((c) => c.slug)].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {filtered.length === 0 ? (
                <FadeIn className="flex flex-col items-center gap-3 py-20 text-center">
                  <Muted>
                    {search
                      ? `No dishes found for "${search}"`
                      : 'No dishes available in this category.'}
                  </Muted>
                </FadeIn>
              ) : (
                <StaggerChildren
                  key={`${activeTab}-${search}`}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
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
