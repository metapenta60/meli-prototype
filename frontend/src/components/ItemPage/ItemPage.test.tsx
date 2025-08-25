import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useParams, useNavigate } from 'react-router-dom';
import ItemPage from './ItemPage';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

// Mock the styled components
vi.mock('./ItemPage.styled', () => ({
  ItemPageContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="item-page-container">{children}</div>
  ),
  MainContentWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-content-wrapper">{children}</div>
  ),
}));

// Mock the FamilyBar component
vi.mock('../FamilyBar', () => ({
  default: ({ familyName, onBack }: { familyName: string; onBack: () => void }) => (
    <div data-testid="family-bar" onClick={onBack}>
      {familyName}
    </div>
  ),
}));

// Mock the ItemDetails component
vi.mock('../ItemDetails', () => ({
  default: ({ itemId }: { itemId: string }) => (
    <div data-testid="item-details">
      Item ID: {itemId}
    </div>
  ),
}));

describe('ItemPage', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('renders the item page container', () => {
    vi.mocked(useParams).mockReturnValue({ id: 'test-id' });
    
    render(<ItemPage />);
    
    const container = screen.getByTestId('item-page-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the main content wrapper', () => {
    vi.mocked(useParams).mockReturnValue({ id: 'test-id' });
    
    render(<ItemPage />);
    
    const wrapper = screen.getByTestId('main-content-wrapper');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders the family bar with correct props', () => {
    vi.mocked(useParams).mockReturnValue({ id: 'test-id' });
    
    render(<ItemPage />);
    
    const familyBar = screen.getByTestId('family-bar');
    expect(familyBar).toBeInTheDocument();
    expect(familyBar).toHaveTextContent('Celulares y Smartphones');
  });

  it('renders the item details with correct item ID', () => {
    vi.mocked(useParams).mockReturnValue({ id: 'test-id' });
    
    render(<ItemPage />);
    
    const itemDetails = screen.getByTestId('item-details');
    expect(itemDetails).toBeInTheDocument();
    expect(itemDetails).toHaveTextContent('Item ID: test-id');
  });

  it('renders with empty item ID when useParams returns undefined', () => {
    vi.mocked(useParams).mockReturnValue({ id: undefined });
    
    render(<ItemPage />);
    
    const itemDetails = screen.getByTestId('item-details');
    expect(itemDetails).toHaveTextContent('Item ID:');
  });

  it('renders with empty item ID when useParams returns null', () => {
    vi.mocked(useParams).mockReturnValue({ id: null as any });
    
    render(<ItemPage />);
    
    const itemDetails = screen.getByTestId('item-details');
    expect(itemDetails).toHaveTextContent('Item ID:');
  });

  it('calls navigate when family bar back button is clicked', () => {
    vi.mocked(useParams).mockReturnValue({ id: 'test-id' });
    
    render(<ItemPage />);
    
    const familyBar = screen.getByTestId('family-bar');
    familyBar.click();
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('renders with long item ID', () => {
    const longId = 'very-long-item-id-that-exceeds-normal-length-123456789';
    vi.mocked(useParams).mockReturnValue({ id: longId });
    
    render(<ItemPage />);
    
    const itemDetails = screen.getByTestId('item-details');
    expect(itemDetails).toHaveTextContent(`Item ID: ${longId}`);
  });

  it('renders with special characters in item ID', () => {
    const specialId = 'item-id-with-special-chars-!@#$%^&*()';
    vi.mocked(useParams).mockReturnValue({ id: specialId });
    
    render(<ItemPage />);
    
    const itemDetails = screen.getByTestId('item-details');
    expect(itemDetails).toHaveTextContent(`Item ID: ${specialId}`);
  });

  it('logs the item ID to console', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.mocked(useParams).mockReturnValue({ id: 'test-id' });
    
    render(<ItemPage />);
    
    expect(consoleSpy).toHaveBeenCalledWith('test-id');
    
    consoleSpy.mockRestore();
  });
});
