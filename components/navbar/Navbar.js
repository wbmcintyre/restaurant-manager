import NavbarSection from "./NavbarSection";
import NavbarContainer from "./NavbarContainer";
import NavbarSubContainer from "./NavbarSubContainer";
import LogoLink from "../ui/Links/LogoLink";
import OrderNowButton from "../ui/Links/OrderNowLink";
import SignInLink from "../ui/Links/SignInLink";
import LogoutButton from "../ui/Links/LogoutButton";
import UserImage from "../account/UserImage";
import Link from "next/link";
import CartLink from "./CartLink";
import { useEffect, useContext, useState } from "react";
import UserContext from "../../store/UserContext";

function Navbar() {
  const context = useContext(UserContext);
  const [isUserSetup, setIsUserSetup] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/auth/verify", {
        method: "POST",
      });
      const data = await response.json();

      if (data?.user) {
        context.signIn(data.user);
      } else {
        context.signOut();
      }
      setIsUserSetup(true);
    })();
  }, []);

  const logout = async () => {
    try {
      context.signOut();
      await fetch("/api/v1/auth/logout");
    } catch (err) {
      console.log("Unable to sign you out");
    }
  };

  const renderButtons = () => {
    if (isUserSetup) {
      if (context.user?._id) {
        return (
          <>
            <Link href="/account">
              <UserImage
                height="4rem"
                width="4rem"
                margin="0 0 0 2rem"
                cursor="pointer"
                src={`${context.user.image}?${new Date().getTime()}`}
                alt="Profile Image"
              />
            </Link>

            <LogoutButton
              proportion="1.5"
              margin="1rem 2rem"
              color="#000"
              backgroundColor="#f0ee5f"
              onClick={logout}
            >
              Logout
            </LogoutButton>
          </>
        );
      } else {
        return (
          <SignInLink
            proportion="1.5"
            margin="1rem 2rem"
            color="#000"
            backgroundColor="#f0ee5f"
            href="/signin"
          >
            Sign In
          </SignInLink>
        );
      }
    }
  };

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
          <CartLink
            href="/checkout"
            height="4rem"
            width="4rem"
            margin="0 0 0 2rem"
          />
          {renderButtons()}
        </NavbarSubContainer>
      </NavbarContainer>
    </NavbarSection>
  );
}

export default Navbar;
