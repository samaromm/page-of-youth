import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  &:nth-of-type(3) {
    margin-bottom:0;
  }
`;

const StyledInput = styled.input`
  padding: 1.2rem 2rem;
  width: 100%;
  background-color: #FF8E8E;
  color: #fff;
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 2rem;
  border: none;
  &::placeholder {
    color: var(--color-white);
  }
`;

const Error = styled.div`
  color: var(--color-errorRed);
  visibility: ${({ show }) => (show ? 'visibile' : 'hidden')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: translateY(${({ show }) => (show ? '20px' : '10px')});
  transition: all 0.1s;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0rem 2rem;
  font-weight: 500;
  font-size: 1.2rem;
`;

const Input = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput {...field} {...props} />
      <Error show={errors[field.name] && touched[field.name]}>
        {errors[field.name]}
      </Error>
    </InputWrapper>
  );
};

export default Input;