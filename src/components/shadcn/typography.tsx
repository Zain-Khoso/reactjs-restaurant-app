// Utils.
import { cn } from '@/utils/index';

// Types.
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParaProps = React.HTMLAttributes<HTMLParagraphElement>;
type QuoteProps = React.HTMLAttributes<HTMLQuoteElement>;
type ListProps = React.HTMLAttributes<HTMLUListElement>;
type DivProps = React.HTMLAttributes<HTMLDivElement>;

// Elements.
export function H1({ children, className, ...others }: HeadingProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl leading-[150%]',
        className
      )}
      {...others}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...others }: HeadingProps) {
  return (
    <h2
      className={cn('scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...others}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, ...others }: HeadingProps) {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...others}>
      {children}
    </h3>
  );
}

export function H4({ children, className, ...others }: HeadingProps) {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...others}>
      {children}
    </h4>
  );
}

export function P({ children, className, ...others }: ParaProps) {
  return (
    <p className={cn('leading-7 not-first:mt-6', className)} {...others}>
      {children}
    </p>
  );
}

export function Blockquote({ children, className, ...others }: QuoteProps) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...others}>
      {children}
    </blockquote>
  );
}

export function List({ children, className, ...others }: ListProps) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...others}>
      {children}
    </ul>
  );
}

export function Lead({ children, className, ...others }: ParaProps) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)} {...others}>
      {children}
    </p>
  );
}

export function Large({ children, className, ...others }: DivProps) {
  return (
    <div className={cn('text-lg font-semibold', className)} {...others}>
      {children}
    </div>
  );
}

export function Small({ children, className, ...others }: ParaProps) {
  return (
    <small className={cn('text-sm font-medium leading-none', className)} {...others}>
      {children}
    </small>
  );
}

export function Muted({ children, className, ...others }: ParaProps) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...others}>
      {children}
    </p>
  );
}

export function SectionLabel({ children, className, ...others }: ParaProps) {
  return (
    <p className={cn('text-sm font-medium text-primary tracking-wide', className)} {...others}>
      {children} —
    </p>
  );
}
