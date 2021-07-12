import styled from "styled-components";

const Footer = styled.footer`
  width: 100%;
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "2rem 0 1rem 0"};
  border: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Footer;
