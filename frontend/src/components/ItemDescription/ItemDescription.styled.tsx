import styled from 'styled-components';

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.md};
`;

export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.6;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const DescriptionTextBlurred = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  filter: blur(1px);
  opacity: 0.5;
  user-select: none;
`;

