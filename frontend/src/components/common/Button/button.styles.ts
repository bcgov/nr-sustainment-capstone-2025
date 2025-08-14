/**
 * @summary This is the styling page for the common button component.
 */
import styled from '@emotion/styled';
import typography from '../../../typography';

type ButtonProps = {
  variant: string;
  size: string;
  disabled: boolean;
};

const StyledButton = styled.button<ButtonProps>`
  ${typography.toString()}
  width: ${(props) => (props.size === 'sm' || props.size === 'tall' ? '125px' : props.size === 'md' ? '175px' :
            props.size === 'link' ? '85px' : props.size === 'save' ? '115px' : props.size === 'home' || props.size === 'nav' ? '80px' : '300px')};
  height: ${(props) => (props.size === 'sm' ? '35px' : props.size === 'md' ? '50px' : props.size === 'link' || 
            props.size === 'tall' || props.size === 'save' || props.size === 'home' || props.size === 'nav' ? '45px' : '100px')};
  border: ${(props) =>
    props.variant === 'primary'
      ? 'none'
      : props.variant === 'secondary'
        ? '1px solid black'
        : 'none'};
  border-radius: 5px;
  padding: 2px;
  margin: ${(props) => (props.size === 'sm' || props.size === 'nav' || props.size === 'save' || props.size === 'home' ? '0 1.5px' : props.size === 'md' ? '0.15em' : props.size === 'tall' ? '1em 1em 0em 1em' : '1em')};
  text-align: center;
  text-decoration: none;
  font-size: ${(props) => (props.size === 'sm' || props.size === 'nav' || props.size === 'save' || props.size === 'home' ? '14px' : '15px')};
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === 'primary'
      ? '#003366'
      : props.variant === 'secondary'
        ? '#ffffff'
        : '#000000'};
  background-color: ${(props) =>
    props.variant === 'primary'
      ? '#003366'
      : props.variant === 'secondary'
        ? '#ffffff'
        : props.variant === 'tertiary'
          ? '#ffffff'
      : '#000000'};
  color: ${(props) =>
  props.variant === 'primary'
    ? '#ffffff'
    : props.variant === 'secondary'
      ? '#000000'
      : props.variant === 'tertiary'
      ? '#003366'
      : '#ffffff'};
  text-decoration: ${(props) =>
  props.variant === 'tertiary'
    ? 'underline'
    : 'none'};
  &:hover {
    transform: scale(0.98);
  }
  &:disabled {
    transform: scale(1);
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

export default StyledButton;
