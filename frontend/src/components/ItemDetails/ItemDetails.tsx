import {
  ItemDetailsContainer,
  LeftColumn,
  RightColumn
} from './ItemDetails.styled';
import ItemGallery from '../ItemGallery';
import { Border, Divider } from '../Shared';
import ItemSection from '../ItemSection';
import MainCharacteristics from '../MainCharacteristics';
import ItemDescription from '../ItemDescription';
import ItemQuestionsSection from '../ItemQuestionsSection';
import ItemOpinionsSection from '../ItemOpinionsSection';
import SellerCard from '../SellerCard';
import ItemInfoCard from '../ItemInfoCard';
import React, { useEffect } from 'react';
import PaymentInfoCard from '../PaymentInfoCard';
import { useGET } from '../../hooks';

interface ItemDetailsProps {
  itemId: string;
}


const ItemDetails: React.FC<ItemDetailsProps> = ({ itemId }) => {
  const { result, error, request } = useGET(`http://localhost:8080/api/v1/items/${itemId}`);
  
  useEffect(() => {
    if (itemId) {
      request();
    }
  }, [itemId, request]);
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!result) {
    return <div>Loading...</div>;
  }
  
  return (
    <ItemDetailsContainer>
      <LeftColumn>
        <ItemGallery
          images={result.images}
          isMostSold={false}
          containerSize="full"
        />
        <Divider />
        <ItemSection title="Características">
          <MainCharacteristics {...result.characteristicsInfo} />
        </ItemSection>
        <Divider />
        <ItemSection title="Descripción">
          <ItemDescription description={result.description} maxLength={150} />
        </ItemSection>
        <Divider />
        <ItemSection title="Preguntas">
          <ItemQuestionsSection
            questions={result.questions}
            maxLength={500}
            onAskQuestion={(question) => console.log('Pregunta:', question)}
          />
        </ItemSection>
        <Divider />
        <ItemSection title="Opiniones del producto">
          <ItemOpinionsSection
            {...result.ratingInfo}
          />
        </ItemSection>
      </LeftColumn>

      <RightColumn>
        <Border>
          <ItemInfoCard
            {...result.generalInfo}
          />
        </Border>
        <SellerCard
          {...result.seller}
        />
        <Border>
          <PaymentInfoCard
            {...result.paymentInfo}
          />
        </Border>

      </RightColumn>
    </ItemDetailsContainer>
  );
};

export default ItemDetails;
