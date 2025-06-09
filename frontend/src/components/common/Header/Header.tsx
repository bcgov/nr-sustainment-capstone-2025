/**
 * @summary Reusable BC Gov Header Component
 */
import logo from '/logo-banner.svg';

import { HeaderWrapper, Heading, Banner, Image, StyledLink, StyledLinkHeading } from './header.styles.ts';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleReturnHomeClick = () => {
        navigate("/");
    }

  return (
    <HeaderWrapper>
      <Banner>
        <StyledLink onClick={handleReturnHomeClick}>
          <Image
            src={logo}
            alt="Go to the Home page"
          />
        </StyledLink>
        <StyledLinkHeading onClick={handleReturnHomeClick}>
          <Heading>Soil Assessment Tool</Heading>
        </StyledLinkHeading>
      </Banner>
    </HeaderWrapper>
  );
}
