import styled from "styled-components";

const MenuListingsSection = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, 1fr);
  padding: 0;
  width: ${(props) => props.width || "100%"};
`;

export default MenuListingsSection;
