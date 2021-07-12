import WrapperContainer from "../../components/ui/containers/WrapperContainer";
import OrderNowLink from "../../components/ui/OrderNowLink";

export default function VerifiedPage() {
  return (
    <WrapperContainer>
      <WrapperContainer direction="column" align="center">
        <h1>Your account has been verified!</h1>
        <p>
          Thank you for setting up an account. Please feel free to browse our
          menu.
        </p>
        <OrderNowLink margin="2rem 0 0 0" href="/menu">
          Menu
        </OrderNowLink>
      </WrapperContainer>
    </WrapperContainer>
  );
}
