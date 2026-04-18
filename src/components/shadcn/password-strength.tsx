import { getPasswordStrength } from '@/utils/validations';
import { cn } from '@/utils/index';

export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const { score, label, color } = getPasswordStrength(password);

  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-all duration-300',
              i <= score ? color : 'bg-muted'
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          'text-xs',
          score <= 2 && 'text-red-500',
          score <= 4 && score > 2 && 'text-amber-500',
          score === 5 && 'text-blue-500',
          score === 6 && 'text-green-500'
        )}
      >
        {label}
      </p>
    </div>
  );
}
