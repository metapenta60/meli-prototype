import { useParams, useNavigate } from 'react-router-dom';
import FamilyBar from '../FamilyBar';
import ItemDetails from '../ItemDetails';
import { ItemPageContainer, MainContentWrapper } from './ItemPage.styled';

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  console.log(id);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <ItemPageContainer>
      <MainContentWrapper>
        <FamilyBar 
          familyName="Celulares y Smartphones" 
          onBack={handleBack}
        />
        <ItemDetails itemId={id || ''} />
      </MainContentWrapper>
    </ItemPageContainer>
  );
};

export default ItemPage;
