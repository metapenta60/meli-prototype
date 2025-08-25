import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemGallery from './ItemGallery';

// Mock the styled components
vi.mock('./ItemGallery.styled.tsx', () => ({
  GalleryContainer: ({ children, isMostSold, containerSize }: any) => (
    <div data-testid="gallery-container" data-most-sold={isMostSold} data-container-size={containerSize}>
      {children}
    </div>
  ),
  ThumbnailsContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="thumbnails-container">{children}</div>
  ),
  Thumbnail: ({ children, isSelected, onClick }: any) => (
    <div data-testid="thumbnail" data-selected={isSelected} onClick={onClick}>
      {children}
    </div>
  ),
  MainImageContainer: ({ children, isMostSold }: any) => (
    <div data-testid="main-image-container" data-most-sold={isMostSold}>
      {children}
    </div>
  ),
  MainImage: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="main-image" src={src} alt={alt} />
  ),
  ThumbnailImage: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="thumbnail-image" src={src} alt={alt} />
  ),
}));

describe('ItemGallery', () => {
  const mockImages = [
    { alt: 'Image 1', urlSmallVersion: 'small1.jpg', urlMediumVersion: 'medium1.jpg' },
    { alt: 'Image 2', urlSmallVersion: 'small2.jpg', urlMediumVersion: 'medium2.jpg' },
    { alt: 'Image 3', urlSmallVersion: 'small3.jpg', urlMediumVersion: 'medium3.jpg' },
    { alt: 'Image 4', urlSmallVersion: 'small4.jpg', urlMediumVersion: 'medium4.jpg' },
    { alt: 'Image 5', urlSmallVersion: 'small5.jpg', urlMediumVersion: 'medium5.jpg' },
    { alt: 'Image 6', urlSmallVersion: 'small6.jpg', urlMediumVersion: 'medium6.jpg' },
    { alt: 'Image 7', urlSmallVersion: 'small7.jpg', urlMediumVersion: 'medium7.jpg' },
  ];

  it('renders the gallery container', () => {
    render(<ItemGallery images={mockImages} />);
    
    const container = screen.getByTestId('gallery-container');
    expect(container).toBeInTheDocument();
  });

  it('renders thumbnails container', () => {
    render(<ItemGallery images={mockImages} />);
    
    const thumbnailsContainer = screen.getByTestId('thumbnails-container');
    expect(thumbnailsContainer).toBeInTheDocument();
  });

  it('renders main image container', () => {
    render(<ItemGallery images={mockImages} />);
    
    const mainImageContainer = screen.getByTestId('main-image-container');
    expect(mainImageContainer).toBeInTheDocument();
  });

  it('renders first 6 thumbnails', () => {
    render(<ItemGallery images={mockImages} />);
    
    const thumbnails = screen.getAllByTestId('thumbnail');
    expect(thumbnails).toHaveLength(6);
  });

  it('renders main image with first image by default', () => {
    render(<ItemGallery images={mockImages} />);
    
    const mainImage = screen.getByTestId('main-image');
    expect(mainImage).toHaveAttribute('src', 'medium1.jpg');
    expect(mainImage).toHaveAttribute('alt', 'Image 1');
  });

  it('renders thumbnail images with correct src and alt', () => {
    render(<ItemGallery images={mockImages} />);
    
    const thumbnailImages = screen.getAllByTestId('thumbnail-image');
    expect(thumbnailImages[0]).toHaveAttribute('src', 'small1.jpg');
    expect(thumbnailImages[0]).toHaveAttribute('alt', 'Image 1');
    expect(thumbnailImages[1]).toHaveAttribute('src', 'small2.jpg');
    expect(thumbnailImages[1]).toHaveAttribute('alt', 'Image 2');
  });

  it('shows first thumbnail as selected by default', () => {
    render(<ItemGallery images={mockImages} />);
    
    const thumbnails = screen.getAllByTestId('thumbnail');
    expect(thumbnails[0]).toHaveAttribute('data-selected', 'true');
    expect(thumbnails[1]).toHaveAttribute('data-selected', 'false');
  });

  it('changes selected image when thumbnail is clicked', () => {
    render(<ItemGallery images={mockImages} />);
    
    const thumbnails = screen.getAllByTestId('thumbnail');
    const secondThumbnail = thumbnails[1];
    
    fireEvent.click(secondThumbnail);
    
    // Check that second thumbnail is now selected
    expect(thumbnails[1]).toHaveAttribute('data-selected', 'true');
    expect(thumbnails[0]).toHaveAttribute('data-selected', 'false');
    
    // Check that main image changed
    const mainImage = screen.getByTestId('main-image');
    expect(mainImage).toHaveAttribute('src', 'medium2.jpg');
    expect(mainImage).toHaveAttribute('alt', 'Image 2');
  });

  it('renders with isMostSold prop', () => {
    render(<ItemGallery images={mockImages} isMostSold={true} />);
    
    const container = screen.getByTestId('gallery-container');
    const mainImageContainer = screen.getByTestId('main-image-container');
    
    expect(container).toHaveAttribute('data-most-sold', 'true');
    expect(mainImageContainer).toHaveAttribute('data-most-sold', 'true');
  });

  it('renders with containerSize prop', () => {
    render(<ItemGallery images={mockImages} containerSize="half" />);
    
    const container = screen.getByTestId('gallery-container');
    expect(container).toHaveAttribute('data-container-size', 'half');
  });

  it('renders with default props', () => {
    render(<ItemGallery images={mockImages} />);
    
    const container = screen.getByTestId('gallery-container');
    const mainImageContainer = screen.getByTestId('main-image-container');
    
    expect(container).toHaveAttribute('data-most-sold', 'false');
    expect(container).toHaveAttribute('data-container-size', 'full');
    expect(mainImageContainer).toHaveAttribute('data-most-sold', 'false');
  });

  it('handles empty images array', () => {
    render(<ItemGallery images={[]} />);
    
    const thumbnails = screen.queryAllByTestId('thumbnail');
    expect(thumbnails).toHaveLength(0);
    
    const mainImage = screen.getByTestId('main-image');
    expect(mainImage).not.toHaveAttribute('src');
    expect(mainImage).not.toHaveAttribute('alt');
  });

  it('handles single image', () => {
    const singleImage = [mockImages[0]];
    render(<ItemGallery images={singleImage} />);
    
    const thumbnails = screen.getAllByTestId('thumbnail');
    expect(thumbnails).toHaveLength(1);
    
    const mainImage = screen.getByTestId('main-image');
    expect(mainImage).toHaveAttribute('src', 'medium1.jpg');
    expect(mainImage).toHaveAttribute('alt', 'Image 1');
  });

  it('handles more than 6 images (shows only first 6)', () => {
    const manyImages = [
      ...mockImages,
      { alt: 'Image 8', urlSmallVersion: 'small8.jpg', urlMediumVersion: 'medium8.jpg' },
      { alt: 'Image 9', urlSmallVersion: 'small9.jpg', urlMediumVersion: 'medium9.jpg' },
    ];
    
    render(<ItemGallery images={manyImages} />);
    
    const thumbnails = screen.getAllByTestId('thumbnail');
    expect(thumbnails).toHaveLength(6);
    
    // Should not show the 8th and 9th images
    const thumbnailImages = screen.getAllByTestId('thumbnail-image');
    expect(thumbnailImages[5]).toHaveAttribute('src', 'small6.jpg');
    expect(thumbnailImages[5]).toHaveAttribute('alt', 'Image 6');
  });

  it('maintains selection state when clicking same thumbnail', () => {
    render(<ItemGallery images={mockImages} />);
    
    const thumbnails = screen.getAllByTestId('thumbnail');
    const firstThumbnail = thumbnails[0];
    
    // Click first thumbnail (already selected)
    fireEvent.click(firstThumbnail);
    
    // Should still be selected
    expect(firstThumbnail).toHaveAttribute('data-selected', 'true');
    
    const mainImage = screen.getByTestId('main-image');
    expect(mainImage).toHaveAttribute('src', 'medium1.jpg');
  });
});
