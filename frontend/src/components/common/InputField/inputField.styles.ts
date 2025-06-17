/**
 * @summary Styling for InputField component
 */
import styled from '@emotion/styled';

export const InputWrapper = styled.div<{ flex?: string, dir?: string}>`
  display: flex;
  flex-direction: ${({dir}) => dir === 'row' ? 'row' : 'column'};
  flex: ${({ flex }) => flex || '1'};
`;

export const StyledLabel = styled.label<{dir?: string}>`
  margin: ${({dir}) => dir === 'row' ? '8px' : '10px 0px 0px 0px'};
  font-size: 14px;
  text-align: left;
  ${({dir}) => dir === 'row' ? 'display: flex; align-items: center;' : '' }
`;

export const StyledInput = styled.input<{dir?: string}>`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
  &:focus {
    border-color: #c8c8c8;
    outline: none;
  }
`;
