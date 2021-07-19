import Link from "next/link";
import styled from "styled-components";

const Anchor = styled.a.attrs((props) => {})`
  text-decoration: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
  padding: 0.5rem 1.5rem;
  text-align: center;
  margin: ${(props) => props.margin || "0rem"};

  &:hover,
  &:active {
    color: red;
  }
}`;

function StyledLink(props) {
  return (
    <Link href={props.href} passHref>
      <Anchor {...props}>{props.children}</Anchor>
    </Link>
  );
}

export default StyledLink;
