import styled from "styled-components";
import PlusSvg from "../Svgs/PlusSvg";

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

function PlusButton(props) {
  return (
    <StyledButton {...props}>
      <PlusSvg fill={"#000"} height="1.2rem" width="1.2rem" />
    </StyledButton>
  );
}

export default PlusButton;
