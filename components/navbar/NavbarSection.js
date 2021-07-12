import styled from "styled-components";

const NavbarSection = styled.nav`
  width: 100%;
  background-color: ${(props) => props.backgroundColor || "#fff"};
  color: ${(props) => props.inputColor || "#000"};
  transition: all 0.5s;
`;

export default NavbarSection;
