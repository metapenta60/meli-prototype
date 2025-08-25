import { NavbarContainer, NavbarContent, Logo } from './Navbar.styled';

interface NavbarProps {
  src?: string;
  alt?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  src = "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.144/mercadolibre/logo_large_plus@2x.webp",
  alt = "Mercado Libre"
}: NavbarProps) => {
  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo 
          src={src}
          alt={alt}
        />
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
