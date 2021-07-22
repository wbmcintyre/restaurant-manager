import CartSvg from "../ui/Svgs/CartSvg";
import styled from "styled-components";
import Link from "next/link";

const CartContainer = styled.div`
  cursor: pointer;
  position: relative;
  margin: ${(props) => props.margin || "0"};

  &:after {
    content: ${(props) => props.content};
    font-size: 0.8rem;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    background-color: red;
    color: ${(props) => props.color || "#fff"};
    position: absolute;
    bottom: 0;
    right: 0;

    text-align: center;
  }
`;
const StyledCart = styled(CartSvg)``;

const CartLink = (props) => {
  const { href, ...newProps } = props;
  return (
    <CartContainer {...newProps}>
      <Link href={href}>
        <StyledCart width={props.width} height={props.height}></StyledCart>
      </Link>
    </CartContainer>
  );
};

export default CartLink;
