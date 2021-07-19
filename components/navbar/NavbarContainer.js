import styled from "styled-components";

const NavbarSection = styled.div`
  width: 100%;
  height: 6rem;
  background-color: ${(props) => props.backgroundColor || "#000"};
  color: ${(props) => props.inputColor || "#fff"};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.75s;
`;

export default NavbarSection;
