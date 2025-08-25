import styled from 'styled-components';

export const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  padding-left: ${({ theme }) => theme.spacing.md};
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-family: ${({ theme }) => theme.fonts.primary};
    text-align: center;
    margin: ${({ theme }) => theme.spacing.lg} 0;
    font-style: italic;
  }
`;
