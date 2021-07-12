import styled from "styled-components";

const FormError = styled.p`
  font-size: 1.5rem;
  color: red;
  text-align: center;
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
`;

export default FormError;
