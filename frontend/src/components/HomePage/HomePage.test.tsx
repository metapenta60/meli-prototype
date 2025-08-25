import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from './HomePage';

vi.mock('../Dropdown', () => ({
  default: ({ onSelectionChange }: { onSelectionChange: (value: string) => void }) => (
    <div data-testid="dropdown-mock" onClick={() => onSelectionChange('test-product')}>
      Mock Dropdown
    </div>
  ),
}));


vi.mock('../../App.styled', () => ({
  AppContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-container">{children}</div>
  ),
  Title: ({ children }: { children: React.ReactNode }) => (
    <h1 data-testid="title">{children}</h1>
  ),
  Subtitle: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="subtitle">{children}</p>
  ),
}));

describe('HomePage', () => {
  it('renders the welcome title', () => {
    render(<HomePage />);
    
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Bienvenido a Mercado Libre');
  });

  it('renders the subtitle', () => {
    render(<HomePage />);
    
    const subtitle = screen.getByTestId('subtitle');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent('Escoge uno de los productos para visualizarlo');
  });

  it('renders the dropdown component', () => {
    render(<HomePage />);
    
    const dropdown = screen.getByTestId('dropdown-mock');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveTextContent('Mock Dropdown');
  });

  it('renders the app container', () => {
    render(<HomePage />);
    
    const container = screen.getByTestId('app-container');
    expect(container).toBeInTheDocument();
  });

  it('handles product selection correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<HomePage />);
    
    const dropdown = screen.getByTestId('dropdown-mock');
    dropdown.click();
    
    expect(consoleSpy).toHaveBeenCalledWith('Producto seleccionado:', 'test-product');
    
    consoleSpy.mockRestore();
  });
});
