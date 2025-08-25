import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { describe, it, expect } from 'vitest';
import Navbar from './Navbar';
import theme from '../../styled/theme';

// Wrapper component to provide theme context
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Navbar', () => {
  it('renders the navbar container', () => {
    renderWithTheme(<Navbar />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('renders the Mercado Libre logo with default values', () => {
    renderWithTheme(<Navbar />);
    
    const logo = screen.getByAltText('Mercado Libre');
    expect(logo).toBeInTheDocument();
  });

  it('logo has correct default src attribute', () => {
    renderWithTheme(<Navbar />);
    
    const logo = screen.getByAltText('Mercado Libre') as HTMLImageElement;
    expect(logo.src).toContain('mercadolibre/logo_large_plus@2x.webp');
  });

  it('logo has correct default alt text', () => {
    renderWithTheme(<Navbar />);
    
    const logo = screen.getByAltText('Mercado Libre');
    expect(logo).toHaveAttribute('alt', 'Mercado Libre');
  });

  it('logo is visible and accessible', () => {
    renderWithTheme(<Navbar />);
    
    const logo = screen.getByRole('img', { name: 'Mercado Libre' });
    expect(logo).toBeVisible();
  });

  it('renders with custom src and alt props', () => {
    const customSrc = 'https://example.com/custom-logo.png';
    const customAlt = 'Custom Logo';
    
    renderWithTheme(<Navbar src={customSrc} alt={customAlt} />);
    
    const logo = screen.getByAltText(customAlt) as HTMLImageElement;
    expect(logo.src).toContain('custom-logo.png');
    expect(logo).toHaveAttribute('alt', customAlt);
  });

  it('renders with only custom src prop', () => {
    const customSrc = 'https://example.com/custom-logo.png';
    
    renderWithTheme(<Navbar src={customSrc} />);
    
    const logo = screen.getByAltText('Mercado Libre') as HTMLImageElement;
    expect(logo.src).toContain('custom-logo.png');
    expect(logo).toHaveAttribute('alt', 'Mercado Libre');
  });

  it('renders with only custom alt prop', () => {
    const customAlt = 'Custom Alt Text';
    
    renderWithTheme(<Navbar alt={customAlt} />);
    
    const logo = screen.getByAltText(customAlt) as HTMLImageElement;
    expect(logo.src).toContain('mercadolibre/logo_large_plus@2x.webp');
    expect(logo).toHaveAttribute('alt', customAlt);
  });
});
