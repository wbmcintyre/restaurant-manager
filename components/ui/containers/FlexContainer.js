import styled from "styled-components";

const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${(props) =>
    props.direction === "column" ? "column" : "row"};
  align-items: ${(props) => (props.align === "center" ? "center" : "stretch")};
  padding: ${(props) => props.padding || "0"};
`;

export default WrapperDiv;
