import React from 'react';
import { 
  CharacteristicsContainer, 
  LeftColumn, 
  RightColumn,
  CharacteristicGroup, 
  GroupTitle, 
  CharacteristicRow, 
  CharacteristicLabel, 
  CharacteristicValue 
} from './OtherCharacteristics.styled.tsx';

interface SecondaryCharacteristic {
  title: string;
  value: string;
}


export interface CharacteristicGroup {
  title: string;
  characteristics: SecondaryCharacteristic[];
}

export interface OtherCharacteristicsProps {
  characteristicGroups: CharacteristicGroup[];
}

const OtherCharacteristics: React.FC<OtherCharacteristicsProps> = ({ characteristicGroups }) => {
  const leftColumnItems = characteristicGroups.slice(0, Math.ceil(characteristicGroups.length / 2));
  const rightColumnItems = characteristicGroups.slice(Math.ceil(characteristicGroups.length / 2));

  return (
    <CharacteristicsContainer>
      <LeftColumn>
        {leftColumnItems.map((group, groupIndex) => (
          <CharacteristicGroup key={groupIndex}>
            <GroupTitle>{group.title}</GroupTitle>
            {group.characteristics.map((characteristic, itemIndex) => (
              <CharacteristicRow key={itemIndex} isEven={itemIndex % 2 === 0}>
                <CharacteristicLabel>{characteristic.title}:</CharacteristicLabel>
                <CharacteristicValue>{characteristic.value}</CharacteristicValue>
              </CharacteristicRow>
            ))}
          </CharacteristicGroup>
        ))}
      </LeftColumn>
      
      <RightColumn>
        {rightColumnItems.map((group, groupIndex) => (
          <CharacteristicGroup key={groupIndex}>
            <GroupTitle>{group.title}</GroupTitle>
            {group.characteristics.map((characteristic, itemIndex) => (
              <CharacteristicRow key={itemIndex} isEven={itemIndex % 2 === 0}>
                <CharacteristicLabel>{characteristic.title}:</CharacteristicLabel>
                <CharacteristicValue>{characteristic.value}</CharacteristicValue>
              </CharacteristicRow>
            ))}
          </CharacteristicGroup>
        ))}
      </RightColumn>
    </CharacteristicsContainer>
  );
};

export default OtherCharacteristics;
