import styled from 'styled-components';

export const AppContainer = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  font-family: ${props => props.theme.fonts.primary};
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.textPrimary};
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes["4xl"]};
  line-height: 1.1;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textPrimary};
  font-weight: ${props => props.theme.fontWeights.bold};

`;

export const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;
