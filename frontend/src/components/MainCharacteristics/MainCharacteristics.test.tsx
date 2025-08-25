import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MainCharacteristics from './MainCharacteristics';

// Mock the styled components
vi.mock('./MainCharacteristics.styled', () => ({
  CharacteristicsContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="characteristics-container">{children}</div>
  ),
  LeftColumn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="left-column">{children}</div>
  ),
  RightColumn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="right-column">{children}</div>
  ),
  CharacteristicItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="characteristic-item">{children}</div>
  ),
  CharacteristicIcon: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="characteristic-icon">{children}</div>
  ),
  CharacteristicContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="characteristic-content">{children}</div>
  ),
  CharacteristicTitle: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="characteristic-title">{children}</span>
  ),
  CharacteristicValue: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="characteristic-value">{children}</span>
  ),
}));

// Mock the OtherCharacteristics component
vi.mock('../OtherCharacteristics', () => ({
  default: ({ characteristicGroups }: { characteristicGroups: any[] }) => (
    <div data-testid="other-characteristics">
      Other Characteristics ({characteristicGroups.length} groups)
    </div>
  ),
}));

// Mock the Shared components
vi.mock('../Shared', () => ({
  Link: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button data-testid="link-button" onClick={onClick}>
      {children}
    </button>
  ),
  ItemLinkContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="item-link-container">{children}</div>
  ),
}));

