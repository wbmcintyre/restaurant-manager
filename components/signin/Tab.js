import styled from "styled-components";

const Button = styled.button.attrs((props) => ({
  className: props.className,
}))`
  font-size: 2rem;
  background: transparent;
  border-radius: ${(props) => props.borderRadius || "0px"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  color: ${(props) => props.color || "#000"};
  background-color: ${(props) => props.backgroundColor || "#fff"};
`;

// const Tab = (props) => {
//   return <Button className={props.className}>{props.children}</Button>;
// };

export default Button;
