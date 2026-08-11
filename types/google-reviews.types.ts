// types/google-reviews.types.ts
export interface GoogleReview {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
  /** Guest photos from the Google review */
  images?: string[];
}

export interface GoogleReviewsSectionData {
  title: string;
  subtitle?: string;
  reviews: GoogleReview[];
  overallRating: number;
  totalReviews: number;
  googleUrl?: string;
}



















