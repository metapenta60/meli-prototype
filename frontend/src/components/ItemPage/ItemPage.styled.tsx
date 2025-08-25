import styled from 'styled-components';

export const ItemPageContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 0;
`;

export const MainContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  background-color: #f5f5f5;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;
