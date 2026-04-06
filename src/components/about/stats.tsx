// Animations
import { StaggerChildren, StaggerItem } from '@/components/animations';

const STATS = [
  { value: '40+', label: 'Years of Experience' },
  { value: '77', label: 'Restaurant Locations' },
  { value: '12', label: 'Master Chefs' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '120+', label: 'Menu Items' },
];

export function AboutStats() {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="mx-auto max-w-7xl">
        <StaggerChildren className="grid grid-cols-2 md:grid-cols-5 gap-px bg-primary-foreground/20">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="flex flex-col items-center gap-1 px-8 py-8 text-center bg-primary">
                <span className="text-4xl font-bold text-primary-foreground">{stat.value}</span>
                <span className="text-sm text-primary-foreground/70">{stat.label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
