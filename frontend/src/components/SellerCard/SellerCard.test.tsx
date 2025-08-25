import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SellerCard from './SellerCard';

// Mock the styled components
vi.mock('./SellerCard.styled.tsx', () => ({
  CardContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-container">{children}</div>
  ),
}));

// Mock the Shared components
vi.mock('../Shared', () => ({
  Border: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="border">{children}</div>
  ),
}));

// Mock the SellerHeader component
vi.mock('../SellerHeader', () => ({
  default: ({ followersCount, productsCount, sellerImageUrl, sellerName }: any) => (
    <div data-testid="seller-header">
      <span data-testid="followers-count">{followersCount}</span>
      <span data-testid="products-count">{productsCount}</span>
      <img data-testid="seller-image" src={sellerImageUrl} alt="seller" />
      <span data-testid="seller-name">{sellerName || 'Unknown Seller'}</span>
    </div>
  ),
}));

// Mock the SellerRating component
vi.mock('../SellerRating', () => ({
  default: ({ rating, salesCount, attentionDescription, puntualityDescription }: any) => (
    <div data-testid="seller-rating">
      <span data-testid="rating">{rating}</span>
      <span data-testid="sales-count">{salesCount}</span>
      <span data-testid="attention-description">{attentionDescription}</span>
      <span data-testid="puntuality-description">{puntualityDescription}</span>
    </div>
  ),
}));

describe('SellerCard', () => {
  const defaultProps = {
    followersCount: 1000,
    productsCount: 50,
    sellerImageUrl: 'https://example.com/seller.jpg',
    sellerName: 'Test Seller',
    rating: 4.5,
    salesCount: 200,
    attentionDescription: 'Excellent attention',
    puntualityDescription: 'Always on time',
  };

  it('renders the seller card container', () => {
    render(<SellerCard {...defaultProps} />);
    
    const container = screen.getByTestId('card-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the border wrapper', () => {
    render(<SellerCard {...defaultProps} />);
    
    const border = screen.getByTestId('border');
    expect(border).toBeInTheDocument();
  });

  it('renders the seller header with correct props', () => {
    render(<SellerCard {...defaultProps} />);
    
    const header = screen.getByTestId('seller-header');
    expect(header).toBeInTheDocument();
    
    expect(screen.getByTestId('followers-count')).toHaveTextContent('1000');
    expect(screen.getByTestId('products-count')).toHaveTextContent('50');
    expect(screen.getByTestId('seller-image')).toHaveAttribute('src', 'https://example.com/seller.jpg');
    expect(screen.getByTestId('seller-name')).toHaveTextContent('Test Seller');
  });

  it('renders the seller rating with correct props', () => {
    render(<SellerCard {...defaultProps} />);
    
    const rating = screen.getByTestId('seller-rating');
    expect(rating).toBeInTheDocument();
    
    expect(screen.getByTestId('rating')).toHaveTextContent('4.5');
    expect(screen.getByTestId('sales-count')).toHaveTextContent('200');
    expect(screen.getByTestId('attention-description')).toHaveTextContent('Excellent attention');
    expect(screen.getByTestId('puntuality-description')).toHaveTextContent('Always on time');
  });

  it('renders with default seller name when not provided', () => {
    const propsWithoutName = {
      followersCount: 1000,
      productsCount: 50,
      sellerImageUrl: 'https://example.com/seller.jpg',
      rating: 4.5,
      salesCount: 200,
      attentionDescription: 'Excellent attention',
      puntualityDescription: 'Always on time',
    };
    
    render(<SellerCard {...propsWithoutName} />);
    
    expect(screen.getByTestId('seller-name')).toHaveTextContent('Unknown Seller');
  });

  it('renders with zero values', () => {
    const zeroProps = {
      ...defaultProps,
      followersCount: 0,
      productsCount: 0,
      rating: 0,
      salesCount: 0,
    };
    
    render(<SellerCard {...zeroProps} />);
    
    expect(screen.getByTestId('followers-count')).toHaveTextContent('0');
    expect(screen.getByTestId('products-count')).toHaveTextContent('0');
    expect(screen.getByTestId('rating')).toHaveTextContent('0');
    expect(screen.getByTestId('sales-count')).toHaveTextContent('0');
  });

  it('renders with high values', () => {
    const highProps = {
      ...defaultProps,
      followersCount: 999999,
      productsCount: 9999,
      rating: 5.0,
      salesCount: 99999,
    };
    
    render(<SellerCard {...highProps} />);
    
    expect(screen.getByTestId('followers-count')).toHaveTextContent('999999');
    expect(screen.getByTestId('products-count')).toHaveTextContent('9999');
    expect(screen.getByTestId('rating')).toHaveTextContent('5');
    expect(screen.getByTestId('sales-count')).toHaveTextContent('99999');
  });

  it('renders with empty descriptions', () => {
    const emptyDescProps = {
      ...defaultProps,
      attentionDescription: '',
      puntualityDescription: '',
    };
    
    render(<SellerCard {...emptyDescProps} />);
    
    expect(screen.getByTestId('attention-description')).toHaveTextContent('');
    expect(screen.getByTestId('puntuality-description')).toHaveTextContent('');
  });

  it('renders with long descriptions', () => {
    const longDescProps = {
      ...defaultProps,
      attentionDescription: 'This is a very long description that exceeds normal length and should still render correctly',
      puntualityDescription: 'Another very long description that tests the component\'s ability to handle extended text content',
    };
    
    render(<SellerCard {...longDescProps} />);
    
    expect(screen.getByTestId('attention-description')).toHaveTextContent(longDescProps.attentionDescription);
    expect(screen.getByTestId('puntuality-description')).toHaveTextContent(longDescProps.puntualityDescription);
  });
});
