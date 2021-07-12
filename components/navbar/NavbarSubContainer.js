import styled from "styled-components";

const NavbarSubContainer = styled.div`
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.inputColor || "#000"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NavbarSubContainer;
