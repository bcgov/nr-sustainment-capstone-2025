/**
 * @summary Styles for reusable BackNavButton component
 * @author Dallas Richmond
 */
import styled from '@emotion/styled';

export const StyledBackButton = styled.button`
    background-color: darkgrey;
    border: none;
    outline: none;
    padding: 3px 3px 0.5px 3px;
    cursor: pointer;
    font-size: 1rem;
    color: #333;
    position: absolute;
    left: 5vh;
    top: 10vh;
    align-items: center;
    justify-content: center;
    margin: 0;
    &:focus {
        outline: none;
    }
    &:hover {
        transform: scale(0.9);
    }
`;

export const StyledIcon = styled.img`
    width: 30px;
    height: 30px;
    margin-bottom: 0;
    padding-right: 1.5px;
`;
