import styled from "styled-components";

const MenuCategorySection = styled.h4`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0;
  overflow-x: scroll;
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  width: ${(props) => props.width || "100%"};

  & > * {
    width: 100%;
  }
`;

export default MenuCategorySection;
