import React, { useState } from 'react';
import { 
  QuestionContainer, 
  QuestionText, 
  AnswerContainer, 
  AnswerText, 
  AnswerTextTruncated, 
  SeeMoreLink, 
  DateText 
} from './ItemQuestion.styled.tsx';
import { Link } from '../Shared';

interface QuestionAnswer {
  question: string;
  answer: string;
  date: string;
}

interface ItemQuestionProps {
  questionAnswer: QuestionAnswer;
  maxLength?: number;
}

const ItemQuestion: React.FC<ItemQuestionProps> = ({ 
  questionAnswer, 
  maxLength = 500 
}) => {
  const [showFullAnswer, setShowFullAnswer] = useState(false);
  const { question, answer, date } = questionAnswer;
  
  const isLongAnswer = answer.length > maxLength;

  const handleShowFullAnswer = () => {
    setShowFullAnswer(true);
  };

  if (!isLongAnswer || showFullAnswer) {
    return (
      <QuestionContainer>
        <QuestionText>{question}</QuestionText>
        <AnswerContainer>
          <AnswerText>{answer}</AnswerText>
          <DateText>{date}</DateText>
        </AnswerContainer>
      </QuestionContainer>
    );
  }

  // Si es largo, cortar a maxLength y mostrar "Ver más"
  const visibleText = answer.substring(0, maxLength);
  const hiddenText = answer.substring(maxLength);

  return (
    <QuestionContainer>
      <QuestionText>{question}</QuestionText>
      <AnswerContainer>
        <AnswerText>
          {visibleText}
          {hiddenText && <AnswerTextTruncated>{hiddenText}</AnswerTextTruncated>}
        </AnswerText>
        <SeeMoreLink>
          <Link onClick={handleShowFullAnswer}>
            Ver más
          </Link>
        </SeeMoreLink>
        <DateText>{date}</DateText>
      </AnswerContainer>
    </QuestionContainer>
  );
};

export default ItemQuestion;
