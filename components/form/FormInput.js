import styled from "styled-components";
import React from "react";

const Input = styled.input.attrs((props) => {
  type: "text";
})`
  width: 100%;
  border-radius: 3px;
  border: 1px solid black;
  padding: 0.75rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1.5rem;
  width: 100%;
  display: block;
`;

const FormInput = React.forwardRef((props, ref) => {
  return (
    <>
      <Label htmlFor={props.name}>{props.children}</Label>
      <Input
        ref={ref}
        id={props.name}
        name={props.name}
        type={props.type}
        accept={props.accept}
        required
        defaultValue={props.defaultValue}
      />
    </>
  );
});

export default FormInput;
