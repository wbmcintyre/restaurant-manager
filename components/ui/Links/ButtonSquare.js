import styled from "styled-components";

const Button = styled.button.attrs((props) => {})`
  font-size: ${(props) =>
    props.proportion ? `${props.proportion}` + "rem" : "2rem"};
  font-weight: 700;
  background: transparent;
  border-radius: 0.3rem;
  border: 0.2rem solid ${(props) => props.color || "#000"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) =>
    props.proportion
      ? `${props.proportion / 5}` +
        "rem " +
        `${props.proportion / 1.66}` +
        "rem"
      : ".4rem 1.2rem"};
  color: ${(props) => props.color || "#000"};
  background-color: ${(props) => props.backgroundColor || "#fff"};
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.backgroundColor || "#fff"};
    background-color: ${(props) => props.color || "#000"};
  }
`;

export default Button;
