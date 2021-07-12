import styled from "styled-components";

const MenuListingsSection = styled.h4`
  display: grid;
  justify-content: start;
  align-items: center;
  padding: 0;
  overflow-x: scroll;
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  width: ${(props) => props.width || "100%"};
`;

export default MenuListingsSection;
