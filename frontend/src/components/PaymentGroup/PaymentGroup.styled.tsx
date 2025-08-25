import styled from 'styled-components';

export const PaymentGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const PaymentTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 0;
`;

export const PaymentLogosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

export const PaymentLogo = styled.img`
  height: 32px;
  width: auto;
  object-fit: contain;
  max-width: 120px;
  
  @media (max-width: 768px) {
    height: 28px;
    max-width: 100px;
  }
  
  @media (max-width: 480px) {
    height: 24px;
    max-width: 80px;
  }
`;
