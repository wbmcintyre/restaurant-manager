import Link from "next/link";
import styled from "styled-components";

const Anchor = styled.a.attrs((props) => {})`
  text-decoration: none;
  cursor: pointer;
  font: inherit;
  background-color: #03be9f;
  border: 1px solid #03be9f;
  border-radius: 6px;
  color: #dafff7;
  padding: 0.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  margin: ${(props) => props.margin || "0"};

  &:hover,
  &:active {
    background-color: #02afa1;
    border-color: #02afa1;
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
