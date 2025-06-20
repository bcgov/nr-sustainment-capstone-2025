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
    height: 22.5vh;
    width: 22.5vh;
    border-radius: 5%;

    @media screen and (min-height: 796px) {
        height: 25vh;
        width: 25vh;
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
