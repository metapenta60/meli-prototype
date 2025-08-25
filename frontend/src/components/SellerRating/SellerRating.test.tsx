import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SellerRating from './SellerRating';

// Mock styled-components theme
const mockTheme = {
  colors: {
    heatmap: {
      veryPoor: '#ff0000',
      poor: '#ff6600',
      fair: '#ffcc00',
      good: '#99cc00',
      veryGood: '#33cc33',
      excellent: '#00cc66',
    },
  },
};

// Mock styled-components
vi.mock('styled-components', () => ({
  useTheme: () => mockTheme,
}));

// Mock the styled components
vi.mock('./SellerRating.styled.tsx', () => ({
  RatingContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="rating-container">{children}</div>
  ),
  HeatmapBar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="heatmap-bar">{children}</div>
  ),
  HeatmapSegment: ({ color, isActive, children }: { color: string; isActive: boolean; children?: React.ReactNode }) => (
    <div data-testid="heatmap-segment" data-color={color} data-active={isActive}>{children}</div>
  ),
  MetricsContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="metrics-container">{children}</div>
  ),
  MetricItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="metric-item">{children}</div>
  ),
  MetricValue: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="metric-value">{children}</span>
  ),
  MetricDescription: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="metric-description">{children}</span>
  ),
  MetricIcon: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="metric-icon">{children}</div>
  ),
}));

// Mock SVG assets
vi.mock('../../assets/building-icon.svg', () => ({ default: 'building-icon.svg' }));
vi.mock('../../assets/clock-icon.svg', () => ({ default: 'clock-icon.svg' }));

