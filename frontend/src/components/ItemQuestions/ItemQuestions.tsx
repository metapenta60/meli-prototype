import React from 'react';
import { QuestionsContainer } from './ItemQuestions.styled.tsx';
import ItemQuestion from '../ItemQuestion';

interface QuestionAnswer {
  question: string;
  answer: string;
  date: string;
}

interface ItemQuestionsProps {
  questions: QuestionAnswer[];
  maxLength?: number;
}

const ItemQuestions: React.FC<ItemQuestionsProps> = ({ 
  questions, 
  maxLength = 500 
}) => {
  if (!questions || questions.length === 0) {
    return (
      <QuestionsContainer>
        <p>No hay preguntas aún. ¡Sé el primero en preguntar!</p>
      </QuestionsContainer>
    );
  }

  return (
    <QuestionsContainer>
      {questions.map((questionAnswer, index) => (
        <ItemQuestion
          key={index}
          questionAnswer={questionAnswer}
          maxLength={maxLength}
        />
      ))}
    </QuestionsContainer>
  );
};

export default ItemQuestions;
