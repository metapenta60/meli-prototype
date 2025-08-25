import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FamilyBar from './FamilyBar';

// Mock the styled components
vi.mock('./FamilyBar.styled.tsx', () => ({
  FamilyBarContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="family-bar-container">{children}</div>
  ),
  FamilyName: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="family-name">{children}</span>
  ),
}));

vi.mock('../Shared/Link.styled.tsx', () => ({
  Link: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button data-testid="back-link" onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('FamilyBar', () => {
  it('renders the family name correctly', () => {
    const familyName = 'Electronics';
    render(<FamilyBar familyName={familyName} />);
    
    const nameElement = screen.getByTestId('family-name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(familyName);
  });

  it('renders the back link', () => {
    render(<FamilyBar familyName="Test Family" />);
    
    const backLink = screen.getByTestId('back-link');
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveTextContent('Volver');
  });

  it('renders the family bar container', () => {
    render(<FamilyBar familyName="Test Family" />);
    
    const container = screen.getByTestId('family-bar-container');
    expect(container).toBeInTheDocument();
  });

  it('calls onBack when back link is clicked', () => {
    const mockOnBack = vi.fn();
    render(<FamilyBar familyName="Test Family" onBack={mockOnBack} />);
    
    const backLink = screen.getByTestId('back-link');
    fireEvent.click(backLink);
    
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('renders without onBack prop', () => {
    render(<FamilyBar familyName="Test Family" />);
    
    const backLink = screen.getByTestId('back-link');
    expect(backLink).toBeInTheDocument();
    
    // Should not crash when clicked without onBack
    fireEvent.click(backLink);
  });

  it('renders with empty family name', () => {
    render(<FamilyBar familyName="" />);
    
    const nameElement = screen.getByTestId('family-name');
    expect(nameElement).toHaveTextContent('');
  });

  it('renders with long family name', () => {
    const longFamilyName = 'Very Long Family Name That Exceeds Normal Length';
    render(<FamilyBar familyName={longFamilyName} />);
    
    const nameElement = screen.getByTestId('family-name');
    expect(nameElement).toHaveTextContent(longFamilyName);
  });
});
