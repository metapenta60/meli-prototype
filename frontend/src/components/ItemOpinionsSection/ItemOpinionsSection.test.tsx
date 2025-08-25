import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemOpinionsSection from './ItemOpinionsSection';

// Mock the styled components
vi.mock('./ItemOpinionsSection.styled.tsx', () => ({
  OpinionsContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="opinions-container">{children}</div>
  ),
  LeftColumn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="left-column">{children}</div>
  ),
  RightColumn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="right-column">{children}</div>
  ),
}));

// Mock the child components
vi.mock('../ItemReviewSummaryCard', () => ({
  default: ({ overallRating, totalRatings, distribution }: any) => (
    <div data-testid="item-review-summary-card">
      <span data-testid="overall-rating">{overallRating}</span>
      <span data-testid="total-ratings">{totalRatings}</span>
      <span data-testid="distribution-count">{distribution.length}</span>
    </div>
  ),
}));

vi.mock('../ItemReview', () => ({
  default: ({ review }: any) => (
    <div data-testid="item-review">
      <span data-testid="review-rating">{review.rating}</span>
      <span data-testid="review-comment">{review.comment}</span>
      <span data-testid="review-date">{review.date}</span>
    </div>
  ),
}));

describe('ItemOpinionsSection', () => {
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
    reviews: [
      {
        rating: 5,
        comment: 'Excelente producto, muy buena calidad',
        date: '2024-01-15',
      },
      {
        rating: 4,
        comment: 'Buen producto, cumple las expectativas',
        date: '2024-01-10',
      },
      {
        rating: 3,
        comment: 'Producto regular, podría mejorar',
        date: '2024-01-05',
      },
    ],
  };

  it('renders the opinions container', () => {
    render(<ItemOpinionsSection {...defaultProps} />);
    
    const container = screen.getByTestId('opinions-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the left column', () => {
    render(<ItemOpinionsSection {...defaultProps} />);
    
    const leftColumn = screen.getByTestId('left-column');
    expect(leftColumn).toBeInTheDocument();
  });

  it('renders the right column', () => {
    render(<ItemOpinionsSection {...defaultProps} />);
    
    const rightColumn = screen.getByTestId('right-column');
    expect(rightColumn).toBeInTheDocument();
  });

  it('renders ItemReviewSummaryCard in left column', () => {
    render(<ItemOpinionsSection {...defaultProps} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const summaryCard = screen.getByTestId('item-review-summary-card');
    
    expect(leftColumn).toContainElement(summaryCard);
  });

  it('passes correct props to ItemReviewSummaryCard', () => {
    render(<ItemOpinionsSection {...defaultProps} />);
    
    const overallRating = screen.getByTestId('overall-rating');
    const totalRatings = screen.getByTestId('total-ratings');
    const distributionCount = screen.getByTestId('distribution-count');
    
    expect(overallRating).toHaveTextContent('4.2');
    expect(totalRatings).toHaveTextContent('150');
    expect(distributionCount).toHaveTextContent('5');
  });

  it('renders all reviews in right column', () => {
    render(<ItemOpinionsSection {...defaultProps} />);
    
    const rightColumn = screen.getByTestId('right-column');
    const reviews = screen.getAllByTestId('item-review');
    
    expect(rightColumn).toContainElement(reviews[0]);
    expect(rightColumn).toContainElement(reviews[1]);
    expect(rightColumn).toContainElement(reviews[2]);
    expect(reviews).toHaveLength(3);
  });

  it('passes correct props to each ItemReview', () => {
    render(<ItemOpinionsSection {...defaultProps} />);
    
    const reviews = screen.getAllByTestId('item-review');
    
    // First review
    const firstReviewRating = reviews[0].querySelector('[data-testid="review-rating"]');
    const firstReviewComment = reviews[0].querySelector('[data-testid="review-comment"]');
    const firstReviewDate = reviews[0].querySelector('[data-testid="review-date"]');
    
    expect(firstReviewRating).toHaveTextContent('5');
    expect(firstReviewComment).toHaveTextContent('Excelente producto, muy buena calidad');
    expect(firstReviewDate).toHaveTextContent('2024-01-15');
    
    // Second review
    const secondReviewRating = reviews[1].querySelector('[data-testid="review-rating"]');
    const secondReviewComment = reviews[1].querySelector('[data-testid="review-comment"]');
    const secondReviewDate = reviews[1].querySelector('[data-testid="review-date"]');
    
    expect(secondReviewRating).toHaveTextContent('4');
    expect(secondReviewComment).toHaveTextContent('Buen producto, cumple las expectativas');
    expect(secondReviewDate).toHaveTextContent('2024-01-10');
    
    // Third review
    const thirdReviewRating = reviews[2].querySelector('[data-testid="review-rating"]');
    const thirdReviewComment = reviews[2].querySelector('[data-testid="review-comment"]');
    const thirdReviewDate = reviews[2].querySelector('[data-testid="review-date"]');
    
    expect(thirdReviewRating).toHaveTextContent('3');
    expect(thirdReviewComment).toHaveTextContent('Producto regular, podría mejorar');
    expect(thirdReviewDate).toHaveTextContent('2024-01-05');
  });

  it('handles empty reviews array', () => {
    const propsWithNoReviews = {
      ...defaultProps,
      reviews: [],
    };
    
    render(<ItemOpinionsSection {...propsWithNoReviews} />);
    
    const rightColumn = screen.getByTestId('right-column');
    const reviews = screen.queryAllByTestId('item-review');
    
    expect(rightColumn).toBeInTheDocument();
    expect(reviews).toHaveLength(0);
  });

  it('handles single review', () => {
    const propsWithSingleReview = {
      ...defaultProps,
      reviews: [defaultProps.reviews[0]],
    };
    
    render(<ItemOpinionsSection {...propsWithSingleReview} />);
    
    const reviews = screen.getAllByTestId('item-review');
    expect(reviews).toHaveLength(1);
    
    const reviewRating = reviews[0].querySelector('[data-testid="review-rating"]');
    expect(reviewRating).toHaveTextContent('5');
  });

  it('handles many reviews', () => {
    const manyReviews = Array.from({ length: 10 }, (_, i) => ({
      rating: 5 - (i % 5),
      comment: `Review número ${i + 1}`,
      date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    }));
    
    const propsWithManyReviews = {
      ...defaultProps,
      reviews: manyReviews,
    };
    
    render(<ItemOpinionsSection {...propsWithManyReviews} />);
    
    const reviews = screen.getAllByTestId('item-review');
    expect(reviews).toHaveLength(10);
    
    // Check first and last review
    const firstReviewRating = reviews[0].querySelector('[data-testid="review-rating"]');
    const lastReviewRating = reviews[9].querySelector('[data-testid="review-rating"]');
    
    expect(firstReviewRating).toHaveTextContent('5');
    expect(lastReviewRating).toHaveTextContent('1');
  });

  it('handles empty distribution array', () => {
    const propsWithNoDistribution = {
      ...defaultProps,
      distribution: [],
    };
    
    render(<ItemOpinionsSection {...propsWithNoDistribution} />);
    
    const summaryCard = screen.getByTestId('item-review-summary-card');
    const distributionCount = summaryCard.querySelector('[data-testid="distribution-count"]');
    
    expect(distributionCount).toHaveTextContent('0');
  });

  it('handles single distribution item', () => {
    const propsWithSingleDistribution = {
      ...defaultProps,
      distribution: [defaultProps.distribution[0]],
    };
    
    render(<ItemOpinionsSection {...propsWithSingleDistribution} />);
    
    const summaryCard = screen.getByTestId('item-review-summary-card');
    const distributionCount = summaryCard.querySelector('[data-testid="distribution-count"]');
    
    expect(distributionCount).toHaveTextContent('1');
  });

  it('handles zero overall rating', () => {
    const propsWithZeroRating = {
      ...defaultProps,
      overallRating: 0,
    };
    
    render(<ItemOpinionsSection {...propsWithZeroRating} />);
    
    const overallRating = screen.getByTestId('overall-rating');
    expect(overallRating).toHaveTextContent('0');
  });

  it('handles maximum overall rating', () => {
    const propsWithMaxRating = {
      ...defaultProps,
      overallRating: 5,
    };
    
    render(<ItemOpinionsSection {...propsWithMaxRating} />);
    
    const overallRating = screen.getByTestId('overall-rating');
    expect(overallRating).toHaveTextContent('5');
  });

  it('handles decimal overall rating', () => {
    const propsWithDecimalRating = {
      ...defaultProps,
      overallRating: 3.7,
    };
    
    render(<ItemOpinionsSection {...propsWithDecimalRating} />);
    
    const overallRating = screen.getByTestId('overall-rating');
    expect(overallRating).toHaveTextContent('3.7');
  });

  it('handles zero total ratings', () => {
    const propsWithZeroTotal = {
      ...defaultProps,
      totalRatings: 0,
    };
    
    render(<ItemOpinionsSection {...propsWithZeroTotal} />);
    
    const totalRatings = screen.getByTestId('total-ratings');
    expect(totalRatings).toHaveTextContent('0');
  });

  it('handles very high total ratings', () => {
    const propsWithHighTotal = {
      ...defaultProps,
      totalRatings: 999999,
    };
    
    render(<ItemOpinionsSection {...propsWithHighTotal} />);
    
    const totalRatings = screen.getByTestId('total-ratings');
    expect(totalRatings).toHaveTextContent('999999');
  });

  it('handles reviews with special characters', () => {
    const reviewsWithSpecialChars = [
      {
        rating: 5,
        comment: '¡Excelente producto! Con símbolos: @#$%^&*() y acentos: áéíóú ñ',
        date: '2024-01-15',
      },
    ];
    
    const propsWithSpecialChars = {
      ...defaultProps,
      reviews: reviewsWithSpecialChars,
    };
    
    render(<ItemOpinionsSection {...propsWithSpecialChars} />);
    
    const review = screen.getByTestId('item-review');
    const comment = review.querySelector('[data-testid="review-comment"]');
    
    expect(comment).toHaveTextContent('¡Excelente producto! Con símbolos: @#$%^&*() y acentos: áéíóú ñ');
  });

  it('handles reviews with emojis', () => {
    const reviewsWithEmojis = [
      {
        rating: 5,
        comment: 'Producto increíble 😀🎉🚀 Recomendado 100%',
        date: '2024-01-15',
      },
    ];
    
    const propsWithEmojis = {
      ...defaultProps,
      reviews: reviewsWithEmojis,
    };
    
    render(<ItemOpinionsSection {...propsWithEmojis} />);
    
    const review = screen.getByTestId('item-review');
    const comment = review.querySelector('[data-testid="review-comment"]');
    
    expect(comment).toHaveTextContent('Producto increíble 😀🎉🚀 Recomendado 100%');
  });

  it('handles very long review comments', () => {
    const longComment = 'Esta es una reseña muy larga que excede el ancho normal del componente y puede causar problemas de layout o text overflow en la interfaz de usuario. Debería manejarse correctamente sin romper el diseño o causar problemas de usabilidad. Es importante que el componente sea robusto y pueda manejar contenido de diferentes longitudes de manera elegante.';
    
    const reviewsWithLongComment = [
      {
        rating: 4,
        comment: longComment,
        date: '2024-01-15',
      },
    ];
    
    const propsWithLongComment = {
      ...defaultProps,
      reviews: reviewsWithLongComment,
    };
    
    render(<ItemOpinionsSection {...propsWithLongComment} />);
    
    const review = screen.getByTestId('item-review');
    const comment = review.querySelector('[data-testid="review-comment"]');
    
    expect(comment).toHaveTextContent(longComment);
  });

  it('handles different date formats', () => {
    const reviewsWithDifferentDates = [
      {
        rating: 5,
        comment: 'Review 1',
        date: '2024-01-15',
      },
      {
        rating: 4,
        comment: 'Review 2',
        date: '15/01/2024',
      },
      {
        rating: 3,
        comment: 'Review 3',
        date: 'Enero 15, 2024',
      },
    ];
    
    const propsWithDifferentDates = {
      ...defaultProps,
      reviews: reviewsWithDifferentDates,
    };
    
    render(<ItemOpinionsSection {...propsWithDifferentDates} />);
    
    const reviews = screen.getAllByTestId('item-review');
    
    expect(reviews[0].querySelector('[data-testid="review-date"]')).toHaveTextContent('2024-01-15');
    expect(reviews[1].querySelector('[data-testid="review-date"]')).toHaveTextContent('15/01/2024');
    expect(reviews[2].querySelector('[data-testid="review-date"]')).toHaveTextContent('Enero 15, 2024');
  });

  it('maintains structure with all props', () => {
    render(<ItemOpinionsSection {...defaultProps} />);
    
    // Check that all main sections are present
    expect(screen.getByTestId('opinions-container')).toBeInTheDocument();
    expect(screen.getByTestId('left-column')).toBeInTheDocument();
    expect(screen.getByTestId('right-column')).toBeInTheDocument();
    
    // Check that child components are present
    expect(screen.getByTestId('item-review-summary-card')).toBeInTheDocument();
    expect(screen.getAllByTestId('item-review')).toHaveLength(3);
  });

  it('renders with different props values', () => {
    const { rerender } = render(<ItemOpinionsSection {...defaultProps} />);
    
    let overallRating = screen.getByTestId('overall-rating');
    let totalRatings = screen.getByTestId('total-ratings');
    expect(overallRating).toHaveTextContent('4.2');
    expect(totalRatings).toHaveTextContent('150');
    
    const newProps = {
      overallRating: 2.5,
      totalRatings: 75,
      distribution: [
        { rating: 3, count: 40, percentage: 53.3 },
        { rating: 2, count: 35, percentage: 46.7 },
      ],
      reviews: [
        {
          rating: 3,
          comment: 'Nuevo review',
          date: '2024-02-01',
        },
      ],
    };
    
    rerender(<ItemOpinionsSection {...newProps} />);
    
    overallRating = screen.getByTestId('overall-rating');
    totalRatings = screen.getByTestId('total-ratings');
    const distributionCount = screen.getByTestId('distribution-count');
    const reviews = screen.getAllByTestId('item-review');
    
    expect(overallRating).toHaveTextContent('2.5');
    expect(totalRatings).toHaveTextContent('75');
    expect(distributionCount).toHaveTextContent('2');
    expect(reviews).toHaveLength(1);
    expect(reviews[0].querySelector('[data-testid="review-comment"]')).toHaveTextContent('Nuevo review');
  });
});
