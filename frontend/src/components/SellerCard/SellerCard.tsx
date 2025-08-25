import React from 'react';
import { CardContainer } from './SellerCard.styled.tsx';
import { Border } from '../Shared';
import SellerHeader from '../SellerHeader';
import SellerRating from '../SellerRating';

interface SellerCardProps {
  // Props para SellerHeader
  followersCount: number;
  productsCount: number;
  sellerImageUrl: string;
  sellerName?: string;
  
  // Props para SellerRating
  rating: number;
  salesCount: number;
  attentionDescription: string;
  puntualityDescription: string;
}

const SellerCard: React.FC<SellerCardProps> = ({ 
  // SellerHeader props
  followersCount, 
  productsCount, 
  sellerImageUrl,
  sellerName,
  
  // SellerRating props
  rating,
  salesCount,
  attentionDescription,
  puntualityDescription
}) => {
  return (
    <Border>
      <CardContainer>
        <SellerHeader
          followersCount={followersCount}
          productsCount={productsCount}
          sellerImageUrl={sellerImageUrl}
          sellerName={sellerName}
        />
        
        <SellerRating
          rating={rating}
          salesCount={salesCount}
          attentionDescription={attentionDescription}
          puntualityDescription={puntualityDescription}
        />
      </CardContainer>
    </Border>
  );
};

export default SellerCard;
