import InstagramSvg from "../Svgs/InstagramSvg";
import styled from "styled-components";
import Link from "next/link";

const StyledSvg = styled(InstagramSvg)`
  margin: 0 2rem;
  width: 4rem;
  color: #f58529;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

function InstagramLink(props) {
  const { href, ...newProps } = props;
  return (
    <Link href={href}>
      <StyledSvg {...newProps} />
    </Link>
  );
}

export default InstagramLink;
