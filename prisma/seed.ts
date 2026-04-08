import 'dotenv/config';
import { PrismaClient } from '../src/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding...');

  const [starters, mains, desserts, drinks] = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'starters' },
      update: {},
      create: { name: 'Starters', slug: 'starters', sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'mains' },
      update: {},
      create: { name: 'Mains', slug: 'mains', sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'desserts' },
      update: {},
      create: { name: 'Desserts', slug: 'desserts', sortOrder: 3 },
    }),
    prisma.category.upsert({
      where: { slug: 'drinks' },
      update: {},
      create: { name: 'Drinks', slug: 'drinks', sortOrder: 4 },
    }),
  ]);

  const queries = [
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'margherita-pizza' },
        update: {},
        create: {
          name: 'Margherita Pizza',
          slug: 'margherita-pizza',
          description: 'Classic tomato sauce, fresh mozzarella, and basil on a crispy thin crust.',
          price: 1299,
          categoryId: mains.id,
          available: true,
          featured: true,
          tags: ['Vegetarian'],
        },
      }),
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'spaghetti-carbonara' },
        update: {},
        create: {
          name: 'Spaghetti Carbonara',
          slug: 'spaghetti-carbonara',
          description: 'Creamy egg sauce, crispy pancetta, and Parmesan cheese.',
          price: 1099,
          categoryId: mains.id,
          available: true,
          featured: true,
          tags: [],
        },
      }),
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'classic-cheeseburger' },
        update: {},
        create: {
          name: 'Classic Cheeseburger',
          slug: 'classic-cheeseburger',
          description: 'Juicy beef patty, cheddar, lettuce, tomato, and our house sauce.',
          price: 999,
          categoryId: mains.id,
          available: true,
          featured: true,
          tags: [],
        },
      }),
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'sushi-platter' },
        update: {},
        create: {
          name: 'Sushi Platter',
          slug: 'sushi-platter',
          description: '12 pieces of premium sushi with miso soup and pickled ginger.',
          price: 1599,
          categoryId: mains.id,
          available: true,
          featured: true,
          tags: ['Gluten Free'],
        },
      }),
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'bruschetta' },
        update: {},
        create: {
          name: 'Bruschetta',
          slug: 'bruschetta',
          description: 'Toasted bread topped with fresh tomatoes, garlic, and basil.',
          price: 499,
          categoryId: starters.id,
          available: true,
          featured: false,
          tags: ['Vegetarian'],
        },
      }),
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'chicken-wings' },
        update: {},
        create: {
          name: 'Chicken Wings',
          slug: 'chicken-wings',
          description: 'Crispy wings tossed in our signature spicy sauce.',
          price: 799,
          categoryId: starters.id,
          available: true,
          featured: false,
          tags: ['Spicy'],
        },
      }),
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'tiramisu' },
        update: {},
        create: {
          name: 'Tiramisu',
          slug: 'tiramisu',
          description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone.',
          price: 599,
          categoryId: desserts.id,
          available: true,
          featured: false,
          tags: ['Vegetarian'],
        },
      }),
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'chocolate-lava-cake' },
        update: {},
        create: {
          name: 'Chocolate Lava Cake',
          slug: 'chocolate-lava-cake',
          description: 'Warm chocolate cake with a gooey molten center and vanilla ice cream.',
          price: 649,
          categoryId: desserts.id,
          available: true,
          featured: false,
          tags: ['Vegetarian'],
        },
      }),
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'fresh-lemonade' },
        update: {},
        create: {
          name: 'Fresh Lemonade',
          slug: 'fresh-lemonade',
          description: 'Freshly squeezed lemonade with mint and a hint of ginger.',
          price: 299,
          categoryId: drinks.id,
          available: true,
          featured: false,
          tags: ['Vegan'],
        },
      }),
    () =>
      prisma.menuItem.upsert({
        where: { slug: 'mango-smoothie' },
        update: {},
        create: {
          name: 'Mango Smoothie',
          slug: 'mango-smoothie',
          description: 'Thick and creamy mango smoothie made with fresh Sindhi mangoes.',
          price: 349,
          categoryId: drinks.id,
          available: true,
          featured: false,
          tags: ['Vegan'],
        },
      }),
  ];

  for (const query of queries) {
    await query();
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
