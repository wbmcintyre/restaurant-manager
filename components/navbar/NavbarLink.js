import styled from "styled-components";
import Link from "next/link";

const Anchor = styled.a`
  position: relative;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1rem 0;
  margin: ${(props) => props.margin || "0 2rem"};
  color: ${(props) => props.color || "#000"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: 0%;
    left: 0%;
    width: 100%;
    height: 0;
    background-color: rgb(241, 239, 64);
    transition: all 0.25s;
  }

  &:hover,
  &:focus {
    color: rgb(241, 239, 64);

    &::after {
      height: 0.3rem;
    }
  }
`;

const NavbarLink = (props) => {
  return (
    <Link href={props.href} passHref>
      <Anchor {...props}>{props.children}</Anchor>
    </Link>
  );
};

export default NavbarLink;
