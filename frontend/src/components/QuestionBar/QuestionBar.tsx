import React, { useState } from 'react';
import { 
  QuestionBarContainer, 
  QuestionInput, 
  AskButton, 
  AskButtonIcon 
} from './QuestionBar.styled.tsx';
import starIcon from '../../assets/star-icon.svg';

interface QuestionBarProps {
  onAskQuestion?: (question: string) => void;
}

const QuestionBar: React.FC<QuestionBarProps> = ({ onAskQuestion }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (question.trim() && onAskQuestion) {
      onAskQuestion(question.trim());
      setQuestion('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <QuestionBarContainer>
      <QuestionInput
        type="text"
        placeholder="Escribe tu pregunta..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <AskButton onClick={handleSubmit} disabled={!question.trim()}>
        <AskButtonIcon>
          <img src={starIcon} alt="Estrella" width="16" height="16" />
        </AskButtonIcon>
        Preguntar
      </AskButton>
    </QuestionBarContainer>
  );
};

export default QuestionBar;
