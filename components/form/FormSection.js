import styled from "styled-components";

const FormSection = styled.form.attrs((props) => ({
  onSubmit: props.onSubmit,
}))`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  padding: ${(props) => props.padding || "0"};
`;

export default FormSection;
