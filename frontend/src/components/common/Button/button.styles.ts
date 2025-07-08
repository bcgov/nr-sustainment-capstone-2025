/**
 * @summary This is the styling page for the common button component.
 */
import styled from '@emotion/styled';
import typography from '../../../typography';

type ButtonProps = {
  variant: string;
  size: string;
  disabled: boolean;
  className?: "";
};

const StyledButton = styled.button<ButtonProps>`
  ${typography.toString()}
  width: ${(props) => (props.size === 'sm' || props.size === 'tall' ? '125px' : props.size === 'md' ? '175px' : props.size === 'nav'? '90px' : props.size === 'home' ? '55px': '300px')};
  height: ${(props) => (props.size === 'sm' ? '35px' : props.size === 'md' ? '50px' : props.size === 'nav' || props.size === 'tall' ? '45px' :'100px')};
  border: none;
  border-radius: 8px;
  padding: 2px;
  margin: ${(props) => (props.size === 'sm' || props.size === 'nav' ? '0.15em' : props.size === 'md' ? '0.15em' : props.size === 'tall' ? '1em 1em 0em 1em' : '1em')};
  text-align: center;
  text-decoration: none;
  font-size: ${(props) => (props.size === 'sm' || props.size === 'nav' ? '14px' : '15px')};
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === 'primary'
      ? '#003366'
      : props.variant === 'secondary'
        ? '#DC3545'
        : '#000000'};
  background-color: ${(props) =>
    props.variant === 'primary'
      ? '#003366'
      : props.variant === 'secondary'
        ? '#DC3545'
        : props.variant === 'tertiary'
          ? '#198754'
          : '#000000'};
  color: #ffffff;
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
