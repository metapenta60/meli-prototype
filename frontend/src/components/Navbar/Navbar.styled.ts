import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: ${props => props.theme.colors.meliYellow};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Logo = styled.img`
  height: 34px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: scale(1.02);
  }
`;
