import styled from "styled-components";

const TabsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #000;
    cursor: pointer;
  }

  & > *:not(:last-child) {
    border-right: 1px solid #000;
  }
`;

export default TabsSection;
