/**
 * @summary Styles for reusable Header component
 */
import styled from '@emotion/styled';
import screenSizes from '../../constants/screenSizes';
import typography from '../../typography';

export const HeaderWrapper = styled.header`
  background-color: #036;
  border-bottom: 2px solid #fcba19;
  margin-bottom: 3em;
  padding: 0;
  color: #fff;
  display: flex;
  flex: 0 1 65px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 15vh;
  @media (min-width: ${screenSizes.tablet}) {
    justify-content: flex-start;
    padding-left: 2em;
  }
  z-index: 2000;
`;

export const Heading = styled.h2`
  ${typography.toString()}
  color: rgb(255, 255, 255);
  font-size: 16pt;
  font-weight: 500;
  min-width: 150px;
  display: contents;
  text-decoration: none;
  position: absolute;
  right: 10px;
  margin-right: 2em;
`;

export const Banner = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const BannerRight = styled.div`
  min-width: 35pt;
  display: flex;
  padding: 0 0.5em;
  margin: 0;
  @media (min-width: ${screenSizes.tablet}) {
    margin: 0 0 0 auto;
  }
`;

export const BannerLeft = styled.div`
  min-width: 35pt;
  display: flex;
  padding: 0 0.5em;
  margin: 0;
`;
export const Image = styled.img`
  width: 175px;
  top: 10px;
  position: relative;
  height: 100%;
  padding-right: 10px;
  @media (max-width: ${screenSizes.mobile}) {
    width: 100px;
    padding-right: 5px;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
`;

export const StyledLinkHeading = styled.a`
  text-decoration: none;
  position: absolute;
  right: 10px;
  margin-right: 2em;
`;