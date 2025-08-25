import React, { useState } from 'react';
import { 
  DescriptionContainer, 
  DescriptionText, 
  DescriptionTextBlurred, 
} from './ItemDescription.styled.tsx';
import { ItemLinkContainer, Link } from '../Shared';

interface ItemDescriptionProps {
  description: string;
  maxLength?: number;
}

const BLUR_LENGTH = 10;

const ItemDescription: React.FC<ItemDescriptionProps> = ({ 
  description, 
  maxLength = 300 
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isLongDescription = description.length > maxLength;

  const handleShowFullDescription = () => {
    setShowFullDescription(true);
  };

  // Si no es largo o ya se mostró completo, mostrar todo
  if (!isLongDescription || showFullDescription) {
    return (
      <DescriptionContainer>
        <DescriptionText>{description}</DescriptionText>
      </DescriptionContainer>
    );
  }

  // Si es largo, cortar a maxLength y aplicar blur al final
  const visibleText = description.substring(0, maxLength);
  const blurredText = description.substring(maxLength, maxLength + BLUR_LENGTH);

  return (
    <>
    <DescriptionContainer>
      <DescriptionText>
        {visibleText}
        {blurredText && <DescriptionTextBlurred>{blurredText}</DescriptionTextBlurred>}
      </DescriptionText>
      </DescriptionContainer>
      <ItemLinkContainer>
        <Link onClick={handleShowFullDescription}>
          Ver más
        </Link>
      </ItemLinkContainer>
    </>
  );
};

export default ItemDescription;
