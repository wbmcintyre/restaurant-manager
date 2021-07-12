import styled from "styled-components";
import Link from "next/link";

const Anchor = styled.a.attrs((props) => {})`
  text-decoration: none;
  cursor: pointer;
  font-size: ${(props) =>
    props.proportion ? `${props.proportion}` + "rem" : "2rem"};
  font-weight: 700;
  background: transparent;
  vertical-align: middle;
  border-radius: 0.3rem;
  border: 0.2rem solid #000;
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) =>
    props.proportion
      ? `${props.proportion / 5}` +
        "rem " +
        `${props.proportion / 1.66}` +
        "rem"
      : ".2rem 1.2rem"};
  color: ${(props) => props.color || "#000"};
  background-color: ${(props) => props.backgroundColor || "#f0484b"};
  transition: all 0.3s;

  &:hover {
    color: ${(props) => props.backgroundColor || "#000"};
    background-color: ${(props) => props.color || "#f70a0e"};
  }
`;

function OrderNowLink(props) {
  return (
    <Link href={props.href} passHref>
      <Anchor {...props}>{props.children}</Anchor>
    </Link>
  );
}

export default OrderNowLink;
