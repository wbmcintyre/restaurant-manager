import styled from "styled-components";

const Button = styled.button.attrs((props) => {})`
  font-size: ${(props) =>
    props.proportion ? `${props.proportion}` + "rem" : "2rem"};
  font-weight: 700;
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) =>
    props.proportion
      ? `${props.proportion / 2}` + "rem " + `${props.proportion}` + "rem"
      : "1rem 2rem"};
  border-radius: 100px;
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.backgroundColor || "#000"};
  border: none;
  transition: all 0.5s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 7px 8px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export default Button;
