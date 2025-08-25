import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemSection from './ItemSection';

// Mock the styled components
vi.mock('./ItemSection.styled.tsx', () => ({
  SectionContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="section-container">{children}</div>
  ),
  SectionTitle: ({ children }: { children: React.ReactNode }) => (
    <h2 data-testid="section-title">{children}</h2>
  ),
}));

describe('ItemSection', () => {
  it('renders the section title correctly', () => {
    const title = 'Test Section Title';
    render(<ItemSection title={title}>Test content</ItemSection>);
    
    const titleElement = screen.getByTestId('section-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);
  });

  it('renders children content correctly', () => {
    const childrenContent = 'This is test content';
    render(<ItemSection title="Test Title">{childrenContent}</ItemSection>);
    
    expect(screen.getByText(childrenContent)).toBeInTheDocument();
  });

  it('renders the section container', () => {
    render(<ItemSection title="Test Title">Test content</ItemSection>);
    
    const container = screen.getByTestId('section-container');
    expect(container).toBeInTheDocument();
  });

  it('renders with empty title', () => {
    render(<ItemSection title="">Test content</ItemSection>);
    
    const titleElement = screen.getByTestId('section-title');
    expect(titleElement).toHaveTextContent('');
  });

  it('renders with complex children', () => {
    const complexChildren = (
      <div>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
        <button>Click me</button>
      </div>
    );
    
    render(<ItemSection title="Complex Section">{complexChildren}</ItemSection>);
    
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
