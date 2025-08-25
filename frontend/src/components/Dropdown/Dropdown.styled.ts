import styled from 'styled-components';

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
  width: 100%;
`;

export const DropdownLabel = styled.label`
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.sm};
  text-align: center;
`;

export const DropdownSelect = styled.select`
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.regular};
  color: ${props => props.theme.colors.textPrimary};
  background-color: ${props => props.theme.colors.backgroundPrimary};
  border: 2px solid ${props => props.theme.colors.borderPrimary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  min-width: 600px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.sm};
  
  &:hover {
    border-color: ${props => props.theme.colors.meliBlue};
    box-shadow: ${props => props.theme.shadows.base};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.meliBlue};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.meliBlue}33;
  }
  
  option {
    font-family: ${props => props.theme.fonts.primary};
    font-size: ${props => props.theme.fontSizes.base};
    padding: ${props => props.theme.spacing.sm};
  }
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
