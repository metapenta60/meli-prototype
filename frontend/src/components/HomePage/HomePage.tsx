import { AppContainer, Title, Subtitle } from '../../App.styled';
import Dropdown from '../Dropdown';

const HomePage: React.FC = () => {
  const handleProductSelection = (value: string) => {
    console.log('Producto seleccionado:', value);
  };

  return (
    <AppContainer>
      <Title>Bienvenido a Mercado Libre</Title>
      <Subtitle>Escoge uno de los productos para visualizarlo</Subtitle>
      <Dropdown onSelectionChange={handleProductSelection} />
    </AppContainer>
  );
};

export default HomePage;
