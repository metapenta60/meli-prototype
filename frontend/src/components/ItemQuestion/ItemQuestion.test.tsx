import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemQuestion from './ItemQuestion';

// Mock the styled components
vi.mock('./ItemQuestion.styled.tsx', () => ({
  QuestionContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="question-container">{children}</div>
  ),
  QuestionText: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="question-text">{children}</div>
  ),
  AnswerContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="answer-container">{children}</div>
  ),
  AnswerText: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="answer-text">{children}</div>
  ),
  AnswerTextTruncated: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="answer-text-truncated">{children}</span>
  ),
  SeeMoreLink: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="see-more-link">{children}</div>
  ),
  DateText: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="date-text">{children}</div>
  ),
}));

// Mock the Shared components
vi.mock('../Shared', () => ({
  Link: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button data-testid="link-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('ItemQuestion', () => {
  const defaultQuestionAnswer = {
    question: '¿Cuál es la garantía del producto?',
    answer: 'Este producto tiene una garantía de 12 meses que cubre defectos de fabricación.',
    date: '2024-01-15',
  };

  it('renders the question container', () => {
    render(<ItemQuestion questionAnswer={defaultQuestionAnswer} />);
    
    const container = screen.getByTestId('question-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the question text', () => {
    render(<ItemQuestion questionAnswer={defaultQuestionAnswer} />);
    
    const questionText = screen.getByTestId('question-text');
    expect(questionText).toBeInTheDocument();
    expect(questionText).toHaveTextContent('¿Cuál es la garantía del producto?');
  });

  it('renders the answer text', () => {
    render(<ItemQuestion questionAnswer={defaultQuestionAnswer} />);
    
    const answerText = screen.getByTestId('answer-text');
    expect(answerText).toBeInTheDocument();
    expect(answerText).toHaveTextContent('Este producto tiene una garantía de 12 meses que cubre defectos de fabricación.');
  });

  it('renders the date text', () => {
    render(<ItemQuestion questionAnswer={defaultQuestionAnswer} />);
    
    const dateText = screen.getByTestId('date-text');
    expect(dateText).toBeInTheDocument();
    expect(dateText).toHaveTextContent('2024-01-15');
  });

  it('renders full answer when answer is short', () => {
    const shortAnswer = {
      question: '¿Es nuevo?',
      answer: 'Sí, es completamente nuevo.',
      date: '2024-01-10',
    };
    
    render(<ItemQuestion questionAnswer={shortAnswer} />);
    
    const answerText = screen.getByTestId('answer-text');
    expect(answerText).toHaveTextContent('Sí, es completamente nuevo.');
    
    // Should not show "Ver más" link
    const seeMoreLink = screen.queryByTestId('see-more-link');
    expect(seeMoreLink).not.toBeInTheDocument();
  });

  it('truncates long answer and shows "Ver más" link', () => {
    const longAnswer = {
      question: '¿Cuáles son las especificaciones?',
      answer: 'Este producto tiene muchas especificaciones técnicas detalladas que incluyen dimensiones, peso, materiales, capacidades, compatibilidad, requisitos del sistema, instrucciones de instalación, guía de uso, información de seguridad, datos de rendimiento, certificaciones, garantías, soporte técnico, y muchos otros detalles importantes que hacen que sea necesario truncar el texto para mantener una interfaz limpia y legible.',
      date: '2024-01-20',
    };
    
    render(<ItemQuestion questionAnswer={longAnswer} maxLength={100} />);
    
    const answerText = screen.getByTestId('answer-text');
    expect(answerText).toHaveTextContent('Este producto tiene muchas especificaciones técnicas detalladas que incluyen dimensiones, peso, materiales, capacidades, compatibilidad, requisitos del sistema, instrucciones de instalación, guía de uso, información de seguridad, datos de rendimiento, certificaciones, garantías, soporte técnico, y muchos otros detalles importantes que hacen que sea necesario truncar el texto para mantener una interfaz limpia y legible.');
    
    // Should show "Ver más" link
    const seeMoreLink = screen.getByTestId('see-more-link');
    expect(seeMoreLink).toBeInTheDocument();
    expect(seeMoreLink).toHaveTextContent('Ver más');
  });

  it('shows full answer when "Ver más" is clicked', () => {
    const longAnswer = {
      question: '¿Cuáles son las especificaciones?',
      answer: 'Este producto tiene muchas especificaciones técnicas detalladas que incluyen dimensiones, peso, materiales, capacidades, compatibilidad, requisitos del sistema, instrucciones de instalación, guía de uso, información de seguridad, datos de rendimiento, certificaciones, garantías, soporte técnico, y muchos otros detalles importantes que hacen que sea necesario truncar el texto para mantener una interfaz limpia y legible.',
      date: '2024-01-20',
    };
    
    render(<ItemQuestion questionAnswer={longAnswer} maxLength={100} />);
    
    // Initially should show truncated text
    const seeMoreLink = screen.getByTestId('see-more-link');
    expect(seeMoreLink).toBeInTheDocument();
    
    // Click "Ver más"
    const linkButton = screen.getByTestId('link-button');
    fireEvent.click(linkButton);
    
    // Should not show "Ver más" link anymore
    const seeMoreLinkAfter = screen.queryByTestId('see-more-link');
    expect(seeMoreLinkAfter).not.toBeInTheDocument();
    
    // Should show full answer
    const answerText = screen.getByTestId('answer-text');
    expect(answerText).toHaveTextContent(longAnswer.answer);
  });

  it('uses default maxLength when not provided', () => {
    const longAnswer = {
      question: '¿Cuáles son las especificaciones?',
      answer: 'A'.repeat(600), // Longer than default 500
      date: '2024-01-20',
    };
    
    render(<ItemQuestion questionAnswer={longAnswer} />);
    
    // Should show "Ver más" link with default maxLength
    const seeMoreLink = screen.getByTestId('see-more-link');
    expect(seeMoreLink).toBeInTheDocument();
  });

  it('uses custom maxLength when provided', () => {
    const longAnswer = {
      question: '¿Cuáles son las especificaciones?',
      answer: 'A'.repeat(200), // Longer than custom maxLength
      date: '2024-01-20',
    };
    
    render(<ItemQuestion questionAnswer={longAnswer} maxLength={150} />);
    
    // Should show "Ver más" link with custom maxLength
    const seeMoreLink = screen.getByTestId('see-more-link');
    expect(seeMoreLink).toBeInTheDocument();
  });

  it('renders with empty question', () => {
    const emptyQuestion = {
      question: '',
      answer: 'Respuesta normal.',
      date: '2024-01-15',
    };
    
    render(<ItemQuestion questionAnswer={emptyQuestion} />);
    
    const questionText = screen.getByTestId('question-text');
    expect(questionText).toHaveTextContent('');
  });

  it('renders with empty answer', () => {
    const emptyAnswer = {
      question: '¿Pregunta normal?',
      answer: '',
      date: '2024-01-15',
    };
    
    render(<ItemQuestion questionAnswer={emptyAnswer} />);
    
    const answerText = screen.getByTestId('answer-text');
    expect(answerText).toHaveTextContent('');
  });

  it('renders with empty date', () => {
    const emptyDate = {
      question: '¿Pregunta normal?',
      answer: 'Respuesta normal.',
      date: '',
    };
    
    render(<ItemQuestion questionAnswer={emptyDate} />);
    
    const dateText = screen.getByTestId('date-text');
    expect(dateText).toHaveTextContent('');
  });

  it('renders with very long question', () => {
    const longQuestion = {
      question: 'A'.repeat(1000),
      answer: 'Respuesta normal.',
      date: '2024-01-15',
    };
    
    render(<ItemQuestion questionAnswer={longQuestion} />);
    
    const questionText = screen.getByTestId('question-text');
    expect(questionText).toHaveTextContent(longQuestion.question);
  });

  it('renders with very long answer', () => {
    const longAnswer = {
      question: '¿Pregunta normal?',
      answer: 'A'.repeat(1000),
      date: '2024-01-15',
    };
    
    render(<ItemQuestion questionAnswer={longAnswer} maxLength={100} />);
    
    const seeMoreLink = screen.getByTestId('see-more-link');
    expect(seeMoreLink).toBeInTheDocument();
  });

  it('handles answer exactly at maxLength boundary', () => {
    const exactLengthAnswer = {
      question: '¿Pregunta normal?',
      answer: 'A'.repeat(100),
      date: '2024-01-15',
    };
    
    render(<ItemQuestion questionAnswer={exactLengthAnswer} maxLength={100} />);
    
    // Should not show "Ver más" link when answer is exactly at maxLength
    const seeMoreLink = screen.queryByTestId('see-more-link');
    expect(seeMoreLink).not.toBeInTheDocument();
    
    const answerText = screen.getByTestId('answer-text');
    expect(answerText).toHaveTextContent('A'.repeat(100));
  });

  it('handles answer just below maxLength boundary', () => {
    const belowMaxLengthAnswer = {
      question: '¿Pregunta normal?',
      answer: 'A'.repeat(99),
      date: '2024-01-15',
    };
    
    render(<ItemQuestion questionAnswer={belowMaxLengthAnswer} maxLength={100} />);
    
    // Should not show "Ver más" link when answer is below maxLength
    const seeMoreLink = screen.queryByTestId('see-more-link');
    expect(seeMoreLink).not.toBeInTheDocument();
    
    const answerText = screen.getByTestId('answer-text');
    expect(answerText).toHaveTextContent('A'.repeat(99));
  });

  it('handles answer just above maxLength boundary', () => {
    const aboveMaxLengthAnswer = {
      question: '¿Pregunta normal?',
      answer: 'A'.repeat(101),
      date: '2024-01-15',
    };
    
    render(<ItemQuestion questionAnswer={aboveMaxLengthAnswer} maxLength={100} />);
    
    // Should show "Ver más" link when answer is above maxLength
    const seeMoreLink = screen.getByTestId('see-more-link');
    expect(seeMoreLink).toBeInTheDocument();
  });

  it('maintains state when re-rendering with same props', () => {
    const longAnswer = {
      question: '¿Cuáles son las especificaciones?',
      answer: 'A'.repeat(200),
      date: '2024-01-20',
    };
    
    const { rerender } = render(<ItemQuestion questionAnswer={longAnswer} maxLength={100} />);
    
    // Initially should show "Ver más" link
    expect(screen.getByTestId('see-more-link')).toBeInTheDocument();
    
    // Click "Ver más"
    const linkButton = screen.getByTestId('link-button');
    fireEvent.click(linkButton);
    
    // Should not show "Ver más" link
    expect(screen.queryByTestId('see-more-link')).not.toBeInTheDocument();
    
    // Re-render with same props
    rerender(<ItemQuestion questionAnswer={longAnswer} maxLength={100} />);
    
    // Should still not show "Ver más" link (state maintained)
    expect(screen.queryByTestId('see-more-link')).not.toBeInTheDocument();
  });
});
