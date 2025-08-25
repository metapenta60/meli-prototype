import styled from 'styled-components';

export const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
`;

export const OverallRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const RatingNumber = styled.div`
  font-size: 48px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.meliBlue};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const StarRating = styled.div`
  display: flex;
  gap: 4px;
  font-size: 24px;
  
  span {
    color: ${({ theme }) => theme.colors.meliBlue};
  }
`;

export const RatingCount = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const RatingDistribution = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DistributionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-family: ${({ theme }) => theme.fonts.primary};
    min-width: 20px;
  }
`;

export const DistributionBar = styled.div<{ percentage: number }>`
  flex: 1;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.borderSecondary};
  border-radius: 4px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ percentage }) => percentage}%;
    background-color: ${({ theme }) => theme.colors.meliBlue};
    border-radius: 4px;
  }
`;

export const StarIcon = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;
