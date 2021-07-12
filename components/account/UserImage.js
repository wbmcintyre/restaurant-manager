import styled from "styled-components";

const UserImage = styled.img`
  height: ${(props) => props.height || "7.5rem"};
  width: ${(props) => props.width || "7.5rem"};
  border-radius: 100%;
  margin: ${(props) => props.margin || "0"};
`;

export default UserImage;
