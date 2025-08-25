import styled from 'styled-components';

export const SectionContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
`;

export const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;
