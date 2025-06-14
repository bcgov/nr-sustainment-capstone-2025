/**
 * @summary Reusable Input Field Component
 */
import React from 'react';
import { InputWrapper, StyledLabel, StyledInput } from './inputField.styles';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: React.FormEventHandler<HTMLInputElement>;
  flex?: string;
  dir?: string;
  size?: string;
  maxLength?: number;
  required?: true;
  className?: string;
}

function InputField({
  label,
  type,
  name,
  value,
  onChange,
  onInput,
  flex,
  dir,
  maxLength,
  required,
  className
}: InputFieldProps) {
  return (
    <InputWrapper flex={flex} dir={dir}>
      <StyledLabel dir={dir} htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        type={type}
        name={name}
        dir={dir}
        value={value}
        onChange={onChange}
        onInput={onInput}
        maxLength={maxLength}
        required={required}
        className={className}
      />
    </InputWrapper>
  );
}

export default InputField;
