import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemReviewSummaryCard from './ItemReviewSummaryCard';

// Mock the styled components
vi.mock('./ItemReviewSummaryCard.styled.tsx', () => ({
  SummaryContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="summary-container">{children}</div>
  ),
  OverallRating: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="overall-rating">{children}</div>
  ),
  RatingNumber: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="rating-number">{children}</span>
  ),
  StarRating: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="star-rating">{children}</div>
  ),
  RatingCount: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="rating-count">{children}</span>
  ),
  RatingDistribution: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="rating-distribution">{children}</div>
  ),
  DistributionItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="distribution-item">{children}</div>
  ),
  DistributionBar: ({ percentage }: any) => (
    <div data-testid="distribution-bar" data-percentage={percentage}></div>
  ),
  StarIcon: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="star-icon">{children}</span>
  ),
}));

describe('ItemReviewSummaryCard', () => {
  const defaultProps = {
    overallRating: 4.2,
    totalRatings: 150,
    distribution: [
      { rating: 5, count: 80, percentage: 53.3 },
      { rating: 4, count: 45, percentage: 30.0 },
      { rating: 3, count: 15, percentage: 10.0 },
      { rating: 2, count: 7, percentage: 4.7 },
      { rating: 1, count: 3, percentage: 2.0 },
    ],
  };

  it('renders the summary container', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const container = screen.getByTestId('summary-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the overall rating section', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const overallRating = screen.getByTestId('overall-rating');
    expect(overallRating).toBeInTheDocument();
  });

  it('displays the overall rating number', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const ratingNumber = screen.getByTestId('rating-number');
    expect(ratingNumber).toHaveTextContent('4.2');
  });

  it('renders the star rating', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const starRating = screen.getByTestId('star-rating');
    expect(starRating).toBeInTheDocument();
  });

  it('renders correct number of stars', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    expect(stars).toHaveLength(5);
  });

  it('renders stars with correct colors for rating 4.2', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // For rating 4.2, first 5 stars should be filled (blue) since 4.2 > 4
    expect(stars[0]).toHaveStyle({ color: '#3483fa' }); // 1st star - filled
    expect(stars[1]).toHaveStyle({ color: '#3483fa' }); // 2nd star - filled
    expect(stars[2]).toHaveStyle({ color: '#3483fa' }); // 3rd star - filled
    expect(stars[3]).toHaveStyle({ color: '#3483fa' }); // 4th star - filled
    expect(stars[4]).toHaveStyle({ color: '#3483fa' }); // 5th star - filled
  });

  it('displays the total ratings count', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const ratingCount = screen.getByTestId('rating-count');
    expect(ratingCount).toHaveTextContent('150 calificaciones');
  });

  it('renders the rating distribution section', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const ratingDistribution = screen.getByTestId('rating-distribution');
    expect(ratingDistribution).toBeInTheDocument();
  });

  it('renders all distribution items', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const distributionItems = screen.getAllByTestId('distribution-item');
    expect(distributionItems).toHaveLength(5);
  });

  it('renders distribution items with correct data', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const distributionItems = screen.getAllByTestId('distribution-item');
    
    // Check first distribution item (5 stars)
    const firstItem = distributionItems[0];
    expect(firstItem).toHaveTextContent('5');
    expect(firstItem).toHaveTextContent('★');
    
    // Check last distribution item (1 star)
    const lastItem = distributionItems[4];
    expect(lastItem).toHaveTextContent('1');
    expect(lastItem).toHaveTextContent('★');
  });

  it('renders distribution bars with correct percentages', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    const distributionBars = screen.getAllByTestId('distribution-bar');
    
    expect(distributionBars[0]).toHaveAttribute('data-percentage', '53.3');
    expect(distributionBars[1]).toHaveAttribute('data-percentage', '30');
    expect(distributionBars[2]).toHaveAttribute('data-percentage', '10');
    expect(distributionBars[3]).toHaveAttribute('data-percentage', '4.7');
    expect(distributionBars[4]).toHaveAttribute('data-percentage', '2');
  });

  it('handles zero overall rating', () => {
    const propsWithZeroRating = {
      ...defaultProps,
      overallRating: 0,
    };
    
    render(<ItemReviewSummaryCard {...propsWithZeroRating} />);
    
    const ratingNumber = screen.getByTestId('rating-number');
    expect(ratingNumber).toHaveTextContent('0');
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // All stars should be empty (gray)
    stars.forEach(star => {
      expect(star).toHaveStyle({ color: '#e0e0e0' });
    });
  });

  it('handles maximum overall rating', () => {
    const propsWithMaxRating = {
      ...defaultProps,
      overallRating: 5,
    };
    
    render(<ItemReviewSummaryCard {...propsWithMaxRating} />);
    
    const ratingNumber = screen.getByTestId('rating-number');
    expect(ratingNumber).toHaveTextContent('5');
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // All stars should be filled (blue)
    stars.forEach(star => {
      expect(star).toHaveStyle({ color: '#3483fa' });
    });
  });

  it('handles decimal overall rating', () => {
    const propsWithDecimalRating = {
      ...defaultProps,
      overallRating: 3.7,
    };
    
    render(<ItemReviewSummaryCard {...propsWithDecimalRating} />);
    
    const ratingNumber = screen.getByTestId('rating-number');
    expect(ratingNumber).toHaveTextContent('3.7');
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // First 4 stars should be filled, last star should be empty
    expect(stars[0]).toHaveStyle({ color: '#3483fa' });
    expect(stars[1]).toHaveStyle({ color: '#3483fa' });
    expect(stars[2]).toHaveStyle({ color: '#3483fa' });
    expect(stars[3]).toHaveStyle({ color: '#3483fa' });
    expect(stars[4]).toHaveStyle({ color: '#e0e0e0' });
  });

  it('handles zero total ratings', () => {
    const propsWithZeroTotal = {
      ...defaultProps,
      totalRatings: 0,
    };
    
    render(<ItemReviewSummaryCard {...propsWithZeroTotal} />);
    
    const ratingCount = screen.getByTestId('rating-count');
    expect(ratingCount).toHaveTextContent('0 calificaciones');
  });

  it('handles very high total ratings', () => {
    const propsWithHighTotal = {
      ...defaultProps,
      totalRatings: 999999,
    };
    
    render(<ItemReviewSummaryCard {...propsWithHighTotal} />);
    
    const ratingCount = screen.getByTestId('rating-count');
    expect(ratingCount).toHaveTextContent('999999 calificaciones');
  });

  it('handles empty distribution array', () => {
    const propsWithNoDistribution = {
      ...defaultProps,
      distribution: [],
    };
    
    render(<ItemReviewSummaryCard {...propsWithNoDistribution} />);
    
    const ratingDistribution = screen.getByTestId('rating-distribution');
    expect(ratingDistribution).toBeInTheDocument();
    
    const distributionItems = screen.queryAllByTestId('distribution-item');
    expect(distributionItems).toHaveLength(0);
  });

  it('handles single distribution item', () => {
    const propsWithSingleDistribution = {
      ...defaultProps,
      distribution: [defaultProps.distribution[0]],
    };
    
    render(<ItemReviewSummaryCard {...propsWithSingleDistribution} />);
    
    const distributionItems = screen.getAllByTestId('distribution-item');
    expect(distributionItems).toHaveLength(1);
    
    const firstItem = distributionItems[0];
    expect(firstItem).toHaveTextContent('5');
    expect(firstItem).toHaveTextContent('★');
  });

  it('handles many distribution items', () => {
    const manyDistributionItems = Array.from({ length: 10 }, (_, i) => ({
      rating: 10 - i,
      count: Math.floor(Math.random() * 100),
      percentage: Math.random() * 100,
    }));
    
    const propsWithManyDistribution = {
      ...defaultProps,
      distribution: manyDistributionItems,
    };
    
    render(<ItemReviewSummaryCard {...propsWithManyDistribution} />);
    
    const distributionItems = screen.getAllByTestId('distribution-item');
    expect(distributionItems).toHaveLength(10);
    
    // Check first and last distribution item
    const firstItem = distributionItems[0];
    const lastItem = distributionItems[9];
    
    expect(firstItem).toHaveTextContent('10');
    expect(lastItem).toHaveTextContent('1');
  });

  it('handles distribution with zero percentages', () => {
    const distributionWithZeroPercentages = [
      { rating: 5, count: 0, percentage: 0 },
      { rating: 4, count: 0, percentage: 0 },
      { rating: 3, count: 0, percentage: 0 },
      { rating: 2, count: 0, percentage: 0 },
      { rating: 1, count: 0, percentage: 0 },
    ];
    
    const propsWithZeroPercentages = {
      ...defaultProps,
      distribution: distributionWithZeroPercentages,
    };
    
    render(<ItemReviewSummaryCard {...propsWithZeroPercentages} />);
    
    const distributionBars = screen.getAllByTestId('distribution-bar');
    
    distributionBars.forEach(bar => {
      expect(bar).toHaveAttribute('data-percentage', '0');
    });
  });

  it('handles distribution with very high percentages', () => {
    const distributionWithHighPercentages = [
      { rating: 5, count: 1000, percentage: 99.9 },
      { rating: 4, count: 1, percentage: 0.1 },
    ];
    
    const propsWithHighPercentages = {
      ...defaultProps,
      distribution: distributionWithHighPercentages,
    };
    
    render(<ItemReviewSummaryCard {...propsWithHighPercentages} />);
    
    const distributionBars = screen.getAllByTestId('distribution-bar');
    
    expect(distributionBars[0]).toHaveAttribute('data-percentage', '99.9');
    expect(distributionBars[1]).toHaveAttribute('data-percentage', '0.1');
  });

  it('handles negative overall rating', () => {
    const propsWithNegativeRating = {
      ...defaultProps,
      overallRating: -2.5,
    };
    
    render(<ItemReviewSummaryCard {...propsWithNegativeRating} />);
    
    const ratingNumber = screen.getByTestId('rating-number');
    expect(ratingNumber).toHaveTextContent('-2.5');
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // All stars should be empty (gray) for negative rating
    stars.forEach(star => {
      expect(star).toHaveStyle({ color: '#e0e0e0' });
    });
  });

  it('handles very high overall rating', () => {
    const propsWithVeryHighRating = {
      ...defaultProps,
      overallRating: 10.5,
    };
    
    render(<ItemReviewSummaryCard {...propsWithVeryHighRating} />);
    
    const ratingNumber = screen.getByTestId('rating-number');
    expect(ratingNumber).toHaveTextContent('10.5');
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // All stars should be filled (blue) for rating > 5
    stars.forEach(star => {
      expect(star).toHaveStyle({ color: '#3483fa' });
    });
  });

  it('maintains structure with all props', () => {
    render(<ItemReviewSummaryCard {...defaultProps} />);
    
    // Check that all main sections are present
    expect(screen.getByTestId('summary-container')).toBeInTheDocument();
    expect(screen.getByTestId('overall-rating')).toBeInTheDocument();
    expect(screen.getByTestId('rating-distribution')).toBeInTheDocument();
    
    // Check that rating number and count are present
    expect(screen.getByTestId('rating-number')).toBeInTheDocument();
    expect(screen.getByTestId('rating-count')).toBeInTheDocument();
    
    // Check that star rating is present
    expect(screen.getByTestId('star-rating')).toBeInTheDocument();
    
    // Check that distribution items are present
    expect(screen.getAllByTestId('distribution-item')).toHaveLength(5);
  });

  it('renders with different props values', () => {
    const { rerender } = render(<ItemReviewSummaryCard {...defaultProps} />);
    
    let ratingNumber = screen.getByTestId('rating-number');
    let ratingCount = screen.getByTestId('rating-count');
    expect(ratingNumber).toHaveTextContent('4.2');
    expect(ratingCount).toHaveTextContent('150 calificaciones');
    
    const newProps = {
      overallRating: 2.5,
      totalRatings: 75,
      distribution: [
        { rating: 3, count: 40, percentage: 53.3 },
        { rating: 2, count: 35, percentage: 46.7 },
      ],
    };
    
    rerender(<ItemReviewSummaryCard {...newProps} />);
    
    ratingNumber = screen.getByTestId('rating-number');
    ratingCount = screen.getByTestId('rating-count');
    expect(ratingNumber).toHaveTextContent('2.5');
    expect(ratingCount).toHaveTextContent('75 calificaciones');
    
    const distributionItems = screen.getAllByTestId('distribution-item');
    expect(distributionItems).toHaveLength(2);
    
    const distributionBars = screen.getAllByTestId('distribution-bar');
    expect(distributionBars[0]).toHaveAttribute('data-percentage', '53.3');
    expect(distributionBars[1]).toHaveAttribute('data-percentage', '46.7');
  });

  it('handles edge case rating of exactly 2.5', () => {
    const propsWithExactRating = {
      ...defaultProps,
      overallRating: 2.5,
    };
    
    render(<ItemReviewSummaryCard {...propsWithExactRating} />);
    
    const ratingNumber = screen.getByTestId('rating-number');
    expect(ratingNumber).toHaveTextContent('2.5');
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // First 3 stars should be filled, last 2 should be empty
    expect(stars[0]).toHaveStyle({ color: '#3483fa' });
    expect(stars[1]).toHaveStyle({ color: '#3483fa' });
    expect(stars[2]).toHaveStyle({ color: '#3483fa' });
    expect(stars[3]).toHaveStyle({ color: '#e0e0e0' });
    expect(stars[4]).toHaveStyle({ color: '#e0e0e0' });
  });

  it('handles edge case rating of exactly 1.0', () => {
    const propsWithExactRating = {
      ...defaultProps,
      overallRating: 1.0,
    };
    
    render(<ItemReviewSummaryCard {...propsWithExactRating} />);
    
    const ratingNumber = screen.getByTestId('rating-number');
    expect(ratingNumber).toHaveTextContent('1');
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // First star should be filled, last 4 should be empty
    expect(stars[0]).toHaveStyle({ color: '#3483fa' });
    expect(stars[1]).toHaveStyle({ color: '#e0e0e0' });
    expect(stars[2]).toHaveStyle({ color: '#e0e0e0' });
    expect(stars[3]).toHaveStyle({ color: '#e0e0e0' });
    expect(stars[4]).toHaveStyle({ color: '#e0e0e0' });
  });
});
