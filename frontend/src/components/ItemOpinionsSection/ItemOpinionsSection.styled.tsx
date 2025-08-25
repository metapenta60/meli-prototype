import styled from 'styled-components';

export const OpinionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  padding-left: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
