import OrderNowButton from "../components/ui/Links/OrderNowLink";
import ButtonRound from "../components/ui/Links/ButtonRound";
import ButtonSquare from "../components/ui/Links/ButtonSquare";
import StyledLink from "../components/ui/Links/StyledLink";
import WrapperContainer from "../components/ui/containers/FlexContainer";

export default function Home() {
  return (
    <>
      <WrapperContainer align="center" direction="column" padding="0">
        <StyledLink margin="0 0 2rem 0" href="/hello">
          Link
        </StyledLink>
        <OrderNowButton proportion="1.5" href="/menu">
          Order Now
        </OrderNowButton>
        <ButtonSquare margin="2rem 0 0 0">Button</ButtonSquare>
        <ButtonRound margin="2rem 0 0 0">Button2</ButtonRound>
      </WrapperContainer>
    </>
  );
}