describe('MainCharacteristics', () => {
  const defaultMainCharacteristics = [
    { icon: 'icon1.svg', title: 'Marca', content: 'Samsung' },
    { icon: 'icon2.svg', title: 'Modelo', content: 'Galaxy S21' },
    { icon: 'icon3.svg', title: 'Color', content: 'Negro' },
    { icon: 'icon4.svg', title: 'Capacidad', content: '128GB' },
    { icon: 'icon5.svg', title: 'Pantalla', content: '6.2 pulgadas' },
    { icon: 'icon6.svg', title: 'Procesador', content: 'Exynos 2100' },
  ];

  const defaultOtherCharacteristics = [
    { title: 'Conectividad', characteristics: [] },
    { title: 'Batería', characteristics: [] },
  ];

  it('renders the characteristics container', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const container = screen.getByTestId('characteristics-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the left column', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const leftColumn = screen.getByTestId('left-column');
    expect(leftColumn).toBeInTheDocument();
  });

  it('renders the right column', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const rightColumn = screen.getByTestId('right-column');
    expect(rightColumn).toBeInTheDocument();
  });

  it('distributes characteristics evenly between columns', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const rightColumn = screen.getByTestId('right-column');
    
    // With 6 items, should have 3 in left, 3 in right
    const leftItems = leftColumn.querySelectorAll('[data-testid="characteristic-item"]');
    const rightItems = rightColumn.querySelectorAll('[data-testid="characteristic-item"]');
    
    expect(leftItems).toHaveLength(3);
    expect(rightItems).toHaveLength(3);
  });

  it('renders characteristic items with correct structure', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const characteristicItems = screen.getAllByTestId('characteristic-item');
    expect(characteristicItems).toHaveLength(6);
    
    // Check first item structure
    const firstItem = characteristicItems[0];
    expect(firstItem.querySelector('[data-testid="characteristic-icon"]')).toBeInTheDocument();
    expect(firstItem.querySelector('[data-testid="characteristic-content"]')).toBeInTheDocument();
  });

  it('renders characteristic icons with correct src and alt', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const icons = screen.getAllByTestId('characteristic-icon');
    const firstIcon = icons[0].querySelector('img');
    
    expect(firstIcon).toHaveAttribute('src', 'icon1.svg');
    expect(firstIcon).toHaveAttribute('alt', 'Marca icon');
  });

  it('renders characteristic titles and values', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const titles = screen.getAllByTestId('characteristic-title');
    const values = screen.getAllByTestId('characteristic-value');
    
    expect(titles[0]).toHaveTextContent('Marca:');
    expect(values[0]).toHaveTextContent('Samsung');
    expect(titles[1]).toHaveTextContent('Modelo:');
    expect(values[1]).toHaveTextContent('Galaxy S21');
  });

  it('renders "Ver todas las características" link initially', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const linkContainer = screen.getByTestId('item-link-container');
    const linkButton = screen.getByTestId('link-button');
    
    expect(linkContainer).toBeInTheDocument();
    expect(linkButton).toHaveTextContent('Ver todas las características');
  });

  it('shows other characteristics when link is clicked', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const linkButton = screen.getByTestId('link-button');
    fireEvent.click(linkButton);
    
    // Should show other characteristics
    const otherCharacteristics = screen.getByTestId('other-characteristics');
    expect(otherCharacteristics).toBeInTheDocument();
    expect(otherCharacteristics).toHaveTextContent('Other Characteristics (2 groups)');
    
    // Should not show the link anymore
    const linkContainer = screen.queryByTestId('item-link-container');
    expect(linkContainer).not.toBeInTheDocument();
  });

  it('handles odd number of characteristics', () => {
    const oddCharacteristics = [
      { icon: 'icon1.svg', title: 'Marca', content: 'Samsung' },
      { icon: 'icon2.svg', title: 'Modelo', content: 'Galaxy S21' },
      { icon: 'icon3.svg', title: 'Color', content: 'Negro' },
    ];
    
    render(<MainCharacteristics mainCharacteristics={oddCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const rightColumn = screen.getByTestId('right-column');
    
    // With 3 items, should have 2 in left (Math.ceil(3/2) = 2), 1 in right
    const leftItems = leftColumn.querySelectorAll('[data-testid="characteristic-item"]');
    const rightItems = rightColumn.querySelectorAll('[data-testid="characteristic-item"]');
    
    expect(leftItems).toHaveLength(2);
    expect(rightItems).toHaveLength(1);
  });

  it('handles single characteristic', () => {
    const singleCharacteristic = [
      { icon: 'icon1.svg', title: 'Marca', content: 'Samsung' },
    ];
    
    render(<MainCharacteristics mainCharacteristics={singleCharacteristic} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const rightColumn = screen.getByTestId('right-column');
    
    // With 1 item, should have 1 in left (Math.ceil(1/2) = 1), 0 in right
    const leftItems = leftColumn.querySelectorAll('[data-testid="characteristic-item"]');
    const rightItems = rightColumn.querySelectorAll('[data-testid="characteristic-item"]');
    
    expect(leftItems).toHaveLength(1);
    expect(rightItems).toHaveLength(0);
  });

  it('handles empty characteristics array', () => {
    render(<MainCharacteristics mainCharacteristics={[]} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const rightColumn = screen.getByTestId('right-column');
    
    const leftItems = leftColumn.querySelectorAll('[data-testid="characteristic-item"]');
    const rightItems = rightColumn.querySelectorAll('[data-testid="characteristic-item"]');
    
    expect(leftItems).toHaveLength(0);
    expect(rightItems).toHaveLength(0);
  });

  it('handles empty other characteristics array', () => {
    render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={[]} />);
    
    const linkButton = screen.getByTestId('link-button');
    fireEvent.click(linkButton);
    
    const otherCharacteristics = screen.getByTestId('other-characteristics');
    expect(otherCharacteristics).toHaveTextContent('Other Characteristics (0 groups)');
  });

  it('renders with long characteristic titles and values', () => {
    const longCharacteristics = [
      { icon: 'icon1.svg', title: 'Característica muy larga que excede el ancho normal', content: 'Valor muy largo que también excede el ancho normal y puede causar problemas de layout' },
    ];
    
    render(<MainCharacteristics mainCharacteristics={longCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const title = screen.getByTestId('characteristic-title');
    const value = screen.getByTestId('characteristic-value');
    
    expect(title).toHaveTextContent('Característica muy larga que excede el ancho normal:');
    expect(value).toHaveTextContent('Valor muy largo que también excede el ancho normal y puede causar problemas de layout');
  });

  it('renders with special characters in titles and values', () => {
    const specialCharacteristics = [
      { icon: 'icon1.svg', title: 'Característica con símbolos: !@#$%^&*()', content: 'Valor con símbolos: €£¥¢§¶†‡' },
    ];
    
    render(<MainCharacteristics mainCharacteristics={specialCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const title = screen.getByTestId('characteristic-title');
    const value = screen.getByTestId('characteristic-value');
    
    expect(title).toHaveTextContent('Característica con símbolos: !@#$%^&*():');
    expect(value).toHaveTextContent('Valor con símbolos: €£¥¢§¶†‡');
  });

  it('maintains state when re-rendering with same props', () => {
    const { rerender } = render(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    // Initially should show link
    expect(screen.getByTestId('item-link-container')).toBeInTheDocument();
    
    // Click to show other characteristics
    const linkButton = screen.getByTestId('link-button');
    fireEvent.click(linkButton);
    
    // Should show other characteristics
    expect(screen.getByTestId('other-characteristics')).toBeInTheDocument();
    
    // Re-render with same props
    rerender(<MainCharacteristics mainCharacteristics={defaultMainCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    // Should still show other characteristics (state maintained)
    expect(screen.getByTestId('other-characteristics')).toBeInTheDocument();
  });

  it('handles many characteristics', () => {
    const manyCharacteristics = Array.from({ length: 20 }, (_, i) => ({
      icon: `icon${i + 1}.svg`,
      title: `Característica ${i + 1}`,
      content: `Valor ${i + 1}`,
    }));
    
    render(<MainCharacteristics mainCharacteristics={manyCharacteristics} otherCharacteristics={defaultOtherCharacteristics} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const rightColumn = screen.getByTestId('right-column');
    
    // With 20 items, should have 10 in left (Math.ceil(20/2) = 10), 10 in right
    const leftItems = leftColumn.querySelectorAll('[data-testid="characteristic-item"]');
    const rightItems = rightColumn.querySelectorAll('[data-testid="characteristic-item"]');
    
    expect(leftItems).toHaveLength(10);
    expect(rightItems).toHaveLength(10);
  });
});