describe('SellerRating', () => {
  const defaultProps = {
    rating: 4.2,
    salesCount: 150,
    attentionDescription: 'Excelente atención al cliente',
    puntualityDescription: 'Muy puntual en los envíos',
  };

  it('renders the rating container', () => {
    render(<SellerRating {...defaultProps} />);
    
    const container = screen.getByTestId('rating-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the heatmap bar', () => {
    render(<SellerRating {...defaultProps} />);
    
    const heatmapBar = screen.getByTestId('heatmap-bar');
    expect(heatmapBar).toBeInTheDocument();
  });

  it('renders 5 heatmap segments', () => {
    render(<SellerRating {...defaultProps} />);
    
    const segments = screen.getAllByTestId('heatmap-segment');
    expect(segments).toHaveLength(5);
  });

  it('renders the metrics container', () => {
    render(<SellerRating {...defaultProps} />);
    
    const metricsContainer = screen.getByTestId('metrics-container');
    expect(metricsContainer).toBeInTheDocument();
  });

  it('renders 3 metric items', () => {
    render(<SellerRating {...defaultProps} />);
    
    const metricItems = screen.getAllByTestId('metric-item');
    expect(metricItems).toHaveLength(3);
  });

  it('displays sales count with plus sign', () => {
    render(<SellerRating {...defaultProps} />);
    
    const salesValue = screen.getByTestId('metric-value');
    expect(salesValue).toHaveTextContent('+150');
  });

  it('displays sales description', () => {
    render(<SellerRating {...defaultProps} />);
    
    const descriptions = screen.getAllByTestId('metric-description');
    expect(descriptions[0]).toHaveTextContent('Ventas concretadas');
  });

  it('displays attention description', () => {
    render(<SellerRating {...defaultProps} />);
    
    const descriptions = screen.getAllByTestId('metric-description');
    expect(descriptions[1]).toHaveTextContent('Excelente atención al cliente');
  });

  it('displays puntuality description', () => {
    render(<SellerRating {...defaultProps} />);
    
    const descriptions = screen.getAllByTestId('metric-description');
    expect(descriptions[2]).toHaveTextContent('Muy puntual en los envíos');
  });

  it('renders building icon for attention metric', () => {
    render(<SellerRating {...defaultProps} />);
    
    const metricIcons = screen.getAllByTestId('metric-icon');
    const buildingIcon = metricIcons[0].querySelector('img');
    
    expect(buildingIcon).toBeInTheDocument();
    expect(buildingIcon).toHaveAttribute('src', 'building-icon.svg');
    expect(buildingIcon).toHaveAttribute('alt', 'Edificio');
    expect(buildingIcon).toHaveAttribute('width', '20');
    expect(buildingIcon).toHaveAttribute('height', '20');
  });

  it('renders clock icon for puntuality metric', () => {
    render(<SellerRating {...defaultProps} />);
    
    const metricIcons = screen.getAllByTestId('metric-icon');
    const clockIcon = metricIcons[1].querySelector('img');
    
    expect(clockIcon).toBeInTheDocument();
    expect(clockIcon).toHaveAttribute('src', 'clock-icon.svg');
    expect(clockIcon).toHaveAttribute('alt', 'Reloj');
    expect(clockIcon).toHaveAttribute('width', '20');
    expect(clockIcon).toHaveAttribute('height', '20');
  });

  describe('Rating logic and heatmap colors', () => {
    it('applies correct colors for excellent rating (4.5+)', () => {
      render(<SellerRating {...defaultProps} rating={4.8} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-color', mockTheme.colors.heatmap.poor);
      expect(segments[1]).toHaveAttribute('data-color', mockTheme.colors.heatmap.fair);
      expect(segments[2]).toHaveAttribute('data-color', mockTheme.colors.heatmap.good);
      expect(segments[3]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryGood);
      expect(segments[4]).toHaveAttribute('data-color', mockTheme.colors.heatmap.excellent);
    });

    it('applies correct colors for very good rating (4.0-4.49)', () => {
      render(<SellerRating {...defaultProps} rating={4.2} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-color', mockTheme.colors.heatmap.poor);
      expect(segments[1]).toHaveAttribute('data-color', mockTheme.colors.heatmap.fair);
      expect(segments[2]).toHaveAttribute('data-color', mockTheme.colors.heatmap.good);
      expect(segments[3]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryGood);
      expect(segments[4]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryGood);
    });

    it('applies correct colors for good rating (3.5-3.99)', () => {
      render(<SellerRating {...defaultProps} rating={3.7} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-color', mockTheme.colors.heatmap.poor);
      expect(segments[1]).toHaveAttribute('data-color', mockTheme.colors.heatmap.fair);
      expect(segments[2]).toHaveAttribute('data-color', mockTheme.colors.heatmap.good);
      expect(segments[3]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryGood);
      expect(segments[4]).toHaveAttribute('data-color', mockTheme.colors.heatmap.good);
    });

    it('applies correct colors for fair rating (3.0-3.49)', () => {
      render(<SellerRating {...defaultProps} rating={3.2} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-color', mockTheme.colors.heatmap.poor);
      expect(segments[1]).toHaveAttribute('data-color', mockTheme.colors.heatmap.fair);
      expect(segments[2]).toHaveAttribute('data-color', mockTheme.colors.heatmap.good);
      expect(segments[3]).toHaveAttribute('data-color', mockTheme.colors.heatmap.good);
      expect(segments[4]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
    });

    it('applies correct colors for poor rating (2.5-2.99)', () => {
      render(<SellerRating {...defaultProps} rating={2.7} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-color', mockTheme.colors.heatmap.poor);
      expect(segments[1]).toHaveAttribute('data-color', mockTheme.colors.heatmap.fair);
      expect(segments[2]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
      expect(segments[3]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
      expect(segments[4]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
    });

    it('applies correct colors for very poor rating (2.0-2.49)', () => {
      render(<SellerRating {...defaultProps} rating={2.3} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-color', mockTheme.colors.heatmap.poor);
      expect(segments[1]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
      expect(segments[2]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
      expect(segments[3]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
      expect(segments[4]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
    });

    it('applies correct colors for extremely poor rating (<2.0)', () => {
      render(<SellerRating {...defaultProps} rating={1.5} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
      expect(segments[1]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
      expect(segments[2]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
      expect(segments[3]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
      expect(segments[4]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
    });
  });

  describe('Heatmap segment activation', () => {
    it('activates correct number of segments for integer rating', () => {
      render(<SellerRating {...defaultProps} rating={3} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-active', 'true');  // 1
      expect(segments[1]).toHaveAttribute('data-active', 'true');  // 2
      expect(segments[2]).toHaveAttribute('data-active', 'true');  // 3
      expect(segments[3]).toHaveAttribute('data-active', 'false'); // 4
      expect(segments[4]).toHaveAttribute('data-active', 'false'); // 5
    });

    it('activates correct number of segments for decimal rating', () => {
      render(<SellerRating {...defaultProps} rating={4.7} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-active', 'true');  // 1
      expect(segments[1]).toHaveAttribute('data-active', 'true');  // 2
      expect(segments[2]).toHaveAttribute('data-active', 'true');  // 3
      expect(segments[3]).toHaveAttribute('data-active', 'true');  // 4
      expect(segments[4]).toHaveAttribute('data-active', 'false'); // 5 (Math.floor(4.7) = 4)
    });

    it('activates all segments for maximum rating', () => {
      render(<SellerRating {...defaultProps} rating={5} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      segments.forEach(segment => {
        expect(segment).toHaveAttribute('data-active', 'true');
      });
    });

    it('activates no segments for minimum rating', () => {
      render(<SellerRating {...defaultProps} rating={0.5} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      segments.forEach(segment => {
        expect(segment).toHaveAttribute('data-active', 'false');
      });
    });
  });

  describe('Edge cases', () => {
    it('handles zero rating', () => {
      render(<SellerRating {...defaultProps} rating={0} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      segments.forEach(segment => {
        expect(segment).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
        expect(segment).toHaveAttribute('data-active', 'false');
      });
    });

    it('handles negative rating', () => {
      render(<SellerRating {...defaultProps} rating={-1} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      segments.forEach(segment => {
        expect(segment).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryPoor);
        expect(segment).toHaveAttribute('data-active', 'false');
      });
    });

    it('handles rating above 5', () => {
      render(<SellerRating {...defaultProps} rating={6.5} />);
      
      const segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[0]).toHaveAttribute('data-color', mockTheme.colors.heatmap.poor);
      expect(segments[1]).toHaveAttribute('data-color', mockTheme.colors.heatmap.fair);
      expect(segments[2]).toHaveAttribute('data-color', mockTheme.colors.heatmap.good);
      expect(segments[3]).toHaveAttribute('data-color', mockTheme.colors.heatmap.veryGood);
      expect(segments[4]).toHaveAttribute('data-color', mockTheme.colors.heatmap.excellent);
      
      // All segments should be active (Math.floor(6.5) = 6, but max is 5)
      segments.forEach(segment => {
        expect(segment).toHaveAttribute('data-active', 'true');
      });
    });

    it('handles zero sales count', () => {
      render(<SellerRating {...defaultProps} salesCount={0} />);
      
      const salesValue = screen.getByTestId('metric-value');
      expect(salesValue).toHaveTextContent('+0');
    });

    it('handles very high sales count', () => {
      render(<SellerRating {...defaultProps} salesCount={999999} />);
      
      const salesValue = screen.getByTestId('metric-value');
      expect(salesValue).toHaveTextContent('+999999');
    });

    it('handles empty descriptions', () => {
      render(<SellerRating {...defaultProps} attentionDescription="" puntualityDescription="" />);
      
      const descriptions = screen.getAllByTestId('metric-description');
      expect(descriptions[1]).toHaveTextContent('');
      expect(descriptions[2]).toHaveTextContent('');
    });

    it('handles very long descriptions', () => {
      const longDescription = 'Esta es una descripción muy larga que excede el ancho normal del componente y puede causar problemas de layout o text overflow en la interfaz de usuario';
      
      render(<SellerRating {...defaultProps} attentionDescription={longDescription} puntualityDescription={longDescription} />);
      
      const descriptions = screen.getAllByTestId('metric-description');
      expect(descriptions[1]).toHaveTextContent(longDescription);
      expect(descriptions[2]).toHaveTextContent(longDescription);
    });

    it('handles special characters in descriptions', () => {
      const specialDescription = 'Descripción con símbolos: !@#$%^&*() y acentos: áéíóú ñ';
      
      render(<SellerRating {...defaultProps} attentionDescription={specialDescription} puntualityDescription={specialDescription} />);
      
      const descriptions = screen.getAllByTestId('metric-description');
      expect(descriptions[1]).toHaveTextContent(specialDescription);
      expect(descriptions[2]).toHaveTextContent(specialDescription);
    });
  });

  describe('Props updates', () => {
    it('updates rating and heatmap when props change', () => {
      const { rerender } = render(<SellerRating {...defaultProps} rating={3} />);
      
      let segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[2]).toHaveAttribute('data-active', 'true');  // 3rd segment active
      expect(segments[3]).toHaveAttribute('data-active', 'false'); // 4th segment inactive
      
      rerender(<SellerRating {...defaultProps} rating={4} />);
      
      segments = screen.getAllByTestId('heatmap-segment');
      expect(segments[3]).toHaveAttribute('data-active', 'true');  // 4th segment now active
    });

    it('updates sales count when props change', () => {
      const { rerender } = render(<SellerRating {...defaultProps} salesCount={100} />);
      
      let salesValue = screen.getByTestId('metric-value');
      expect(salesValue).toHaveTextContent('+100');
      
      rerender(<SellerRating {...defaultProps} salesCount={200} />);
      
      salesValue = screen.getByTestId('metric-value');
      expect(salesValue).toHaveTextContent('+200');
    });

    it('updates descriptions when props change', () => {
      const { rerender } = render(<SellerRating {...defaultProps} attentionDescription="Antigua descripción" />);
      
      let descriptions = screen.getAllByTestId('metric-description');
      expect(descriptions[1]).toHaveTextContent('Antigua descripción');
      
      rerender(<SellerRating {...defaultProps} attentionDescription="Nueva descripción" />);
      
      descriptions = screen.getAllByTestId('metric-description');
      expect(descriptions[1]).toHaveTextContent('Nueva descripción');
    });
  });
});
