import NavbarSection from "./NavbarSection";
import NavbarContainer from "./NavbarContainer";
import NavbarSubContainer from "./NavbarSubContainer";
import LogoLink from "../ui/Links/LogoLink";
import OrderNowButton from "../ui/Links/OrderNowLink";
import SignInLink from "../ui/Links/SignInLink";
import LogoutButton from "../ui/Links/LogoutButton";
import Cart from "../cart/CartSvg";
import { useEffect, useContext } from "react";
import UserContext from "../../store/UserContext";

function Navbar(props) {
  const context = useContext(UserContext);
  console.log(context);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/auth/verify", {
        method: "POST",
      });
      const data = await response.json();

      if (data?.user) {
        context.signIn(data.user);
        context.assignCart(data.user.cart);
      } else {
        const localCart = window.localStorage.getItem("cart");
        if (localCart) {
          context.assignCart(localCart);
        }
      }
    })();

    return async function cleanup() {
      console.log("unmounting");
      console.log(context);
      if (context.user?.id) {
        try {
          //update the cart through /users/[id]
          await fetch(`/api/v1/users/${context.user.id}`, {
            method: "PATCH",
            body: JSON.stringify({ cart: context.cart }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (err) {
          window.localStorage.setItem("cart", context.cart);
        }
      } else {
        window.localStorage.setItem("cart", context.cart);
      }
    };
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
    if (context.user?.id) {
      return (
        <LogoutButton
          proportion="1.5"
          margin="1rem 2rem"
          color="#000"
          backgroundColor="#f0ee5f"
          onClick={logout}
        >
          Logout
        </LogoutButton>
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
          {renderButtons()}
        </NavbarSubContainer>
      </NavbarContainer>
    </NavbarSection>
  );
}

export default Navbar;
