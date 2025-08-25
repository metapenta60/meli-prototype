import React, { useState } from 'react';
import { 
  CharacteristicsContainer, 
  LeftColumn, 
  RightColumn, 
  CharacteristicItem, 
  CharacteristicIcon, 
  CharacteristicContent,
  CharacteristicTitle,
  CharacteristicValue
} from './MainCharacteristics.styled';
import type { CharacteristicGroup } from '../OtherCharacteristics';
import OtherCharacteristics from '../OtherCharacteristics';
import { Link, ItemLinkContainer } from '../Shared';

interface Characteristic {
  icon: string; // URL to SVG image
  title: string;
  content: string;
}

interface MainCharacteristicsProps {
  mainCharacteristics: Characteristic[];
  otherCharacteristics: CharacteristicGroup[];
}

const MainCharacteristics: React.FC<MainCharacteristicsProps> = ({ 
  mainCharacteristics: characteristics, 
  otherCharacteristics 
}) => {
  const [showOtherCharacteristics, setShowOtherCharacteristics] = useState(false);

  const handleShowOtherCharacteristics = () => {
    setShowOtherCharacteristics(true);
  };

  const leftColumnItems = characteristics.slice(0, Math.ceil(characteristics.length / 2));
  const rightColumnItems = characteristics.slice(Math.ceil(characteristics.length / 2));

  return (
    <>
      <CharacteristicsContainer>
        <LeftColumn>
          {leftColumnItems.map((item, index) => (
            <CharacteristicItem key={index}>
              <CharacteristicIcon>
                <img src={item.icon} alt={`${item.title} icon`} />
              </CharacteristicIcon>
              <CharacteristicContent>
                <CharacteristicTitle>{item.title}:</CharacteristicTitle>
                <CharacteristicValue> {item.content}</CharacteristicValue>
              </CharacteristicContent>
            </CharacteristicItem>
          ))}
        </LeftColumn>
        
        <RightColumn>
          {rightColumnItems.map((item, index) => (
            <CharacteristicItem key={index}>
              <CharacteristicIcon>
                <img src={item.icon} alt={`${item.title} icon`} />
              </CharacteristicIcon>
              <CharacteristicContent>
                <CharacteristicTitle>{item.title}:</CharacteristicTitle>
                <CharacteristicValue> {item.content}</CharacteristicValue>
              </CharacteristicContent>
            </CharacteristicItem>
          ))}
        </RightColumn>
      </CharacteristicsContainer>
      
      {showOtherCharacteristics ? (
        <OtherCharacteristics characteristicGroups={otherCharacteristics} />
      ) : (
        <ItemLinkContainer>
          <Link onClick={handleShowOtherCharacteristics}>
            Ver todas las características
          </Link>
        </ItemLinkContainer>
      )}
    </>
  );
};

export default MainCharacteristics;
