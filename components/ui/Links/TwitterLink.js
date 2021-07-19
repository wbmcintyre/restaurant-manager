import TwitterSvg from "../Svgs/TwitterSvg";
import styled from "styled-components";
import Link from "next/link";

const StyledSvg = styled(TwitterSvg)`
  margin: 0 2rem;
  width: 4rem;
  color: #08a0e9;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

function TwitterLink(props) {
  const { href, ...newProps } = props;
  return (
    <Link href={href}>
      <StyledSvg {...newProps} />
    </Link>
  );
}

export default TwitterLink;
