import React from 'react';
import { 
  HeaderContainer, 
  SellerLogo, 
  SellerInfo, 
  SellerName, 
  SellerStats, 
  StatItem, 
  StatValue, 
  StatLabel 
} from './SellerHeader.styled.tsx';

interface SellerHeaderProps {
  followersCount: number;
  productsCount: number;
  sellerImageUrl: string;
  sellerName?: string;
}

const SellerHeader: React.FC<SellerHeaderProps> = ({ 
  followersCount, 
  productsCount, 
  sellerImageUrl,
  sellerName = "Link Game"
}) => {
  return (
    <HeaderContainer>
      <SellerLogo>
        <img src={sellerImageUrl} alt={`Logo de ${sellerName}`} />
      </SellerLogo>
      
      <SellerInfo>
        <SellerName>{sellerName}</SellerName>
        <SellerStats>
          <StatItem>
            <StatValue>+{followersCount}</StatValue>
            <StatLabel>Seguidores</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>+{productsCount}</StatValue>
            <StatLabel>Productos</StatLabel>
          </StatItem>
        </SellerStats>
      </SellerInfo>
    </HeaderContainer>
  );
};

export default SellerHeader;
