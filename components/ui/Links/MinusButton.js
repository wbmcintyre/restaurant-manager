import styled from "styled-components";
import MinusSvg from "../Svgs/MinusSvg";

const StyledButton = styled.button`
  background-color: #aaa;
  border: none;
  border-radius: 100%;
  margin: 1rem;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MinusButton(props) {
  return (
    <StyledButton {...props}>
      <MinusSvg fill={"#000"} height="1.2rem" width="1.2rem" />
    </StyledButton>
  );
}

export default MinusButton;
