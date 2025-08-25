import styled from 'styled-components';

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.borderSecondary};
  margin: ${({ theme }) => theme.spacing.md} 0;
  width: 100%;
`;

export const DividerVertical = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.borderSecondary};
  margin: 0 ${({ theme }) => theme.spacing.md};
`;

export const DividerSpaced = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.borderSecondary};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  width: 100%;
`;
