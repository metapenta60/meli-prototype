import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemQuestionsSection from './ItemQuestionsSection';

// Mock the styled components
vi.mock('./ItemQuestionsSection.styled.tsx', () => ({
  SectionContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="section-container">{children}</div>
  ),
}));

// Mock the QuestionBar component
vi.mock('../QuestionBar', () => ({
  default: ({ onAskQuestion }: any) => (
    <div data-testid="question-bar">
      <button 
        data-testid="ask-question-btn" 
        onClick={() => onAskQuestion && onAskQuestion('Nueva pregunta')}
      >
        Preguntar
      </button>
    </div>
  ),
}));

// Mock the ItemQuestions component
vi.mock('../ItemQuestions', () => ({
  default: ({ questions, maxLength }: any) => (
    <div data-testid="item-questions">
      <span data-testid="questions-count">{questions.length}</span>
      <span data-testid="max-length">{maxLength}</span>
      {questions.map((q: any, index: number) => (
        <div key={index} data-testid="question-item">
          <span data-testid="question-text">{q.question}</span>
          <span data-testid="answer-text">{q.answer}</span>
          <span data-testid="date-text">{q.date}</span>
        </div>
      ))}
    </div>
  ),
}));

describe('ItemQuestionsSection', () => {
  const defaultQuestions = [
    {
      question: '¿Cuál es el material del producto?',
      answer: 'El producto está fabricado en acero inoxidable de alta calidad.',
      date: '2024-01-15',
    },
    {
      question: '¿Incluye garantía?',
      answer: 'Sí, incluye garantía de 2 años por defectos de fabricación.',
      date: '2024-01-10',
    },
    {
      question: '¿Cuáles son las dimensiones?',
      answer: 'Las dimensiones son 15cm x 10cm x 5cm.',
      date: '2024-01-05',
    },
  ];

  it('renders the section container', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} />);
    
    const container = screen.getByTestId('section-container');
    expect(container).toBeInTheDocument();
  });

  it('renders QuestionBar component', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} />);
    
    const questionBar = screen.getByTestId('question-bar');
    expect(questionBar).toBeInTheDocument();
  });

  it('renders ItemQuestions component', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} />);
    
    const itemQuestions = screen.getByTestId('item-questions');
    expect(itemQuestions).toBeInTheDocument();
  });

  it('passes questions to ItemQuestions component', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} />);
    
    const questionsCount = screen.getByTestId('questions-count');
    expect(questionsCount).toHaveTextContent('3');
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(3);
  });

  it('passes default maxLength to ItemQuestions when not provided', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} />);
    
    const maxLength = screen.getByTestId('max-length');
    expect(maxLength).toHaveTextContent('500');
  });

  it('passes custom maxLength to ItemQuestions component', () => {
    const customMaxLength = 300;
    render(<ItemQuestionsSection questions={defaultQuestions} maxLength={customMaxLength} />);
    
    const maxLength = screen.getByTestId('max-length');
    expect(maxLength).toHaveTextContent('300');
  });

  it('passes onAskQuestion callback to QuestionBar', () => {
    const mockOnAskQuestion = vi.fn();
    render(<ItemQuestionsSection questions={defaultQuestions} onAskQuestion={mockOnAskQuestion} />);
    
    const askButton = screen.getByTestId('ask-question-btn');
    askButton.click();
    
    expect(mockOnAskQuestion).toHaveBeenCalledWith('Nueva pregunta');
    expect(mockOnAskQuestion).toHaveBeenCalledTimes(1);
  });

  it('handles undefined onAskQuestion callback', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} />);
    
    const askButton = screen.getByTestId('ask-question-btn');
    expect(() => askButton.click()).not.toThrow();
  });

  it('renders all question details correctly', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} />);
    
    const questionItems = screen.getAllByTestId('question-item');
    
    // First question
    const firstQuestion = questionItems[0];
    expect(firstQuestion.querySelector('[data-testid="question-text"]')).toHaveTextContent('¿Cuál es el material del producto?');
    expect(firstQuestion.querySelector('[data-testid="answer-text"]')).toHaveTextContent('El producto está fabricado en acero inoxidable de alta calidad.');
    expect(firstQuestion.querySelector('[data-testid="date-text"]')).toHaveTextContent('2024-01-15');
    
    // Second question
    const secondQuestion = questionItems[1];
    expect(secondQuestion.querySelector('[data-testid="question-text"]')).toHaveTextContent('¿Incluye garantía?');
    expect(secondQuestion.querySelector('[data-testid="answer-text"]')).toHaveTextContent('Sí, incluye garantía de 2 años por defectos de fabricación.');
    expect(secondQuestion.querySelector('[data-testid="date-text"]')).toHaveTextContent('2024-01-10');
    
    // Third question
    const thirdQuestion = questionItems[2];
    expect(thirdQuestion.querySelector('[data-testid="question-text"]')).toHaveTextContent('¿Cuáles son las dimensiones?');
    expect(thirdQuestion.querySelector('[data-testid="answer-text"]')).toHaveTextContent('Las dimensiones son 15cm x 10cm x 5cm.');
    expect(thirdQuestion.querySelector('[data-testid="date-text"]')).toHaveTextContent('2024-01-05');
  });

  it('handles empty questions array', () => {
    render(<ItemQuestionsSection questions={[]} />);
    
    const questionsCount = screen.getByTestId('questions-count');
    expect(questionsCount).toHaveTextContent('0');
    
    const questionItems = screen.queryAllByTestId('question-item');
    expect(questionItems).toHaveLength(0);
  });

  it('handles single question', () => {
    const singleQuestion = [defaultQuestions[0]];
    render(<ItemQuestionsSection questions={singleQuestion} />);
    
    const questionsCount = screen.getByTestId('questions-count');
    expect(questionsCount).toHaveTextContent('1');
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(1);
    
    const question = questionItems[0];
    expect(question.querySelector('[data-testid="question-text"]')).toHaveTextContent('¿Cuál es el material del producto?');
  });

  it('handles many questions', () => {
    const manyQuestions = Array.from({ length: 10 }, (_, i) => ({
      question: `Pregunta número ${i + 1}`,
      answer: `Respuesta número ${i + 1}`,
      date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    }));
    
    render(<ItemQuestionsSection questions={manyQuestions} />);
    
    const questionsCount = screen.getByTestId('questions-count');
    expect(questionsCount).toHaveTextContent('10');
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(10);
    
    // Check first and last question
    const firstQuestion = questionItems[0];
    const lastQuestion = questionItems[9];
    
    expect(firstQuestion.querySelector('[data-testid="question-text"]')).toHaveTextContent('Pregunta número 1');
    expect(lastQuestion.querySelector('[data-testid="question-text"]')).toHaveTextContent('Pregunta número 10');
  });

  it('handles zero maxLength', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} maxLength={0} />);
    
    const maxLength = screen.getByTestId('max-length');
    expect(maxLength).toHaveTextContent('0');
  });

  it('handles very high maxLength', () => {
    const highMaxLength = 999999;
    render(<ItemQuestionsSection questions={defaultQuestions} maxLength={highMaxLength} />);
    
    const maxLength = screen.getByTestId('max-length');
    expect(maxLength).toHaveTextContent('999999');
  });

  it('handles negative maxLength', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} maxLength={-100} />);
    
    const maxLength = screen.getByTestId('max-length');
    expect(maxLength).toHaveTextContent('-100');
  });

  it('handles decimal maxLength', () => {
    render(<ItemQuestionsSection questions={defaultQuestions} maxLength={150.5} />);
    
    const maxLength = screen.getByTestId('max-length');
    expect(maxLength).toHaveTextContent('150.5');
  });

  it('maintains structure with all props', () => {
    const mockOnAskQuestion = vi.fn();
    render(<ItemQuestionsSection questions={defaultQuestions} maxLength={250} onAskQuestion={mockOnAskQuestion} />);
    
    // Check that all main sections are present
    expect(screen.getByTestId('section-container')).toBeInTheDocument();
    expect(screen.getByTestId('question-bar')).toBeInTheDocument();
    expect(screen.getByTestId('item-questions')).toBeInTheDocument();
    
    // Check that maxLength is passed correctly
    const maxLength = screen.getByTestId('max-length');
    expect(maxLength).toHaveTextContent('250');
    
    // Check that questions are rendered
    const questionsCount = screen.getByTestId('questions-count');
    expect(questionsCount).toHaveTextContent('3');
  });

  it('renders with different props values', () => {
    const { rerender } = render(<ItemQuestionsSection questions={defaultQuestions} maxLength={100} />);
    
    let maxLength = screen.getByTestId('max-length');
    let questionsCount = screen.getByTestId('questions-count');
    expect(maxLength).toHaveTextContent('100');
    expect(questionsCount).toHaveTextContent('3');
    
    // Change props
    const newQuestions = [
      {
        question: 'Nueva pregunta',
        answer: 'Nueva respuesta',
        date: '2024-02-01',
      },
    ];
    
    rerender(<ItemQuestionsSection questions={newQuestions} maxLength={500} />);
    
    maxLength = screen.getByTestId('max-length');
    questionsCount = screen.getByTestId('questions-count');
    expect(maxLength).toHaveTextContent('500');
    expect(questionsCount).toHaveTextContent('1');
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(1);
    expect(questionItems[0].querySelector('[data-testid="question-text"]')).toHaveTextContent('Nueva pregunta');
  });

  it('handles questions with special characters', () => {
    const questionsWithSpecialChars = [
      {
        question: '¿Cuál es el precio? Con símbolos: @#$%^&*() y acentos: áéíóú ñ',
        answer: 'El precio es $150.000 pesos colombianos 💰',
        date: '2024-01-15',
      },
    ];
    
    render(<ItemQuestionsSection questions={questionsWithSpecialChars} />);
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(1);
    
    const question = questionItems[0];
    expect(question.querySelector('[data-testid="question-text"]')).toHaveTextContent('¿Cuál es el precio? Con símbolos: @#$%^&*() y acentos: áéíóú ñ');
    expect(question.querySelector('[data-testid="answer-text"]')).toHaveTextContent('El precio es $150.000 pesos colombianos 💰');
  });

  it('handles questions with emojis', () => {
    const questionsWithEmojis = [
      {
        question: '¿Es resistente al agua? 💧',
        answer: 'Sí, es completamente resistente al agua 🌊',
        date: '2024-01-15',
      },
    ];
    
    render(<ItemQuestionsSection questions={questionsWithEmojis} />);
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(1);
    
    const question = questionItems[0];
    expect(question.querySelector('[data-testid="question-text"]')).toHaveTextContent('¿Es resistente al agua? 💧');
    expect(question.querySelector('[data-testid="answer-text"]')).toHaveTextContent('Sí, es completamente resistente al agua 🌊');
  });

  it('handles very long questions and answers', () => {
    const longQuestion = 'Esta es una pregunta muy larga que excede el ancho normal del componente y puede causar problemas de layout o text overflow en la interfaz de usuario. Debería manejarse correctamente sin romper el diseño o causar problemas de usabilidad. Es importante que el componente sea robusto y pueda manejar contenido de diferentes longitudes de manera elegante.';
    
    const longAnswer = 'Esta es una respuesta muy larga que también excede el ancho normal del componente. Debería manejarse correctamente sin romper el diseño o causar problemas de usabilidad. Es importante que el componente sea robusto y pueda manejar contenido de diferentes longitudes de manera elegante. El texto largo puede incluir información detallada sobre el producto, especificaciones técnicas, instrucciones de uso, y cualquier otra información relevante que el usuario necesite conocer.';
    
    const questionsWithLongContent = [
      {
        question: longQuestion,
        answer: longAnswer,
        date: '2024-01-15',
      },
    ];
    
    render(<ItemQuestionsSection questions={questionsWithLongContent} />);
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(1);
    
    const question = questionItems[0];
    expect(question.querySelector('[data-testid="question-text"]')).toHaveTextContent(longQuestion);
    expect(question.querySelector('[data-testid="answer-text"]')).toHaveTextContent(longAnswer);
  });

  it('handles different date formats', () => {
    const questionsWithDifferentDates = [
      {
        question: 'Pregunta 1',
        answer: 'Respuesta 1',
        date: '2024-01-15',
      },
      {
        question: 'Pregunta 2',
        answer: 'Respuesta 2',
        date: '15/01/2024',
      },
      {
        question: 'Pregunta 3',
        answer: 'Respuesta 3',
        date: 'Enero 15, 2024',
      },
    ];
    
    render(<ItemQuestionsSection questions={questionsWithDifferentDates} />);
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(3);
    
    expect(questionItems[0].querySelector('[data-testid="date-text"]')).toHaveTextContent('2024-01-15');
    expect(questionItems[1].querySelector('[data-testid="date-text"]')).toHaveTextContent('15/01/2024');
    expect(questionItems[2].querySelector('[data-testid="date-text"]')).toHaveTextContent('Enero 15, 2024');
  });

  it('handles questions with empty strings', () => {
    const questionsWithEmptyStrings = [
      {
        question: '',
        answer: '',
        date: '2024-01-15',
      },
      {
        question: 'Pregunta normal',
        answer: 'Respuesta normal',
        date: '2024-01-10',
      },
    ];
    
    render(<ItemQuestionsSection questions={questionsWithEmptyStrings} />);
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(2);
    
    expect(questionItems[0].querySelector('[data-testid="question-text"]')).toHaveTextContent('');
    expect(questionItems[0].querySelector('[data-testid="answer-text"]')).toHaveTextContent('');
    expect(questionItems[1].querySelector('[data-testid="question-text"]')).toHaveTextContent('Pregunta normal');
  });

  it('handles questions with only whitespace', () => {
    const questionsWithWhitespace = [
      {
        question: '   ',
        answer: '  \t\n  ',
        date: '2024-01-15',
      },
    ];
    
    render(<ItemQuestionsSection questions={questionsWithWhitespace} />);
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(1);
    
    const question = questionItems[0];
    expect(question.querySelector('[data-testid="question-text"]')?.textContent).toBe('   ');
    expect(question.querySelector('[data-testid="answer-text"]')?.textContent).toBe('  \t\n  ');
  });

  it('handles questions with HTML-like content', () => {
    const questionsWithHTML = [
      {
        question: '<strong>Pregunta</strong> con <em>formato</em>',
        answer: '<script>alert("test")</script> Respuesta con HTML',
        date: '2024-01-15',
      },
    ];
    
    render(<ItemQuestionsSection questions={questionsWithHTML} />);
    
    const questionItems = screen.getAllByTestId('question-item');
    expect(questionItems).toHaveLength(1);
    
    const question = questionItems[0];
    expect(question.querySelector('[data-testid="question-text"]')).toHaveTextContent('<strong>Pregunta</strong> con <em>formato</em>');
    expect(question.querySelector('[data-testid="answer-text"]')).toHaveTextContent('<script>alert("test")</script> Respuesta con HTML');
  });

  it('calls onAskQuestion multiple times', () => {
    const mockOnAskQuestion = vi.fn();
    render(<ItemQuestionsSection questions={defaultQuestions} onAskQuestion={mockOnAskQuestion} />);
    
    const askButton = screen.getByTestId('ask-question-btn');
    
    // Click multiple times
    askButton.click();
    askButton.click();
    askButton.click();
    
    expect(mockOnAskQuestion).toHaveBeenCalledTimes(3);
    expect(mockOnAskQuestion).toHaveBeenCalledWith('Nueva pregunta');
  });

  it('maintains component structure after re-rendering', () => {
    const { rerender } = render(<ItemQuestionsSection questions={defaultQuestions} />);
    
    // Initial render
    expect(screen.getByTestId('section-container')).toBeInTheDocument();
    expect(screen.getByTestId('question-bar')).toBeInTheDocument();
    expect(screen.getByTestId('item-questions')).toBeInTheDocument();
    
    // Re-render with different props
    rerender(<ItemQuestionsSection questions={[]} maxLength={1000} />);
    
    // Structure should remain the same
    expect(screen.getByTestId('section-container')).toBeInTheDocument();
    expect(screen.getByTestId('question-bar')).toBeInTheDocument();
    expect(screen.getByTestId('item-questions')).toBeInTheDocument();
    
    // But content should change
    const questionsCount = screen.getByTestId('questions-count');
    const maxLength = screen.getByTestId('max-length');
    expect(questionsCount).toHaveTextContent('0');
    expect(maxLength).toHaveTextContent('1000');
  });
});
