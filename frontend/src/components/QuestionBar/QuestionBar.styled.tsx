import styled from 'styled-components';

export const QuestionBarContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
  padding-left: ${({ theme }) => theme.spacing.md};
`;

export const QuestionInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  transition: ${({ theme }) => theme.transitions.fast};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.meliBlue};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.meliBlue}20;
  }
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.borderPrimary};
  }
`;

export const AskButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.meliBlue};
  color: ${({ theme }) => theme.colors.backgroundPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover};
  }
  
  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.active};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.borderSecondary};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

export const AskButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    filter: brightness(0) invert(1); 
    width: 16px;
    height: 16px;
  }
`;
