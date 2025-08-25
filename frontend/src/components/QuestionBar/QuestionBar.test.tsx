import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import QuestionBar from './QuestionBar';

// Mock the styled components
vi.mock('./QuestionBar.styled.tsx', () => ({
  QuestionBarContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="question-bar-container">{children}</div>
  ),
  QuestionInput: ({ ...props }: any) => (
    <input data-testid="question-input" {...props} />
  ),
  AskButton: ({ children, ...props }: any) => (
    <button data-testid="ask-button" {...props}>
      {children}
    </button>
  ),
  AskButtonIcon: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="ask-button-icon">{children}</span>
  ),
}));

// Mock the star icon
vi.mock('../../assets/star-icon.svg', () => ({
  default: 'star-icon.svg'
}));

describe('QuestionBar', () => {
  it('renders the question input', () => {
    render(<QuestionBar />);
    
    const input = screen.getByTestId('question-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Escribe tu pregunta...');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders the ask button', () => {
    render(<QuestionBar />);
    
    const button = screen.getByTestId('ask-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Preguntar');
  });

  it('renders the question bar container', () => {
    render(<QuestionBar />);
    
    const container = screen.getByTestId('question-bar-container');
    expect(container).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<QuestionBar />);
    
    const input = screen.getByTestId('question-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test question' } });
    
    expect(input.value).toBe('Test question');
  });

  it('calls onAskQuestion when button is clicked with valid question', () => {
    const mockOnAskQuestion = vi.fn();
    render(<QuestionBar onAskQuestion={mockOnAskQuestion} />);
    
    const input = screen.getByTestId('question-input');
    const button = screen.getByTestId('ask-button');
    
    fireEvent.change(input, { target: { value: 'Test question' } });
    fireEvent.click(button);
    
    expect(mockOnAskQuestion).toHaveBeenCalledWith('Test question');
  });


  it('clears input after submitting question', () => {
    const mockOnAskQuestion = vi.fn();
    render(<QuestionBar onAskQuestion={mockOnAskQuestion} />);
    
    const input = screen.getByTestId('question-input') as HTMLInputElement;
    const button = screen.getByTestId('ask-button');
    
    fireEvent.change(input, { target: { value: 'Test question' } });
    fireEvent.click(button);
    
    expect(input.value).toBe('');
  });

  it('does not call onAskQuestion when question is empty', () => {
    const mockOnAskQuestion = vi.fn();
    render(<QuestionBar onAskQuestion={mockOnAskQuestion} />);
    
    const button = screen.getByTestId('ask-button');
    fireEvent.click(button);
    
    expect(mockOnAskQuestion).not.toHaveBeenCalled();
  });

  it('does not call onAskQuestion when question is only whitespace', () => {
    const mockOnAskQuestion = vi.fn();
    render(<QuestionBar onAskQuestion={mockOnAskQuestion} />);
    
    const input = screen.getByTestId('question-input');
    const button = screen.getByTestId('ask-button');
    
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    
    expect(mockOnAskQuestion).not.toHaveBeenCalled();
  });

  it('trims whitespace from question before submitting', () => {
    const mockOnAskQuestion = vi.fn();
    render(<QuestionBar onAskQuestion={mockOnAskQuestion} />);
    
    const input = screen.getByTestId('question-input');
    const button = screen.getByTestId('ask-button');
    
    fireEvent.change(input, { target: { value: '  Test question  ' } });
    fireEvent.click(button);
    
    expect(mockOnAskQuestion).toHaveBeenCalledWith('Test question');
  });

  it('works without onAskQuestion prop', () => {
    render(<QuestionBar />);
    
    const input = screen.getByTestId('question-input');
    const button = screen.getByTestId('ask-button');
    
    fireEvent.change(input, { target: { value: 'Test question' } });
    
    // Should not crash when clicked without onAskQuestion
    fireEvent.click(button);
  });
});
