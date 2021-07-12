import styled from "styled-components";
import Link from "next/link";

const Image = styled.img.attrs((props) => {})`
  max-width: 100%;
  max-height: 100%;
`;

const ImageContainer = styled.div`
  margin: ${(props) => props.margin || "0"};
  height: 3rem;
  cursor: pointer;
`;

function LogoLink(props) {
  return (
    <Link href={props.href || "/"} passHref>
      <ImageContainer {...props}>
        <Image alt={props.alt} {...props}></Image>
      </ImageContainer>
    </Link>
  );
}

export default LogoLink;
