import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SellerHeader from './SellerHeader';

// Mock the styled components
vi.mock('./SellerHeader.styled.tsx', () => ({
  HeaderContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="header-container">{children}</div>
  ),
  SellerLogo: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="seller-logo">{children}</div>
  ),
  SellerInfo: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="seller-info">{children}</div>
  ),
  SellerName: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="seller-name">{children}</h3>
  ),
  SellerStats: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="seller-stats">{children}</div>
  ),
  StatItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="stat-item">{children}</div>
  ),
  StatValue: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="stat-value">{children}</span>
  ),
  StatLabel: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="stat-label">{children}</span>
  ),
}));

describe('SellerHeader', () => {
  const defaultProps = {
    followersCount: 1250,
    productsCount: 89,
    sellerImageUrl: 'https://example.com/seller-logo.png',
    sellerName: 'TechStore Pro',
  };

  it('renders the header container', () => {
    render(<SellerHeader {...defaultProps} />);
    
    const container = screen.getByTestId('header-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the seller logo with correct image', () => {
    render(<SellerHeader {...defaultProps} />);
    
    const logo = screen.getByTestId('seller-logo');
    const image = logo.querySelector('img');
    
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/seller-logo.png');
    expect(image).toHaveAttribute('alt', 'Logo de TechStore Pro');
  });

  it('renders the seller info section', () => {
    render(<SellerHeader {...defaultProps} />);
    
    const sellerInfo = screen.getByTestId('seller-info');
    expect(sellerInfo).toBeInTheDocument();
  });

  it('renders the seller name', () => {
    render(<SellerHeader {...defaultProps} />);
    
    const sellerName = screen.getByTestId('seller-name');
    expect(sellerName).toHaveTextContent('TechStore Pro');
  });

  it('renders the seller stats section', () => {
    render(<SellerHeader {...defaultProps} />);
    
    const sellerStats = screen.getByTestId('seller-stats');
    expect(sellerStats).toBeInTheDocument();
  });

  it('renders two stat items', () => {
    render(<SellerHeader {...defaultProps} />);
    
    const statItems = screen.getAllByTestId('stat-item');
    expect(statItems).toHaveLength(2);
  });

  it('renders followers count with correct format', () => {
    render(<SellerHeader {...defaultProps} />);
    
    const statValues = screen.getAllByTestId('stat-value');
    const statLabels = screen.getAllByTestId('stat-label');
    
    expect(statValues[0]).toHaveTextContent('+1250');
    expect(statLabels[0]).toHaveTextContent('Seguidores');
  });

  it('renders products count with correct format', () => {
    render(<SellerHeader {...defaultProps} />);
    
    const statValues = screen.getAllByTestId('stat-value');
    const statLabels = screen.getAllByTestId('stat-label');
    
    expect(statValues[1]).toHaveTextContent('+89');
    expect(statLabels[1]).toHaveTextContent('Productos');
  });

  it('uses default seller name when not provided', () => {
    const propsWithoutName = {
      followersCount: 500,
      productsCount: 25,
      sellerImageUrl: 'https://example.com/default-logo.png',
    };
    
    render(<SellerHeader {...propsWithoutName} />);
    
    const sellerName = screen.getByTestId('seller-name');
    const image = screen.getByTestId('seller-logo').querySelector('img');
    
    expect(sellerName).toHaveTextContent('Link Game');
    expect(image).toHaveAttribute('alt', 'Logo de Link Game');
  });

  it('handles zero followers and products', () => {
    const zeroProps = {
      followersCount: 0,
      productsCount: 0,
      sellerImageUrl: 'https://example.com/zero-logo.png',
      sellerName: 'Empty Store',
    };
    
    render(<SellerHeader {...zeroProps} />);
    
    const statValues = screen.getAllByTestId('stat-value');
    expect(statValues[0]).toHaveTextContent('+0');
    expect(statValues[1]).toHaveTextContent('+0');
  });

  it('handles high numbers', () => {
    const highNumbersProps = {
      followersCount: 999999,
      productsCount: 50000,
      sellerImageUrl: 'https://example.com/high-logo.png',
      sellerName: 'Mega Store',
    };
    
    render(<SellerHeader {...highNumbersProps} />);
    
    const statValues = screen.getAllByTestId('stat-value');
    expect(statValues[0]).toHaveTextContent('+999999');
    expect(statValues[1]).toHaveTextContent('+50000');
  });

  it('handles negative numbers', () => {
    const negativeProps = {
      followersCount: -100,
      productsCount: -50,
      sellerImageUrl: 'https://example.com/negative-logo.png',
      sellerName: 'Negative Store',
    };
    
    render(<SellerHeader {...negativeProps} />);
    
    const statValues = screen.getAllByTestId('stat-value');
    expect(statValues[0]).toHaveTextContent('+-100');
    expect(statValues[1]).toHaveTextContent('+-50');
  });

  it('handles empty seller name', () => {
    const emptyNameProps = {
      followersCount: 100,
      productsCount: 10,
      sellerImageUrl: 'https://example.com/empty-logo.png',
      sellerName: '',
    };
    
    render(<SellerHeader {...emptyNameProps} />);
    
    const sellerName = screen.getByTestId('seller-name');
    const image = screen.getByTestId('seller-logo').querySelector('img');
    
    expect(sellerName).toHaveTextContent('');
    expect(image).toHaveAttribute('alt', 'Logo de ');
  });

  it('handles special characters in seller name', () => {
    const specialCharsProps = {
      followersCount: 100,
      productsCount: 10,
      sellerImageUrl: 'https://example.com/special-logo.png',
      sellerName: 'Store with symbols: !@#$%^&*() áéíóú ñ',
    };
    
    render(<SellerHeader {...specialCharsProps} />);
    
    const sellerName = screen.getByTestId('seller-name');
    const image = screen.getByTestId('seller-logo').querySelector('img');
    
    expect(sellerName).toHaveTextContent('Store with symbols: !@#$%^&*() áéíóú ñ');
    expect(image).toHaveAttribute('alt', 'Logo de Store with symbols: !@#$%^&*() áéíóú ñ');
  });

  it('handles very long seller name', () => {
    const longNameProps = {
      followersCount: 100,
      productsCount: 10,
      sellerImageUrl: 'https://example.com/long-logo.png',
      sellerName: 'This is a very long seller name that exceeds the normal width of the component and may cause layout issues or text overflow problems',
    };
    
    render(<SellerHeader {...longNameProps} />);
    
    const sellerName = screen.getByTestId('seller-name');
    expect(sellerName).toHaveTextContent('This is a very long seller name that exceeds the normal width of the component and may cause layout issues or text overflow problems');
  });

  it('handles very long image URL', () => {
    const longUrlProps = {
      followersCount: 100,
      productsCount: 10,
      sellerImageUrl: 'https://example.com/very/long/path/to/seller/logo/image/with/many/subdirectories/and/a/very/long/filename/that/may/cause/issues.png',
      sellerName: 'Long URL Store',
    };
    
    render(<SellerHeader {...longUrlProps} />);
    
    const image = screen.getByTestId('seller-logo').querySelector('img');
    expect(image).toHaveAttribute('src', 'https://example.com/very/long/path/to/seller/logo/image/with/many/subdirectories/and/a/very/long/filename/that/may/cause/issues.png');
  });

  it('renders with different props values', () => {
    const { rerender } = render(<SellerHeader {...defaultProps} />);
    
    let statValues = screen.getAllByTestId('stat-value');
    expect(statValues[0]).toHaveTextContent('+1250');
    expect(statValues[1]).toHaveTextContent('+89');
    
    const newProps = {
      followersCount: 2000,
      productsCount: 150,
      sellerImageUrl: 'https://example.com/new-logo.png',
      sellerName: 'New Store',
    };
    
    rerender(<SellerHeader {...newProps} />);
    
    statValues = screen.getAllByTestId('stat-value');
    expect(statValues[0]).toHaveTextContent('+2000');
    expect(statValues[1]).toHaveTextContent('+150');
    
    const sellerName = screen.getByTestId('seller-name');
    expect(sellerName).toHaveTextContent('New Store');
  });

  it('maintains structure with all props', () => {
    render(<SellerHeader {...defaultProps} />);
    
    // Check that all main sections are present
    expect(screen.getByTestId('header-container')).toBeInTheDocument();
    expect(screen.getByTestId('seller-logo')).toBeInTheDocument();
    expect(screen.getByTestId('seller-info')).toBeInTheDocument();
    expect(screen.getByTestId('seller-name')).toBeInTheDocument();
    expect(screen.getByTestId('seller-stats')).toBeInTheDocument();
    
    // Check that stats have correct structure
    const statItems = screen.getAllByTestId('stat-item');
    expect(statItems).toHaveLength(2);
    
    statItems.forEach(statItem => {
      expect(statItem.querySelector('[data-testid="stat-value"]')).toBeInTheDocument();
      expect(statItem.querySelector('[data-testid="stat-label"]')).toBeInTheDocument();
    });
  });
});
