import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaymentInfoCard from './PaymentInfoCard';

// Mock the styled components
vi.mock('./PaymentInfoCard.styled.tsx', () => ({
  PaymentInfoContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="payment-info-container">{children}</div>
  ),
  PaymentTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="payment-title">{children}</h3>
  ),
  PromotionalBanner: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="promotional-banner">{children}</div>
  ),
  BannerIcon: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="banner-icon">{children}</div>
  ),
  BannerText: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="banner-text">{children}</span>
  ),
  PaymentSectionsContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="payment-sections-container">{children}</div>
  ),
}));

// Mock the PaymentGroup component
vi.mock('../PaymentGroup', () => ({
  default: ({ title, logos }: { title: string; logos: string[] }) => (
    <div data-testid="payment-group">
      Payment Group: {title} ({logos.length} logos)
    </div>
  ),
}));

// Mock the credit card icon
vi.mock('../../assets/credit-card-icon.svg', () => ({
  default: 'credit-card-icon.svg',
}));

describe('PaymentInfoCard', () => {
  const defaultPaymentMethods = [
    { title: 'Tarjetas de crédito', images: ['visa.png', 'mastercard.png', 'amex.png'] },
    { title: 'Tarjetas de débito', images: ['debit-visa.png', 'debit-mastercard.png'] },
    { title: 'Transferencias', images: ['bank-transfer.png'] },
  ];

  it('renders the payment info container', () => {
    render(<PaymentInfoCard installments={12} paymentMethods={defaultPaymentMethods} />);
    
    const container = screen.getByTestId('payment-info-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the payment title', () => {
    render(<PaymentInfoCard installments={12} paymentMethods={defaultPaymentMethods} />);
    
    const title = screen.getByTestId('payment-title');
    expect(title).toHaveTextContent('Medios de pago');
  });

  it('renders the promotional banner', () => {
    render(<PaymentInfoCard installments={12} paymentMethods={defaultPaymentMethods} />);
    
    const banner = screen.getByTestId('promotional-banner');
    expect(banner).toBeInTheDocument();
  });

  it('renders the banner icon with credit card image', () => {
    render(<PaymentInfoCard installments={12} paymentMethods={defaultPaymentMethods} />);
    
    const bannerIcon = screen.getByTestId('banner-icon');
    const creditCardImage = bannerIcon.querySelector('img');
    
    expect(creditCardImage).toBeInTheDocument();
    expect(creditCardImage).toHaveAttribute('src', 'credit-card-icon.svg');
    expect(creditCardImage).toHaveAttribute('alt', 'Tarjeta de crédito');
    expect(creditCardImage).toHaveAttribute('width', '24');
    expect(creditCardImage).toHaveAttribute('height', '24');
  });

  it('renders the banner text with correct installments', () => {
    render(<PaymentInfoCard installments={12} paymentMethods={defaultPaymentMethods} />);
    
    const bannerText = screen.getByTestId('banner-text');
    expect(bannerText).toHaveTextContent('¡Paga en hasta 12 cuotas con 0% interés!');
  });

  it('renders the payment sections container', () => {
    render(<PaymentInfoCard installments={12} paymentMethods={defaultPaymentMethods} />);
    
    const sectionsContainer = screen.getByTestId('payment-sections-container');
    expect(sectionsContainer).toBeInTheDocument();
  });

  it('renders payment groups for each payment method', () => {
    render(<PaymentInfoCard installments={12} paymentMethods={defaultPaymentMethods} />);
    
    const paymentGroups = screen.getAllByTestId('payment-group');
    expect(paymentGroups).toHaveLength(3);
  });

  it('renders payment groups with correct titles and logo counts', () => {
    render(<PaymentInfoCard installments={12} paymentMethods={defaultPaymentMethods} />);
    
    const paymentGroups = screen.getAllByTestId('payment-group');
    
    expect(paymentGroups[0]).toHaveTextContent('Payment Group: Tarjetas de crédito (3 logos)');
    expect(paymentGroups[1]).toHaveTextContent('Payment Group: Tarjetas de débito (2 logos)');
    expect(paymentGroups[2]).toHaveTextContent('Payment Group: Transferencias (1 logos)');
  });

  it('handles single payment method', () => {
    const singleMethod = [{ title: 'Solo efectivo', images: ['cash.png'] }];
    
    render(<PaymentInfoCard installments={6} paymentMethods={singleMethod} />);
    
    const paymentGroups = screen.getAllByTestId('payment-group');
    expect(paymentGroups).toHaveLength(1);
    expect(paymentGroups[0]).toHaveTextContent('Payment Group: Solo efectivo (1 logos)');
  });

  it('handles empty payment methods array', () => {
    render(<PaymentInfoCard installments={3} paymentMethods={[]} />);
    
    const paymentGroups = screen.queryAllByTestId('payment-group');
    expect(paymentGroups).toHaveLength(0);
  });

  it('handles zero installments', () => {
    render(<PaymentInfoCard installments={0} paymentMethods={defaultPaymentMethods} />);
    
    const bannerText = screen.getByTestId('banner-text');
    expect(bannerText).toHaveTextContent('¡Paga en hasta 0 cuotas con 0% interés!');
  });

  it('handles high number of installments', () => {
    render(<PaymentInfoCard installments={48} paymentMethods={defaultPaymentMethods} />);
    
    const bannerText = screen.getByTestId('banner-text');
    expect(bannerText).toHaveTextContent('¡Paga en hasta 48 cuotas con 0% interés!');
  });

  it('handles payment methods with empty images array', () => {
    const methodsWithEmptyImages = [
      { title: 'Sin imágenes', images: [] },
      { title: 'Con imágenes', images: ['image1.png', 'image2.png'] },
    ];
    
    render(<PaymentInfoCard installments={12} paymentMethods={methodsWithEmptyImages} />);
    
    const paymentGroups = screen.getAllByTestId('payment-group');
    expect(paymentGroups[0]).toHaveTextContent('Payment Group: Sin imágenes (0 logos)');
    expect(paymentGroups[1]).toHaveTextContent('Payment Group: Con imágenes (2 logos)');
  });

  it('handles payment methods with many images', () => {
    const methodsWithManyImages = [
      { title: 'Muchas opciones', images: Array.from({ length: 20 }, (_, i) => `logo${i + 1}.png`) },
    ];
    
    render(<PaymentInfoCard installments={12} paymentMethods={methodsWithManyImages} />);
    
    const paymentGroups = screen.getAllByTestId('payment-group');
    expect(paymentGroups[0]).toHaveTextContent('Payment Group: Muchas opciones (20 logos)');
  });

  it('handles payment methods with special characters in titles', () => {
    const methodsWithSpecialChars = [
      { title: 'Método con símbolos: !@#$%^&*()', images: ['logo.png'] },
      { title: 'Método con acentos: áéíóú ñ', images: ['logo2.png'] },
    ];
    
    render(<PaymentInfoCard installments={12} paymentMethods={methodsWithSpecialChars} />);
    
    const paymentGroups = screen.getAllByTestId('payment-group');
    expect(paymentGroups[0]).toHaveTextContent('Payment Group: Método con símbolos: !@#$%^&*() (1 logos)');
    expect(paymentGroups[1]).toHaveTextContent('Payment Group: Método con acentos: áéíóú ñ (1 logos)');
  });

  it('handles payment methods with long titles', () => {
    const methodsWithLongTitles = [
      { title: 'Este es un título muy largo que excede el ancho normal del componente y puede causar problemas de layout', images: ['logo.png'] },
    ];
    
    render(<PaymentInfoCard installments={12} paymentMethods={methodsWithLongTitles} />);
    
    const paymentGroups = screen.getAllByTestId('payment-group');
    expect(paymentGroups[0]).toHaveTextContent('Payment Group: Este es un título muy largo que excede el ancho normal del componente y puede causar problemas de layout (1 logos)');
  });

  it('handles negative installments', () => {
    render(<PaymentInfoCard installments={-5} paymentMethods={defaultPaymentMethods} />);
    
    const bannerText = screen.getByTestId('banner-text');
    expect(bannerText).toHaveTextContent('¡Paga en hasta -5 cuotas con 0% interés!');
  });

  it('renders with different installments values', () => {
    const { rerender } = render(<PaymentInfoCard installments={6} paymentMethods={defaultPaymentMethods} />);
    
    let bannerText = screen.getByTestId('banner-text');
    expect(bannerText).toHaveTextContent('¡Paga en hasta 6 cuotas con 0% interés!');
    
    rerender(<PaymentInfoCard installments={24} paymentMethods={defaultPaymentMethods} />);
    
    bannerText = screen.getByTestId('banner-text');
    expect(bannerText).toHaveTextContent('¡Paga en hasta 24 cuotas con 0% interés!');
  });

  it('renders with different payment methods', () => {
    const { rerender } = render(<PaymentInfoCard installments={12} paymentMethods={defaultPaymentMethods} />);
    
    let paymentGroups = screen.getAllByTestId('payment-group');
    expect(paymentGroups).toHaveLength(3);
    
    const newMethods = [{ title: 'Nuevo método', images: ['new.png'] }];
    rerender(<PaymentInfoCard installments={12} paymentMethods={newMethods} />);
    
    paymentGroups = screen.getAllByTestId('payment-group');
    expect(paymentGroups).toHaveLength(1);
    expect(paymentGroups[0]).toHaveTextContent('Payment Group: Nuevo método (1 logos)');
  });
});
