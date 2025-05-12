/**
 * @summary Reusable BC Gov Header Component
 */
import logo from '/logo-banner.svg';

import { HeaderWrapper, Heading, Banner, Image, StyledLink, StyledLinkHeading } from './header.styles.ts';

export default function Header() {
  return (
    <HeaderWrapper>
      <Banner>
        <StyledLink href="/">
          <Image
            src={logo}
            alt="Go to the Home page"
          />
        </StyledLink>
        <StyledLinkHeading href="/">
          <Heading>InField Soil Health</Heading>
        </StyledLinkHeading>
      </Banner>
    </HeaderWrapper>
  );
}