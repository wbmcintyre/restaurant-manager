import NavbarSection from "./NavbarSection";
import NavbarContainer from "./NavbarContainer";
import NavbarSubContainer from "./NavbarSubContainer";
import LogoLink from "../ui/Links/LogoLink";
import OrderNowButton from "../ui/Links/OrderNowLink";
import SignInLink from "../ui/Links/SignInLink";
import Cart from "../cart/CartSvg";
import { useState, useEffect } from "react";
import UserContext from "../../store/UserContext";

function Navbar(props) {
  const [isSignedIn, setSignedIn] = useState(false);

  // useEffect(() => {
  //   //check for jwt, then validate and sign in user, set signed in state
  // }, []);

  return (
    <NavbarSection>
      <NavbarContainer backgroundColor="#a3393b" color="#000">
        <NavbarSubContainer>
          <LogoLink
            src="/Logo-RM.png"
            alt="Restaurant Manager Logo"
            margin="0 0 0 3rem"
          ></LogoLink>
        </NavbarSubContainer>

        <NavbarSubContainer>
          <OrderNowButton href="/menu" proportion="1.5">
            Order Now
          </OrderNowButton>
          <SignInLink
            proportion="1.5"
            margin="1rem 2rem"
            color="#000"
            backgroundColor="#f0ee5f"
            href="/signin"
          >
            Sign In
          </SignInLink>
        </NavbarSubContainer>
      </NavbarContainer>
    </NavbarSection>
  );
}

export default Navbar;
