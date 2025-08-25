import styled from 'styled-components';

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const QuestionText = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-family: ${({ theme }) => theme.fonts.primary};
  line-height: 1.4;
  margin: 0;
`;

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 2px solid ${({ theme }) => theme.colors.borderSecondary};
  margin-left: ${({ theme }) => theme.spacing.md};
`;

export const AnswerText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-family: ${({ theme }) => theme.fonts.primary};
  line-height: 1.6;
  margin: 0;
`;

export const AnswerTextTruncated = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.7;
`;

export const SeeMoreLink = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const DateText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  opacity: 0.8;
`;
