import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemInfoCard from './ItemInfoCard';

// Mock the styled components
vi.mock('./ItemInfoCard.styled.tsx', () => ({
  InfoContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="info-container">{children}</div>
  ),
  ProductHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="product-header">{children}</div>
  ),
  ProductStatus: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="product-status">{children}</span>
  ),
  StatusDivider: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="status-divider">{children}</span>
  ),
  SoldCount: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="sold-count">{children}</span>
  ),
  HeartIcon: ({ children, onClick }: any) => (
    <div data-testid="heart-icon" onClick={onClick}>
      {children}
    </div>
  ),
  CartIcon: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cart-icon">{children}</div>
  ),
  CartCount: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="cart-count">{children}</span>
  ),
  ProductTitle: ({ children }: { children: React.ReactNode }) => (
    <h2 data-testid="product-title">{children}</h2>
  ),
  RatingSection: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="rating-section">{children}</div>
  ),
  RatingValue: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="rating-value">{children}</span>
  ),
  StarRating: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="star-rating">{children}</div>
  ),
  ReviewCount: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="review-count">{children}</span>
  ),
  PriceSection: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="price-section">{children}</div>
  ),
  AddToCartButton: ({ children, onClick, disabled, style }: any) => (
    <button data-testid="add-to-cart-button" onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  ),
}));

// Mock the SVG icons
vi.mock('../../assets/cart-icon.svg', () => ({
  default: 'cart-icon.svg'
}));

vi.mock('../../assets/heart-icon.svg', () => ({
  default: 'heart-icon.svg'
}));

