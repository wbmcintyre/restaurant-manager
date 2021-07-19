import FacebookSvg from "../Svgs/FacebookSvg";
import styled from "styled-components";
import Link from "next/link";

const StyledSvg = styled(FacebookSvg)`
  margin: 0 2rem;
  width: 4rem;
  color: #3b5998;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

function FacebookLink(props) {
  const { href, ...newProps } = props;
  return (
    <Link href={href}>
      <StyledSvg {...newProps} />
    </Link>
  );
}

export default FacebookLink;
