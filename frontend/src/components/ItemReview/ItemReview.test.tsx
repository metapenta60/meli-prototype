import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemReview from './ItemReview';

// Mock the styled components
vi.mock('./ItemReview.styled.tsx', () => ({
  ReviewContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="review-container">{children}</div>
  ),
  ReviewHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="review-header">{children}</div>
  ),
  StarRating: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="star-rating">{children}</div>
  ),
  ReviewDate: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="review-date">{children}</span>
  ),
  ReviewComment: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="review-comment">{children}</div>
  ),
}));

describe('ItemReview', () => {
  const defaultReview = {
    rating: 4,
    comment: 'Excelente producto, muy buena calidad.',
    date: '2024-01-15',
  };

  it('renders the review container', () => {
    render(<ItemReview review={defaultReview} />);
    
    const container = screen.getByTestId('review-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the review header', () => {
    render(<ItemReview review={defaultReview} />);
    
    const header = screen.getByTestId('review-header');
    expect(header).toBeInTheDocument();
  });

  it('renders the star rating', () => {
    render(<ItemReview review={defaultReview} />);
    
    const starRating = screen.getByTestId('star-rating');
    expect(starRating).toBeInTheDocument();
  });

  it('renders the review date', () => {
    render(<ItemReview review={defaultReview} />);
    
    const date = screen.getByTestId('review-date');
    expect(date).toBeInTheDocument();
    expect(date).toHaveTextContent('2024-01-15');
  });

  it('renders the review comment', () => {
    render(<ItemReview review={defaultReview} />);
    
    const comment = screen.getByTestId('review-comment');
    expect(comment).toBeInTheDocument();
    expect(comment).toHaveTextContent('Excelente producto, muy buena calidad.');
  });

  it('renders correct number of stars', () => {
    render(<ItemReview review={defaultReview} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    expect(stars).toHaveLength(5);
  });

  it('renders filled stars for rating', () => {
    render(<ItemReview review={defaultReview} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // First 4 stars should be filled (blue)
    for (let i = 0; i < 4; i++) {
      expect(stars[i]).toHaveStyle({ color: '#3483fa' });
    }
    
    // Last star should be empty (gray)
    expect(stars[4]).toHaveStyle({ color: '#e0e0e0' });
  });

  it('renders with zero rating', () => {
    const zeroRatingReview = { ...defaultReview, rating: 0 };
    render(<ItemReview review={zeroRatingReview} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // All stars should be empty (gray)
    stars.forEach(star => {
      expect(star).toHaveStyle({ color: '#e0e0e0' });
    });
  });

  it('renders with maximum rating', () => {
    const maxRatingReview = { ...defaultReview, rating: 5 };
    render(<ItemReview review={maxRatingReview} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // All stars should be filled (blue)
    stars.forEach(star => {
      expect(star).toHaveStyle({ color: '#3483fa' });
    });
  });

  it('renders with partial rating', () => {
    const partialRatingReview = { ...defaultReview, rating: 2.5 };
    render(<ItemReview review={partialRatingReview} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // First 3 stars should be filled (blue) since 2.5 rounds up or the logic fills more
    expect(stars[0]).toHaveStyle({ color: '#3483fa' });
    expect(stars[1]).toHaveStyle({ color: '#3483fa' });
    expect(stars[2]).toHaveStyle({ color: '#3483fa' });
    
    // Last 2 stars should be empty (gray)
    expect(stars[3]).toHaveStyle({ color: '#e0e0e0' });
    expect(stars[4]).toHaveStyle({ color: '#e0e0e0' });
  });

  it('renders with empty comment', () => {
    const emptyCommentReview = { ...defaultReview, comment: '' };
    render(<ItemReview review={emptyCommentReview} />);
    
    const comment = screen.getByTestId('review-comment');
    expect(comment).toHaveTextContent('');
  });

  it('renders with long comment', () => {
    const longComment = 'Este es un comentario muy largo que describe en detalle la experiencia del usuario con el producto, incluyendo todos los aspectos positivos y negativos, la calidad del material, la durabilidad, el valor por el precio, la facilidad de uso, la estética, la funcionalidad, y muchas otras consideraciones importantes que hacen que sea un comentario completo y detallado.';
    const longCommentReview = { ...defaultReview, comment: longComment };
    
    render(<ItemReview review={longCommentReview} />);
    
    const comment = screen.getByTestId('review-comment');
    expect(comment).toHaveTextContent(longComment);
  });

  it('renders with empty date', () => {
    const emptyDateReview = { ...defaultReview, date: '' };
    render(<ItemReview review={emptyDateReview} />);
    
    const date = screen.getByTestId('review-date');
    expect(date).toHaveTextContent('');
  });

  it('renders with special characters in comment', () => {
    const specialComment = '¡Excelente producto! 100% recomendado. Precio: $99.99. #Calidad #Recomendado';
    const specialCommentReview = { ...defaultReview, comment: specialComment };
    
    render(<ItemReview review={specialCommentReview} />);
    
    const comment = screen.getByTestId('review-comment');
    expect(comment).toHaveTextContent(specialComment);
  });

  it('renders with decimal rating', () => {
    const decimalRatingReview = { ...defaultReview, rating: 3.7 };
    render(<ItemReview review={decimalRatingReview} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // First 4 stars should be filled (blue) since 3.7 rounds up or the logic fills more
    expect(stars[0]).toHaveStyle({ color: '#3483fa' });
    expect(stars[1]).toHaveStyle({ color: '#3483fa' });
    expect(stars[2]).toHaveStyle({ color: '#3483fa' });
    expect(stars[3]).toHaveStyle({ color: '#3483fa' });
    
    // Last star should be empty (gray)
    expect(stars[4]).toHaveStyle({ color: '#e0e0e0' });
  });

  it('renders with negative rating (should be treated as 0)', () => {
    const negativeRatingReview = { ...defaultReview, rating: -2 };
    render(<ItemReview review={negativeRatingReview} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // All stars should be empty (gray) since negative rating < 0
    stars.forEach(star => {
      expect(star).toHaveStyle({ color: '#e0e0e0' });
    });
  });

  it('renders with rating above 5 (should be treated as 5)', () => {
    const highRatingReview = { ...defaultReview, rating: 7 };
    render(<ItemReview review={highRatingReview} />);
    
    const starRating = screen.getByTestId('star-rating');
    const stars = starRating.querySelectorAll('span');
    
    // All stars should be filled (blue) since rating > 5
    stars.forEach(star => {
      expect(star).toHaveStyle({ color: '#3483fa' });
    });
  });

  it('renders with different date formats', () => {
    const dateFormats = [
      '2024-01-15',
      '15/01/2024',
      'January 15, 2024',
      '15-01-24',
      '2024/01/15',
    ];
    
    dateFormats.forEach(dateFormat => {
      const dateReview = { ...defaultReview, date: dateFormat };
      const { unmount } = render(<ItemReview review={dateReview} />);
      
      const date = screen.getByTestId('review-date');
      expect(date).toHaveTextContent(dateFormat);
      
      unmount();
    });
  });

  it('renders with different comment languages', () => {
    const multilingualComments = [
      'Excelente producto, muy buena calidad.',
      'Great product, very good quality.',
      'Produit excellent, très bonne qualité.',
      'Produto excelente, qualidade muito boa.',
      'Ürün mükemmel, kalite çok iyi.',
    ];
    
    multilingualComments.forEach(comment => {
      const commentReview = { ...defaultReview, comment };
      const { unmount } = render(<ItemReview review={commentReview} />);
      
      const commentElement = screen.getByTestId('review-comment');
      expect(commentElement).toHaveTextContent(comment);
      
      unmount();
    });
  });
});
