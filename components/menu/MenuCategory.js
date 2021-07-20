import styled from "styled-components";

const MenuCategory = styled.button`
  border: none;
  color: ${(props) => (props.isSelected ? "red" : "blue")};
  cursor: pointer;
  background-color: inherit;
  font-size: 2rem;
  text-align: center;
  margin: ${(props) => props.margin || "1rem"};
  padding: ${(props) => props.padding || "0"};

  &:hover {
    color: blue;
  }
`;

export default MenuCategory;
