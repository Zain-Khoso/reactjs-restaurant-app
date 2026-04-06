'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/shadcn/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/shadcn/tabs';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { MenuCard } from '@/components/menu/card';

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Starters', value: 'starters' },
  { label: 'Mains', value: 'mains' },
  { label: 'Desserts', value: 'desserts' },
  { label: 'Drinks', value: 'drinks' },
];

const DISHES = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, fresh mozzarella, and basil on a crispy thin crust.',
    price: 1299,
    image: '/images/gallery/dishes/1.webp',
    category: 'mains',
    tags: ['Vegetarian'],
    featured: true,
  },
  {
    id: '2',
    name: 'Spaghetti Carbonara',
    description: 'Creamy egg sauce, crispy pancetta, and Parmesan cheese.',
    price: 1099,
    image: '/images/gallery/dishes/2.webp',
    category: 'mains',
    tags: [],
    featured: true,
  },
  {
    id: '3',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and our house sauce.',
    price: 999,
    image: '/images/gallery/dishes/3.webp',
    category: 'mains',
    tags: [],
    featured: true,
  },
  {
    id: '4',
    name: 'Sushi Platter',
    description: '12 pieces of premium sushi served with miso soup and pickled ginger.',
    price: 1599,
    image: '/images/gallery/dishes/4.webp',
    category: 'mains',
    tags: ['Gluten Free'],
    featured: true,
  },
  {
    id: '5',
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes, garlic, and basil.',
    price: 499,
    image: '/images/gallery/dishes/1.webp',
    category: 'starters',
    tags: ['Vegetarian'],
    featured: false,
  },
  {
    id: '6',
    name: 'Chicken Wings',
    description: 'Crispy wings tossed in our signature spicy sauce.',
    price: 799,
    image: '/images/gallery/dishes/2.webp',
    category: 'starters',
    tags: ['Spicy'],
    featured: false,
  },
  {
    id: '7',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone.',
    price: 599,
    image: '/images/gallery/dishes/3.webp',
    category: 'desserts',
    tags: ['Vegetarian'],
    featured: false,
  },
  {
    id: '8',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.',
    price: 649,
    image: '/images/gallery/dishes/4.webp',
    category: 'desserts',
    tags: ['Vegetarian'],
    featured: false,
  },
  {
    id: '9',
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemonade with mint and a hint of ginger.',
    price: 299,
    image: '/images/gallery/dishes/1.webp',
    category: 'drinks',
    tags: ['Vegan'],
    featured: false,
  },
  {
    id: '10',
    name: 'Mango Smoothie',
    description: 'Thick and creamy mango smoothie made with fresh Sindhi mangoes.',
    price: 349,
    image: '/images/gallery/dishes/2.webp',
    category: 'drinks',
    tags: ['Vegan'],
    featured: false,
  },
];

export function MenuSection() {
  const [search, setSearch] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');

  const filtered = DISHES.filter((dish) => {
    const matchesCategory = activeTab === 'all' || dish.category === activeTab;
    const matchesSearch =
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.description.toLowerCase().includes(search.toLowerCase());
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

        {/* Tabs + Grid */}
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <FadeIn>
            <TabsList className="flex flex-wrap h-auto gap-1 mb-8 bg-muted p-1 w-full sm:w-fit mx-auto">
              {CATEGORIES.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </FadeIn>

          {CATEGORIES.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              {filtered.length === 0 ? (
                <FadeIn className="flex flex-col items-center gap-3 py-20 text-center">
                  <p className="text-muted-foreground">No dishes found for &quot;{search}&quot;</p>
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
