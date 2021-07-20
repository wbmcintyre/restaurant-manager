import styled from "styled-components";

const MenuCategorySection = styled.div`
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

  &::-webkit-scrollbar {
      width: 1rem;
      height: 1rem;

      &-track {
        background-color: transparent;
      }

      &-thumb {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

export default MenuCategorySection;
