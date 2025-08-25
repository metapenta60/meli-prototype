import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemQuestions from './ItemQuestions';

// Mock the styled components
vi.mock('./ItemQuestions.styled.tsx', () => ({
  QuestionsContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="questions-container">{children}</div>
  ),
}));

// Mock the ItemQuestion component
vi.mock('../ItemQuestion', () => ({
  default: ({ questionAnswer, maxLength }: any) => (
    <div data-testid="item-question">
      <span data-testid="question">{questionAnswer.question}</span>
      <span data-testid="answer">{questionAnswer.answer}</span>
      <span data-testid="date">{questionAnswer.date}</span>
      <span data-testid="max-length">{maxLength}</span>
    </div>
  ),
}));

describe('ItemQuestions', () => {
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

  it('renders the questions container', () => {
    render(<ItemQuestions questions={defaultQuestions} />);
    
    const container = screen.getByTestId('questions-container');
    expect(container).toBeInTheDocument();
  });

  it('renders all questions when questions array is provided', () => {
    render(<ItemQuestions questions={defaultQuestions} />);
    
    const questions = screen.getAllByTestId('item-question');
    expect(questions).toHaveLength(3);
  });

  it('passes correct props to each ItemQuestion', () => {
    render(<ItemQuestions questions={defaultQuestions} />);
    
    const questions = screen.getAllByTestId('item-question');
    
    // First question
    const firstQuestion = questions[0];
    expect(firstQuestion.querySelector('[data-testid="question"]')).toHaveTextContent('¿Cuál es el material del producto?');
    expect(firstQuestion.querySelector('[data-testid="answer"]')).toHaveTextContent('El producto está fabricado en acero inoxidable de alta calidad.');
    expect(firstQuestion.querySelector('[data-testid="date"]')).toHaveTextContent('2024-01-15');
    
    // Second question
    const secondQuestion = questions[1];
    expect(secondQuestion.querySelector('[data-testid="question"]')).toHaveTextContent('¿Incluye garantía?');
    expect(secondQuestion.querySelector('[data-testid="answer"]')).toHaveTextContent('Sí, incluye garantía de 2 años por defectos de fabricación.');
    expect(secondQuestion.querySelector('[data-testid="date"]')).toHaveTextContent('2024-01-10');
    
    // Third question
    const thirdQuestion = questions[2];
    expect(thirdQuestion.querySelector('[data-testid="question"]')).toHaveTextContent('¿Cuáles son las dimensiones?');
    expect(thirdQuestion.querySelector('[data-testid="answer"]')).toHaveTextContent('Las dimensiones son 15cm x 10cm x 5cm.');
    expect(thirdQuestion.querySelector('[data-testid="date"]')).toHaveTextContent('2024-01-05');
  });

  it('uses default maxLength when not provided', () => {
    render(<ItemQuestions questions={defaultQuestions} />);
    
    const questions = screen.getAllByTestId('item-question');
    questions.forEach(question => {
      expect(question.querySelector('[data-testid="max-length"]')).toHaveTextContent('500');
    });
  });

  it('passes custom maxLength to all ItemQuestion components', () => {
    const customMaxLength = 300;
    render(<ItemQuestions questions={defaultQuestions} maxLength={customMaxLength} />);
    
    const questions = screen.getAllByTestId('item-question');
    questions.forEach(question => {
      expect(question.querySelector('[data-testid="max-length"]')).toHaveTextContent('300');
    });
  });

  it('renders empty state message when questions array is empty', () => {
    render(<ItemQuestions questions={[]} />);
    
    const container = screen.getByTestId('questions-container');
    const emptyMessage = screen.getByText('No hay preguntas aún. ¡Sé el primero en preguntar!');
    
    expect(container).toBeInTheDocument();
    expect(emptyMessage).toBeInTheDocument();
    expect(screen.queryAllByTestId('item-question')).toHaveLength(0);
  });

  it('renders empty state message when questions is null', () => {
    render(<ItemQuestions questions={null as any} />);
    
    const container = screen.getByTestId('questions-container');
    const emptyMessage = screen.getByText('No hay preguntas aún. ¡Sé el primero en preguntar!');
    
    expect(container).toBeInTheDocument();
    expect(emptyMessage).toBeInTheDocument();
    expect(screen.queryAllByTestId('item-question')).toHaveLength(0);
  });

  it('renders empty state message when questions is undefined', () => {
    render(<ItemQuestions questions={undefined as any} />);
    
    const container = screen.getByTestId('questions-container');
    const emptyMessage = screen.getByText('No hay preguntas aún. ¡Sé el primero en preguntar!');
    
    expect(container).toBeInTheDocument();
    expect(emptyMessage).toBeInTheDocument();
    expect(screen.queryAllByTestId('item-question')).toHaveLength(0);
  });

  it('handles single question', () => {
    const singleQuestion = [defaultQuestions[0]];
    render(<ItemQuestions questions={singleQuestion} />);
    
    const questions = screen.getAllByTestId('item-question');
    expect(questions).toHaveLength(1);
    
    const question = questions[0];
    expect(question.querySelector('[data-testid="question"]')).toHaveTextContent('¿Cuál es el material del producto?');
    expect(question.querySelector('[data-testid="answer"]')).toHaveTextContent('El producto está fabricado en acero inoxidable de alta calidad.');
  });

  it('handles many questions', () => {
    const manyQuestions = Array.from({ length: 10 }, (_, i) => ({
      question: `Pregunta número ${i + 1}`,
      answer: `Respuesta número ${i + 1}`,
      date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    }));
    
    render(<ItemQuestions questions={manyQuestions} />);
    
    const questions = screen.getAllByTestId('item-question');
    expect(questions).toHaveLength(10);
    
    // Check first and last question
    const firstQuestion = questions[0];
    const lastQuestion = questions[9];
    
    expect(firstQuestion.querySelector('[data-testid="question"]')).toHaveTextContent('Pregunta número 1');
    expect(lastQuestion.querySelector('[data-testid="question"]')).toHaveTextContent('Pregunta número 10');
  });

  it('handles questions with special characters', () => {
    const questionsWithSpecialChars = [
      {
        question: '¿Cuál es el precio? Con símbolos: @#$%^&*() y acentos: áéíóú ñ',
        answer: 'El precio es $150.000 pesos colombianos 💰',
        date: '2024-01-15',
      },
    ];
    
    render(<ItemQuestions questions={questionsWithSpecialChars} />);
    
    const question = screen.getByTestId('item-question');
    expect(question.querySelector('[data-testid="question"]')).toHaveTextContent('¿Cuál es el precio? Con símbolos: @#$%^&*() y acentos: áéíóú ñ');
    expect(question.querySelector('[data-testid="answer"]')).toHaveTextContent('El precio es $150.000 pesos colombianos 💰');
  });

  it('handles questions with emojis', () => {
    const questionsWithEmojis = [
      {
        question: '¿Es resistente al agua? 💧',
        answer: 'Sí, es completamente resistente al agua 🌊',
        date: '2024-01-15',
      },
    ];
    
    render(<ItemQuestions questions={questionsWithEmojis} />);
    
    const question = screen.getByTestId('item-question');
    expect(question.querySelector('[data-testid="question"]')).toHaveTextContent('¿Es resistente al agua? 💧');
    expect(question.querySelector('[data-testid="answer"]')).toHaveTextContent('Sí, es completamente resistente al agua 🌊');
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
    
    render(<ItemQuestions questions={questionsWithLongContent} />);
    
    const question = screen.getByTestId('item-question');
    expect(question.querySelector('[data-testid="question"]')).toHaveTextContent(longQuestion);
    expect(question.querySelector('[data-testid="answer"]')).toHaveTextContent(longAnswer);
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
    
    render(<ItemQuestions questions={questionsWithDifferentDates} />);
    
    const questions = screen.getAllByTestId('item-question');
    
    expect(questions[0].querySelector('[data-testid="date"]')).toHaveTextContent('2024-01-15');
    expect(questions[1].querySelector('[data-testid="date"]')).toHaveTextContent('15/01/2024');
    expect(questions[2].querySelector('[data-testid="date"]')).toHaveTextContent('Enero 15, 2024');
  });

  it('handles zero maxLength', () => {
    render(<ItemQuestions questions={defaultQuestions} maxLength={0} />);
    
    const questions = screen.getAllByTestId('item-question');
    questions.forEach(question => {
      expect(question.querySelector('[data-testid="max-length"]')).toHaveTextContent('0');
    });
  });

  it('handles very high maxLength', () => {
    const highMaxLength = 999999;
    render(<ItemQuestions questions={defaultQuestions} maxLength={highMaxLength} />);
    
    const questions = screen.getAllByTestId('item-question');
    questions.forEach(question => {
      expect(question.querySelector('[data-testid="max-length"]')).toHaveTextContent('999999');
    });
  });

  it('handles negative maxLength', () => {
    render(<ItemQuestions questions={defaultQuestions} maxLength={-100} />);
    
    const questions = screen.getAllByTestId('item-question');
    questions.forEach(question => {
      expect(question.querySelector('[data-testid="max-length"]')).toHaveTextContent('-100');
    });
  });

  it('handles decimal maxLength', () => {
    render(<ItemQuestions questions={defaultQuestions} maxLength={150.5} />);
    
    const questions = screen.getAllByTestId('item-question');
    questions.forEach(question => {
      expect(question.querySelector('[data-testid="max-length"]')).toHaveTextContent('150.5');
    });
  });

  it('maintains structure with all props', () => {
    render(<ItemQuestions questions={defaultQuestions} maxLength={250} />);
    
    // Check that container is present
    expect(screen.getByTestId('questions-container')).toBeInTheDocument();
    
    // Check that all questions are rendered
    const questions = screen.getAllByTestId('item-question');
    expect(questions).toHaveLength(3);
    
    // Check that maxLength is passed correctly
    questions.forEach(question => {
      expect(question.querySelector('[data-testid="max-length"]')).toHaveTextContent('250');
    });
  });

  it('renders with different props values', () => {
    const { rerender } = render(<ItemQuestions questions={defaultQuestions} maxLength={100} />);
    
    let questions = screen.getAllByTestId('item-question');
    expect(questions).toHaveLength(3);
    
    questions.forEach(question => {
      expect(question.querySelector('[data-testid="max-length"]')).toHaveTextContent('100');
    });
    
    // Change props
    const newQuestions = [
      {
        question: 'Nueva pregunta',
        answer: 'Nueva respuesta',
        date: '2024-02-01',
      },
    ];
    
    rerender(<ItemQuestions questions={newQuestions} maxLength={500} />);
    
    questions = screen.getAllByTestId('item-question');
    expect(questions).toHaveLength(1);
    
    expect(questions[0].querySelector('[data-testid="question"]')).toHaveTextContent('Nueva pregunta');
    expect(questions[0].querySelector('[data-testid="answer"]')).toHaveTextContent('Nueva respuesta');
    expect(questions[0].querySelector('[data-testid="max-length"]')).toHaveTextContent('500');
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
    
    render(<ItemQuestions questions={questionsWithEmptyStrings} />);
    
    const questions = screen.getAllByTestId('item-question');
    expect(questions).toHaveLength(2);
    
    expect(questions[0].querySelector('[data-testid="question"]')).toHaveTextContent('');
    expect(questions[0].querySelector('[data-testid="answer"]')).toHaveTextContent('');
    expect(questions[1].querySelector('[data-testid="question"]')).toHaveTextContent('Pregunta normal');
  });

  it('handles questions with only whitespace', () => {
    const questionsWithWhitespace = [
      {
        question: '   ',
        answer: '  \t\n  ',
        date: '2024-01-15',
      },
    ];
    
    render(<ItemQuestions questions={questionsWithWhitespace} />);
    
    const question = screen.getByTestId('item-question');
    expect(question.querySelector('[data-testid="question"]')?.textContent).toBe('   ');
    expect(question.querySelector('[data-testid="answer"]')?.textContent).toBe('  \t\n  ');
  });

  it('handles questions with HTML-like content', () => {
    const questionsWithHTML = [
      {
        question: '<strong>Pregunta</strong> con <em>formato</em>',
        answer: '<script>alert("test")</script> Respuesta con HTML',
        date: '2024-01-15',
      },
    ];
    
    render(<ItemQuestions questions={questionsWithHTML} />);
    
    const question = screen.getByTestId('item-question');
    expect(question.querySelector('[data-testid="question"]')).toHaveTextContent('<strong>Pregunta</strong> con <em>formato</em>');
    expect(question.querySelector('[data-testid="answer"]')).toHaveTextContent('<script>alert("test")</script> Respuesta con HTML');
  });
});
