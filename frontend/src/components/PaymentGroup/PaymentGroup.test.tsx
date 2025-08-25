import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaymentGroup from './PaymentGroup';

// Mock the styled components
vi.mock('./PaymentGroup.styled.tsx', () => ({
  PaymentGroupContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="payment-group-container">{children}</div>
  ),
  PaymentTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="payment-title">{children}</h3>
  ),
  PaymentLogosContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="payment-logos-container">{children}</div>
  ),
  PaymentLogo: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="payment-logo" src={src} alt={alt} />
  ),
}));

describe('PaymentGroup', () => {
  it('renders the payment title correctly', () => {
    const title = 'Credit Cards';
    const logos = ['logo1.png', 'logo2.png'];
    
    render(<PaymentGroup title={title} logos={logos} />);
    
    const titleElement = screen.getByTestId('payment-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);
  });

  it('renders the payment group container', () => {
    const title = 'Test Title';
    const logos = ['logo1.png'];
    
    render(<PaymentGroup title={title} logos={logos} />);
    
    const container = screen.getByTestId('payment-group-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the payment logos container', () => {
    const title = 'Test Title';
    const logos = ['logo1.png'];
    
    render(<PaymentGroup title={title} logos={logos} />);
    
    const logosContainer = screen.getByTestId('payment-logos-container');
    expect(logosContainer).toBeInTheDocument();
  });

  it('renders all payment logos', () => {
    const title = 'Test Title';
    const logos = ['logo1.png', 'logo2.png', 'logo3.png'];
    
    render(<PaymentGroup title={title} logos={logos} />);
    
    const logoElements = screen.getAllByTestId('payment-logo');
    expect(logoElements).toHaveLength(3);
  });

  it('renders logos with correct src and alt attributes', () => {
    const title = 'Test Title';
    const logos = ['logo1.png', 'logo2.png'];
    
    render(<PaymentGroup title={title} logos={logos} />);
    
    const logoElements = screen.getAllByTestId('payment-logo');
    
    expect(logoElements[0]).toHaveAttribute('src', 'logo1.png');
    expect(logoElements[0]).toHaveAttribute('alt', 'Logo 1');
    
    expect(logoElements[1]).toHaveAttribute('src', 'logo2.png');
    expect(logoElements[1]).toHaveAttribute('alt', 'Logo 2');
  });

  it('renders with empty logos array', () => {
    const title = 'Test Title';
    const logos: string[] = [];
    
    render(<PaymentGroup title={title} logos={logos} />);
    
    const logosContainer = screen.getByTestId('payment-logos-container');
    expect(logosContainer).toBeInTheDocument();
    
    const logoElements = screen.queryAllByTestId('payment-logo');
    expect(logoElements).toHaveLength(0);
  });

  it('renders with single logo', () => {
    const title = 'Single Logo';
    const logos = ['single-logo.png'];
    
    render(<PaymentGroup title={title} logos={logos} />);
    
    const logoElements = screen.getAllByTestId('payment-logo');
    expect(logoElements).toHaveLength(1);
    expect(logoElements[0]).toHaveAttribute('src', 'single-logo.png');
    expect(logoElements[0]).toHaveAttribute('alt', 'Logo 1');
  });

  it('renders with empty title', () => {
    const title = '';
    const logos = ['logo1.png'];
    
    render(<PaymentGroup title={title} logos={logos} />);
    
    const titleElement = screen.getByTestId('payment-title');
    expect(titleElement).toHaveTextContent('');
  });

  it('renders with long title', () => {
    const title = 'Very Long Payment Method Title That Exceeds Normal Length';
    const logos = ['logo1.png'];
    
    render(<PaymentGroup title={title} logos={logos} />);
    
    const titleElement = screen.getByTestId('payment-title');
    expect(titleElement).toHaveTextContent(title);
  });
});
