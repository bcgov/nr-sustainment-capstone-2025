/**
 * @summary Reusable BC Gov Footer Component
 */

import { Banner, FooterWrapper, StyledLink, Columns } from './footer.styles.ts';

export default function Footer() {
  return (
    <FooterWrapper>
      {/* <div type="dark" variant="primary" toggleable="sm"> */}
      <Banner>
        <Columns>
          <div>
            <StyledLink
              id="footer-home"
              href="https://www.gov.bc.ca/"
            >
              Home
            </StyledLink>
            <StyledLink
              id="footer-about"
              href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca"
            >
              About gov.bc.ca
            </StyledLink>
          </div>
          <div>
            <StyledLink
              id="footer-disclaimer"
              href="http://gov.bc.ca/disclaimer/"
            >
              Disclaimer
            </StyledLink>
            <StyledLink
              id="footer-privacy"
              href="http://gov.bc.ca/privacy/"
            >
              Privacy
            </StyledLink>
            <StyledLink
              id="footer-accessibility"
              href="http://gov.bc.ca/webaccessibility/"
            >
              Accessibility
            </StyledLink>
          </div>
          <div>
            <StyledLink
              id="footer-copyright"
              href="http://gov.bc.ca/copyright"
            >
              Copyright
            </StyledLink>
            <StyledLink href="https://www2.gov.bc.ca/gov/content/home/contact-us">
              Contact Us
            </StyledLink>
          </div>
        </Columns>
      </Banner>
    </FooterWrapper>
  );
}
