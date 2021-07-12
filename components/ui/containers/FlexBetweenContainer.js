import styled from "styled-components";

const WrapperDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: ${(props) => props.padding || "0"};
`;

export default WrapperDiv;
