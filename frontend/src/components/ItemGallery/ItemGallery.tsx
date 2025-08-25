import { useState } from 'react';
import { 
  GalleryContainer, 
  ThumbnailsContainer, 
  Thumbnail, 
  MainImageContainer, 
  MainImage,
  ThumbnailImage,
} from './ItemGallery.styled.tsx';

interface ImageItem {
  alt: string;
  urlSmallVersion: string;
  urlMediumVersion: string;
}

interface ItemGalleryProps {
  images: ImageItem[];
  isMostSold?: boolean;
  containerSize?: 'half' | 'full'; // 'half' = 66.67%/2, 'full' = 33.33%
}

const ItemGallery: React.FC<ItemGalleryProps> = ({ 
  images, 
  isMostSold = false, 
  containerSize = 'full' 
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const selectedImage = images[selectedImageIndex];

  return (
    <GalleryContainer isMostSold={isMostSold} containerSize={containerSize}>
      <ThumbnailsContainer>
        {images.slice(0, 6).map((image, index) => (
          <Thumbnail 
            key={index}
            isSelected={index === selectedImageIndex}
            onClick={() => handleThumbnailClick(index)}
          >
            <ThumbnailImage 
              src={image.urlSmallVersion} 
              alt={image.alt}
            />
          </Thumbnail>
        ))}
      </ThumbnailsContainer>
      
      <MainImageContainer isMostSold={isMostSold}>
        <MainImage 
          src={selectedImage?.urlMediumVersion} 
          alt={selectedImage?.alt}
        />
      </MainImageContainer>
    </GalleryContainer>
  );
};

export default ItemGallery;
