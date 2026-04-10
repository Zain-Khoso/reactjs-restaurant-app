'use client';

import * as React from 'react';
import { Star, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { Button } from '@/components/shadcn/button';
import { Textarea } from '@/components/shadcn/textarea';
import { Separator } from '@/components/shadcn/separator';
import { H3, Muted } from '@/components/shadcn/typography';
import { useSession } from '@/utils/auth-client';
import { createReview, deleteReview } from '@/actions/reviews';

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
};

function StarRating({
  value,
  onChange,
  readonly = false,
}: {
  value: number;
  onChange?: (val: number) => void;
  readonly?: boolean;
}) {
  const [hovered, setHovered] = React.useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={readonly ? 'cursor-default' : 'cursor-pointer'}
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              star <= (hovered || value) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewsSection({
  menuItemId,
  initialReviews,
}: {
  menuItemId: string;
  initialReviews: Review[];
}) {
  const { data: session } = useSession();
  const user = session?.user;

  const [reviews, setReviews] = React.useState(initialReviews);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const hasReviewed = reviews.some((r) => r.user.id === user?.id);
  const avgRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError('Please select a rating.');
      return;
    }
    setError('');
    setLoading(true);

    const result = await createReview({ menuItemId, rating, comment });

    setLoading(false);

    if (result.success) {
      setRating(0);
      setComment('');
    } else {
      setError(result.error ?? 'Something went wrong.');
    }
  };

  const handleDelete = async (id: string) => {
    await deleteReview(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header + avg rating */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <H3 className="text-lg">
          Reviews{' '}
          <span className="text-muted-foreground font-normal text-base">({reviews.length})</span>
        </H3>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(avgRating)} readonly />
            <Muted className="text-sm">{avgRating.toFixed(1)} / 5</Muted>
          </div>
        )}
      </div>

      <Separator />

      {/* Write a review */}
      {user && !hasReviewed && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-sm font-medium">Leave a review</p>
          <StarRating value={rating} onChange={setRating} />
          <Textarea
            placeholder="Share your experience (optional)..."
            rows={3}
            className="resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-fit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      )}

      {!user && (
        <p className="text-sm text-muted-foreground">
          Please{' '}
          <a href="/sign-in" className="text-primary hover:underline">
            sign in
          </a>{' '}
          to leave a review.
        </p>
      )}

      {user && hasReviewed && (
        <p className="text-sm text-muted-foreground">You have already reviewed this item.</p>
      )}

      <Separator />

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <Muted className="text-sm">No reviews yet. Be the first to leave one!</Muted>
      ) : (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.user.image ?? ''} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {review.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">{review.user.name}</p>
                    <Muted className="text-xs">{format(new Date(review.createdAt), 'PPP')}</Muted>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating value={review.rating} readonly />
                  {user?.id === review.user.id && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              {review.comment && (
                <p className="text-sm text-muted-foreground pl-11">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
