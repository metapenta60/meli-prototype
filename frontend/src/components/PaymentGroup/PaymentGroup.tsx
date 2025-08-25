import React from 'react';
import {
  PaymentGroupContainer,
  PaymentTitle,
  PaymentLogosContainer,
  PaymentLogo
} from './PaymentGroup.styled.tsx';

interface PaymentGroupProps {
  title: string;
  logos: string[];
}

const PaymentGroup: React.FC<PaymentGroupProps> = ({ title, logos }) => {
  return (
    <PaymentGroupContainer>
      <PaymentTitle>{title}</PaymentTitle>
      <PaymentLogosContainer>
        {logos.map((logo, index) => (
          <PaymentLogo key={index} src={logo} alt={`Logo ${index + 1}`} />
        ))}
      </PaymentLogosContainer>
    </PaymentGroupContainer>
  );
};

export default PaymentGroup;
