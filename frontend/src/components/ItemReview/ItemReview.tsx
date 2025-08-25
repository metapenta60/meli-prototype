import React from 'react';
import { 
  ReviewContainer, 
  ReviewHeader, 
  StarRating, 
  ReviewDate, 
  ReviewComment, 
} from './ItemReview.styled.tsx';

interface Review {
  rating: number;
  comment: string;
  date: string;
}

interface ItemReviewProps {
  review: Review;
}

const ItemReview: React.FC<ItemReviewProps> = ({ review }) => {
  const { rating, comment, date } = review;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#3483fa' : '#e0e0e0' }}>
        ★
      </span>
    ));
  };

  return (
    <ReviewContainer>
      <ReviewHeader>
        <StarRating>
          {renderStars(rating)}
        </StarRating>
        <ReviewDate>{date}</ReviewDate>
      </ReviewHeader>
      
      <ReviewComment>{comment}</ReviewComment>
    </ReviewContainer>
  );
};

export default ItemReview;
