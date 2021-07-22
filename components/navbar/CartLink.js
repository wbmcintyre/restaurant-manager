import CartSvg from "../ui/Svgs/CartSvg";
import styled from "styled-components";
import Link from "next/link";

const StyledCart = styled(CartSvg)`
  cursor: pointer;
  margin: ${(props) => props.margin || "0"};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: green;
  }
`;

const CartLink = (props) => {
  const { href, ...newProps } = props;
  return (
    <Link href={href}>
      <StyledCart {...newProps} />
    </Link>
  );
};

export default CartLink;