describe('ItemInfoCard', () => {
  const defaultProps = {
    title: 'Test Product',
    rating: 4.5,
    reviewCount: 123,
    price: 150000,
    status: 'Nuevo',
    soldCount: 50,
  };

  it('renders the info container', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const container = screen.getByTestId('info-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the product header', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const header = screen.getByTestId('product-header');
    expect(header).toBeInTheDocument();
  });

  it('renders the product status', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const status = screen.getByTestId('product-status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent('Nuevo');
  });

  it('renders the sold count', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const soldCount = screen.getByTestId('sold-count');
    expect(soldCount).toBeInTheDocument();
    expect(soldCount).toHaveTextContent('+50 vendidos');
  });

  it('renders the product title', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const title = screen.getByTestId('product-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Product');
  });

  it('renders the rating value', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const ratingValue = screen.getByTestId('rating-value');
    expect(ratingValue).toBeInTheDocument();
    expect(ratingValue).toHaveTextContent('4.5');
  });

  it('renders the review count', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const reviewCount = screen.getByTestId('review-count');
    expect(reviewCount).toBeInTheDocument();
    expect(reviewCount).toHaveTextContent('(123)');
  });

  it('renders the price section with formatted price', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const priceSection = screen.getByTestId('price-section');
    expect(priceSection).toBeInTheDocument();
    expect(priceSection).toHaveTextContent('$ 150.000');
  });

  it('renders the add to cart button', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const addButton = screen.getAllByTestId('add-to-cart-button')[0];
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('Agregar al carrito');
  });

  it('renders the remove from cart button', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const removeButton = screen.getAllByTestId('add-to-cart-button')[1];
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveTextContent('Remover del carrito');
  });

  it('renders the heart icon', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toBeInTheDocument();
  });

  it('renders the cart icon', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
  });

  it('shows cart count when items are added', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const addButton = screen.getAllByTestId('add-to-cart-button')[0];
    fireEvent.click(addButton);
    
    const cartCount = screen.getByTestId('cart-count');
    expect(cartCount).toBeInTheDocument();
    expect(cartCount).toHaveTextContent('1');
  });

  it('increments cart count when add to cart is clicked', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const addButton = screen.getAllByTestId('add-to-cart-button')[0];
    
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
  });

  it('decrements cart count when remove from cart is clicked', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const addButton = screen.getAllByTestId('add-to-cart-button')[0];
    const removeButton = screen.getAllByTestId('add-to-cart-button')[1];
    
    // Add 2 items first
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    
    // Remove 1 item
    fireEvent.click(removeButton);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });

  it('does not decrement cart count below 0', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const removeButton = screen.getAllByTestId('add-to-cart-button')[1];
    
    // Try to remove when cart is empty
    fireEvent.click(removeButton);
    
    const cartCount = screen.queryByTestId('cart-count');
    expect(cartCount).not.toBeInTheDocument();
  });

  it('toggles heart icon when clicked', () => {
    render(<ItemInfoCard {...defaultProps} />);
    
    const heartIcon = screen.getByTestId('heart-icon');
    const heartImage = heartIcon.querySelector('img');
    
    // Initial state (not filled)
    expect(heartImage).toHaveStyle({ filter: 'none' });
    
    // Click to fill
    fireEvent.click(heartIcon);
    expect(heartImage).toHaveStyle({ 
      filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(202deg) brightness(118%) contrast(119%)' 
    });
    
    // Click to unfill
    fireEvent.click(heartIcon);
    expect(heartImage).toHaveStyle({ filter: 'none' });
  });

  it('renders with zero rating', () => {
    const zeroRatingProps = { ...defaultProps, rating: 0 };
    render(<ItemInfoCard {...zeroRatingProps} />);
    
    const ratingValue = screen.getByTestId('rating-value');
    expect(ratingValue).toHaveTextContent('0');
  });

  it('renders with maximum rating', () => {
    const maxRatingProps = { ...defaultProps, rating: 5 };
    render(<ItemInfoCard {...maxRatingProps} />);
    
    const ratingValue = screen.getByTestId('rating-value');
    expect(ratingValue).toHaveTextContent('5');
  });

  it('renders with zero sold count', () => {
    const zeroSoldProps = { ...defaultProps, soldCount: 0 };
    render(<ItemInfoCard {...zeroSoldProps} />);
    
    const soldCount = screen.getByTestId('sold-count');
    expect(soldCount).toHaveTextContent('+0 vendidos');
  });

  it('renders with high sold count', () => {
    const highSoldProps = { ...defaultProps, soldCount: 9999 };
    render(<ItemInfoCard {...highSoldProps} />);
    
    const soldCount = screen.getByTestId('sold-count');
    expect(soldCount).toHaveTextContent('+9999 vendidos');
  });

  it('renders with zero price', () => {
    const zeroPriceProps = { ...defaultProps, price: 0 };
    render(<ItemInfoCard {...zeroPriceProps} />);
    
    const priceSection = screen.getByTestId('price-section');
    expect(priceSection).toHaveTextContent('$ 0');
  });

  it('renders with high price', () => {
    const highPriceProps = { ...defaultProps, price: 999999999 };
    render(<ItemInfoCard {...highPriceProps} />);
    
    const priceSection = screen.getByTestId('price-section');
    expect(priceSection).toHaveTextContent('$ 999.999.999');
  });

  it('renders with empty title', () => {
    const emptyTitleProps = { ...defaultProps, title: '' };
    render(<ItemInfoCard {...emptyTitleProps} />);
    
    const title = screen.getByTestId('product-title');
    expect(title).toHaveTextContent('');
  });

  it('renders with long title', () => {
    const longTitle = 'This is a very long product title that exceeds normal length and should still render correctly without breaking the layout';
    const longTitleProps = { ...defaultProps, title: longTitle };
    render(<ItemInfoCard {...longTitleProps} />);
    
    const title = screen.getByTestId('product-title');
    expect(title).toHaveTextContent(longTitle);
  });

  it('renders with zero review count', () => {
    const zeroReviewProps = { ...defaultProps, reviewCount: 0 };
    render(<ItemInfoCard {...zeroReviewProps} />);
    
    const reviewCount = screen.getByTestId('review-count');
    expect(reviewCount).toHaveTextContent('(0)');
  });

  it('renders with high review count', () => {
    const highReviewProps = { ...defaultProps, reviewCount: 99999 };
    render(<ItemInfoCard {...highReviewProps} />);
    
    const reviewCount = screen.getByTestId('review-count');
    expect(reviewCount).toHaveTextContent('(99999)');
  });
});
