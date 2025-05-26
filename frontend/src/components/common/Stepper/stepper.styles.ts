/**
 * @summary Styles for reusable Stepper component
 */
import styled from '@emotion/styled';
import screenSizes from '../../../constants/screenSizes';
//import typography from '../../../typography';

export const Input = styled.input`
    width: 40vw;
    @media (min-width: ${screenSizes.tablet}) {
        width: 30vw;
    }
    accent-color: #036;
`;