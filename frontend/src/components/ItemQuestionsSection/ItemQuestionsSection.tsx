import React from 'react';
import { SectionContainer } from './ItemQuestionsSection.styled.tsx';
import QuestionBar from '../QuestionBar';
import ItemQuestions from '../ItemQuestions';

interface QuestionAnswer {
  question: string;
  answer: string;
  date: string;
}

interface ItemQuestionsSectionProps {
  questions: QuestionAnswer[];
  maxLength?: number;
  onAskQuestion?: (question: string) => void;
}

const ItemQuestionsSection: React.FC<ItemQuestionsSectionProps> = ({ 
  questions, 
  maxLength = 500,
  onAskQuestion 
}) => {
  return (
    <SectionContainer>
      <QuestionBar onAskQuestion={onAskQuestion} />
      <ItemQuestions questions={questions} maxLength={maxLength} />
    </SectionContainer>
  );
};

export default ItemQuestionsSection;
