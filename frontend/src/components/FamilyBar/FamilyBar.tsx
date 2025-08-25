import { Link } from '../Shared/Link.styled.tsx';
import { FamilyBarContainer, FamilyName } from './FamilyBar.styled.tsx';

interface FamilyBarProps {
  familyName: string;
  onBack?: () => void;
}

const FamilyBar: React.FC<FamilyBarProps> = ({ familyName, onBack }) => {
  return (
    <FamilyBarContainer>
      <FamilyName>{familyName}</FamilyName>
      <Link onClick={onBack}>Volver</Link>
    </FamilyBarContainer>
  );
};

export default FamilyBar;
