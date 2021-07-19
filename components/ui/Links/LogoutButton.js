import styled from "styled-components";

const LogoutButton = styled.button.attrs((props) => {})`
  cursor: pointer;
  border: none;
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
`;

export default LogoutButton;
