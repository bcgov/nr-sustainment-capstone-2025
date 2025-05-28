/**
 * @summary Styles for reusable Slider component
 */
import styled from '@emotion/styled';
import screenSizes from '../../../constants/screenSizes';
import typography from '../../../typography';

export const Input = styled.input`
    width: 30vw;
    @media (max-width: ${screenSizes.tablet}) {
        width: 40vw;
    }
    @media (max-width: ${screenSizes.mobile}) {
        width: 50vw;
    }
    accent-color: #036;
`;

export const Image = styled.img`
    height: 12em;
    width: 13em;
    @media (min-width: ${screenSizes.tablet}) {
        height: 15em;
        width: 16em;
    }
`;

export const Text = styled.p`
    ${typography.toString()}
    color: rgb(0, 0, 0);
    font-size: 16pt;
    font-weight: 500;
    min-width: 150px;
    display: contents;
    text-decoration: none;
`