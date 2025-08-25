import React from 'react';
import { 
  SummaryContainer, 
  OverallRating, 
  RatingNumber, 
  StarRating, 
  RatingCount, 
  RatingDistribution, 
  DistributionBar, 
  DistributionItem, 
  StarIcon 
} from './ItemReviewSummaryCard.styled.tsx';

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

interface ItemReviewSummaryCardProps {
  overallRating: number;
  totalRatings: number;
  distribution: RatingDistribution[];
}

const ItemReviewSummaryCard: React.FC<ItemReviewSummaryCardProps> = ({ 
  overallRating, 
  totalRatings, 
  distribution 
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#3483fa' : '#e0e0e0' }}>
        ★
      </span>
    ));
  };

  return (
    <SummaryContainer>
      <OverallRating>
        <RatingNumber>{overallRating}</RatingNumber>
        <StarRating>
          {renderStars(overallRating)}
        </StarRating>
        <RatingCount>{totalRatings} calificaciones</RatingCount>
      </OverallRating>
      
      <RatingDistribution>
        {distribution.map((item) => (
          <DistributionItem key={item.rating}>
            <DistributionBar percentage={item.percentage} />
            <span>{item.rating}</span>
            <StarIcon>★</StarIcon>
          </DistributionItem>
        ))}
      </RatingDistribution>
    </SummaryContainer>
  );
};

export default ItemReviewSummaryCard;
