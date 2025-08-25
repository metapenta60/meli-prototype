import styled from 'styled-components';

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.meliBlue};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.hover};
  }
  
  &:active {
    color: ${({ theme }) => theme.colors.active};
  }
`;

export const LinkSecondary = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    text-decoration: underline;
  }
`;

export const LinkSmall = styled.a`
  color: ${({ theme }) => theme.colors.meliBlue};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.hover};
  }
`;

export const ItemLinkContainer = styled.div`
  padding-left: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;
