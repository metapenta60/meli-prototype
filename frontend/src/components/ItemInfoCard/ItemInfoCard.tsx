import React from 'react';
import {
  InfoContainer,
  ProductHeader,
  ProductStatus,
  StatusDivider,
  SoldCount,
  HeartIcon,
  CartIcon,
  CartCount,
  ProductTitle,
  RatingSection,
  RatingValue,
  StarRating,
  ReviewCount,
  PriceSection,
  AddToCartButton
} from './ItemInfoCard.styled.tsx';
import cartIcon from '../../assets/cart-icon.svg';
import heartIcon from '../../assets/heart-icon.svg';

interface ItemInfoCardProps {
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  status: string;
  soldCount: number;
}

const ItemInfoCard: React.FC<ItemInfoCardProps> = ({ 
  title, 
  rating, 
  reviewCount, 
  price,
  status,
  soldCount
}) => {
  const [isHeartFilled, setIsHeartFilled] = React.useState(false);
  const [cartItemCount, setCartItemCount] = React.useState(0);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#3483fa' : '#e0e0e0' }}>
        ★
      </span>
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = () => {
    setCartItemCount(prev => prev + 1);
  };

  return (
    <InfoContainer>
      <ProductHeader>
        <div>
          <ProductStatus>{status}</ProductStatus>
          <StatusDivider>|</StatusDivider>
          <SoldCount>+{soldCount} vendidos</SoldCount>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <CartIcon>
            <img src={cartIcon} alt="Carrito" width="20" height="20" />
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </CartIcon>
          <HeartIcon onClick={handleHeartClick}>
            <img 
              src={heartIcon} 
              alt="Favorito" 
              width="16" 
              height="16"
              style={{ 
                filter: isHeartFilled ? 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(202deg) brightness(118%) contrast(119%)' : 'none'
              }}
            />
          </HeartIcon>
        </div>
      </ProductHeader>
      
      <ProductTitle>{title}</ProductTitle>
      
      <RatingSection>
        <RatingValue>{rating}</RatingValue>
        <StarRating>
          {renderStars(rating)}
        </StarRating>
        <ReviewCount>({reviewCount})</ReviewCount>
      </RatingSection>
      
      <PriceSection>
        {formatPrice(price)}
      </PriceSection>
      
      <AddToCartButton onClick={handleAddToCart}>
        Agregar al carrito
      </AddToCartButton>
      
      <AddToCartButton 
        onClick={() => setCartItemCount(prev => Math.max(0, prev - 1))}
        disabled={cartItemCount === 0}
        style={{ 
          backgroundColor: cartItemCount === 0 ? '#e0e0e0' : '#5ba3f5',
          cursor: cartItemCount === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        Remover del carrito
      </AddToCartButton>
    </InfoContainer>
  );
};

export default ItemInfoCard;
