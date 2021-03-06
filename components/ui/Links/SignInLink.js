import styled from "styled-components";
import Link from "next/link";

const Anchor = styled.a.attrs((props) => {})`
  text-decoration: none;
  cursor: pointer;
  font-size: ${(props) =>
    props.proportion ? `${props.proportion}` + "rem" : "2rem"};
  font-weight: 700;
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) =>
    props.proportion
      ? `${props.proportion / 2}` + "rem " + `${props.proportion}` + "rem"
      : "1rem 2rem"};
  border-radius: 100px;
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.backgroundColor || "#000"};
  border: none;
`;

function SignInLink(props) {
  return (
    <Link href={props.href} passHref>
      <Anchor {...props}>{props.children}</Anchor>
    </Link>
  );
}

export default SignInLink;
