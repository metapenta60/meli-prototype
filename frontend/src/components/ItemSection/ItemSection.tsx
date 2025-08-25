import React from 'react';
import { SectionContainer, SectionTitle } from './ItemSection.styled.tsx';

interface ItemSectionProps {
  title: string;
  children: React.ReactNode;
}

const ItemSection: React.FC<ItemSectionProps> = ({ title, children }) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  );
};

export default ItemSection;
