import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownContainer, 
  DropdownLabel, 
  DropdownSelect, 
  DropdownWrapper 
} from './Dropdown.styled';

interface DropdownProps {
  onSelectionChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelectionChange }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelectionChange?.(value);
    
    if (value && value !== '') {
      navigate(`/item/${value}`);
    }
  };

  return (
    <DropdownContainer>
      <DropdownWrapper>
        <DropdownLabel htmlFor="product-dropdown">
          Selecciona un producto
        </DropdownLabel>
        <DropdownSelect
          id="product-dropdown"
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="">-- Selecciona una opción --</option>
          <option value="55747713-9cd4-45f7-a4cd-9916ed17a61d">Samsung</option>
        </DropdownSelect>
      </DropdownWrapper>
    </DropdownContainer>
  );
};

export default Dropdown;
