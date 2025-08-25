import styled from 'styled-components';

interface GalleryContainerProps {
  isMostSold: boolean;
  containerSize: 'half' | 'full';
}

export const GalleryContainer = styled.div<GalleryContainerProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  height: ${({ containerSize }) => containerSize === 'half' ? '300px' : '400px'};
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

export const ThumbnailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 80px;
  flex-shrink: 0;
`;

export const Thumbnail = styled.div<{ isSelected: boolean }>`
  width: 60px;
  height: 60px;
  border: 2px solid ${({ isSelected, theme }) => 
    isSelected ? theme.colors.meliBlue : 'transparent'
  };
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.meliBlue};
  }
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MainImageContainer = styled.div<{ isMostSold: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isMostSold, theme }) => 
    isMostSold ? theme.colors.backgroundSecondary : theme.colors.backgroundPrimary
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

export const MainImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

