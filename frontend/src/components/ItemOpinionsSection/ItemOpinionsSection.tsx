import React from 'react';
import { 
  OpinionsContainer, 
  LeftColumn, 
  RightColumn 
} from './ItemOpinionsSection.styled.tsx';
import ItemReviewSummaryCard from '../ItemReviewSummaryCard';
import ItemReview from '../ItemReview';

interface Review {
  rating: number;
  comment: string;
  date: string;
}

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

interface ItemOpinionsSectionProps {
  overallRating: number;
  totalRatings: number;
  distribution: RatingDistribution[];
  reviews: Review[];
}

const ItemOpinionsSection: React.FC<ItemOpinionsSectionProps> = ({ 
  overallRating, 
  totalRatings, 
  distribution, 
  reviews 
}) => {
  return (
    <OpinionsContainer>
      <LeftColumn>
        <ItemReviewSummaryCard
          overallRating={overallRating}
          totalRatings={totalRatings}
          distribution={distribution}
        />
      </LeftColumn>
      
      <RightColumn>
        {reviews.map((review, index) => (
          <ItemReview key={index} review={review} />
        ))}
      </RightColumn>
    </OpinionsContainer>
  );
};

export default ItemOpinionsSection;
