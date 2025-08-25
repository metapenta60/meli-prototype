import React from 'react';
import {
  PaymentInfoContainer,
  PaymentTitle,
  PromotionalBanner,
  BannerIcon,
  BannerText,
  PaymentSectionsContainer
} from './PaymentInfoCard.styled.tsx';
import PaymentGroup from '../PaymentGroup';
import creditCardIcon from '../../assets/credit-card-icon.svg';

interface PaymentMethod {
  title: string;
  images: string[];
}

interface PaymentInfoCardProps {
  installments: number;
  paymentMethods: PaymentMethod[];
}

const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({ 
  installments, 
  paymentMethods 
}) => {
  return (
    <PaymentInfoContainer>
      <PaymentTitle>Medios de pago</PaymentTitle>
      <PromotionalBanner>
        <BannerIcon>
          <img src={creditCardIcon} alt="Tarjeta de crédito" width="24" height="24" />
        </BannerIcon>
        <BannerText>
          ¡Paga en hasta {installments} cuotas con 0% interés!
        </BannerText>
      </PromotionalBanner>
      
      <PaymentSectionsContainer>
        {paymentMethods.map((method, index) => (
          <PaymentGroup 
            key={index}
            title={method.title}
            logos={method.images}
          />
        ))}
      </PaymentSectionsContainer>
    </PaymentInfoContainer>
  );
};

export default PaymentInfoCard;
