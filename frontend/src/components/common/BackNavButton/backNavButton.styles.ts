/**
 * @summary Styles for reusable BackNavButton component
 * @author Dallas Richmond
 */
import styled from '@emotion/styled';

export const StyledBackButton = styled.button`
    background-color: darkgrey;
    border: none;
    outline: none;
    padding: 3px 3px 0 3px;
    cursor: pointer;
    font-size: 1rem;
    color: #333;
    position: absolute;
    left: 2vh;
    top: 9.5vh;
    align-items: center;
    justify-content: center;
    margin: 0;
    &:focus {
        outline: none;
    }
    &:hover {
        transform: scale(0.9);
    }

    @media (orientation: landscape) {
        top: 12.5vh
    }
`;

export const StyledIcon = styled.img`
    width: 30px;
    height: 27px;
    margin-bottom: 0;
    padding-right: 1.5px;
`;
