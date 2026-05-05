import 'dotenv/config';
import { PrismaClient } from '../src/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const termsContent = `
<h2>1. Acceptance of Terms</h2>
<p>By accessing or using the Urban Dish website and services, you agree to be bound by these Terms and Conditions.</p>

<h2>2. Use of Services</h2>
<p>Urban Dish provides an online platform for browsing our menu, placing food orders, and making table reservations.</p>

<h2>3. Orders and Payments</h2>
<p>All orders placed through Urban Dish are subject to availability and confirmation. Prices are listed in Pakistani Rupees (PKR) and are subject to change without notice.</p>

<h2>4. Reservations</h2>
<p>Table reservations are subject to availability. We ask that you notify us at least 2 hours in advance if you need to cancel or modify your reservation.</p>

<h2>5. User Accounts</h2>
<p>You are responsible for maintaining the confidentiality of your account credentials.</p>

<h2>6. Intellectual Property</h2>
<p>All content on this website is the property of Urban Dish and is protected by applicable intellectual property laws.</p>

<h2>7. Limitation of Liability</h2>
<p>Urban Dish shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>

<h2>8. Changes to Terms</h2>
<p>We reserve the right to update these Terms and Conditions at any time.</p>

<h2>9. Contact</h2>
<p>If you have any questions, please contact us at <a href="mailto:contact@urbandish.com">contact@urbandish.com</a>.</p>
`.trim();

const privacyContent = `
<h2>1. Information We Collect</h2>
<p>When you use Urban Dish, we may collect your name, email address, phone number, delivery address, and payment information.</p>

<h2>2. How We Use Your Information</h2>
<p>We use the information we collect to process your orders and reservations, communicate with you, and improve our services.</p>

<h2>3. Cookies</h2>
<p>Urban Dish uses cookies to enhance your browsing experience and analyze site traffic.</p>

<h2>4. Data Sharing</h2>
<p>We may share your information with trusted third-party service providers who assist in operating our website.</p>

<h2>5. Data Security</h2>
<p>We implement industry-standard security measures to protect your personal data.</p>

<h2>6. Data Retention</h2>
<p>We retain your personal data for as long as your account is active or as needed to provide services.</p>

<h2>7. Your Rights</h2>
<p>You have the right to access, correct, or delete your personal data at any time.</p>

<h2>8. Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time.</p>

<h2>9. Contact</h2>
<p>If you have any questions, please reach out at <a href="mailto:contact@urbandish.com">contact@urbandish.com</a>.</p>
`.trim();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const adapter = new PrismaPg(pool);
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
    () =>
      prisma.settings.upsert({
        where: { key: 'delivery_fee' },
        update: {},
        create: {
          key: 'delivery_fee',
          value: '150',
        },
      }),
    () =>
      prisma.pageContent.upsert({
        where: { key: 'terms' },
        update: {},
        create: {
          key: 'terms',
          title: 'Terms & Conditions',
          content: termsContent,
        },
      }),
    () =>
      prisma.pageContent.upsert({
        where: { key: 'policy' },
        update: {},
        create: {
          key: 'policy',
          title: 'Privacy Policy',
          content: privacyContent,
        },
      }),
    () =>
      prisma.chef.upsert({
        where: { id: 'chef-1' },
        update: {},
        create: {
          id: 'chef-1',
          name: 'Chef Rajeev Patel',
          cuisine: 'Indian',
          sortOrder: 1,
        },
      }),
    () =>
      prisma.chef.upsert({
        where: { id: 'chef-2' },
        update: {},
        create: {
          id: 'chef-2',
          name: 'Chef Maria Hernandez',
          cuisine: 'Mexican',
          sortOrder: 2,
        },
      }),
    () =>
      prisma.chef.upsert({
        where: { id: 'chef-3' },
        update: {},
        create: {
          id: 'chef-3',
          name: 'Chef Marco Rossi',
          cuisine: 'Italian',
          sortOrder: 3,
        },
      }),
    () =>
      prisma.chef.upsert({
        where: { id: 'chef-4' },
        update: {},
        create: {
          id: 'chef-4',
          name: 'Chef Li Wei',
          cuisine: 'Chinese',
          sortOrder: 4,
        },
      }),
    () =>
      prisma.testimonial.upsert({
        where: { id: 'testimonial-1' },
        update: {},
        create: {
          id: 'testimonial-1',
          name: 'Carlos Hernandez',
          location: 'Spain',
          comment: 'The paella is amazing! So flavorful and filling.',
          sortOrder: 1,
        },
      }),
    () =>
      prisma.testimonial.upsert({
        where: { id: 'testimonial-2' },
        update: {},
        create: {
          id: 'testimonial-2',
          name: 'Maria Hernandez',
          location: 'Mexico',
          comment: 'The food here is absolutely amazing! The flavors are bold and authentic.',
          sortOrder: 2,
        },
      }),
    () =>
      prisma.testimonial.upsert({
        where: { id: 'testimonial-3' },
        update: {},
        create: {
          id: 'testimonial-3',
          name: 'Marco Rossi',
          location: 'Italy',
          comment: 'This restaurant is a hidden gem. The pasta dishes are to die for.',
          sortOrder: 3,
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
