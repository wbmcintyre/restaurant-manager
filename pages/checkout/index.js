import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/UserContext";
import FlexContainer from "../../components/ui/containers/FlexContainer";
import BorderedColumnContainer from "../../components/ui/containers/BorderedColumnContainer";
import CheckoutItem from "../../components/checkout/CheckoutItem";
//import MenuListingsSection from "../../components/menu/MenuListingsSection";

export default function CheckoutPage(props) {
  //have all items and quantities in cart... so just use context
  const context = useContext(UserContext);

  //container of items listed in column... at bottom will be total, address, and Submit Order button that will call stripe
  // (fill in address if user has one, if user.address is empty, update it in the database)

  //display item image, name, price, quantity

  const renderItems = () => {
    return Object.keys(context.cart).map((key) => {
      const item = context.cart[key];

      return (
        <CheckoutItem
          item={item}
          key={item._id}
          // submitItem={item.addItemToCart}
        />
      );
    });
  };

  return (
    <FlexContainer>
      <BorderedColumnContainer width="90%">
        {renderItems()}
      </BorderedColumnContainer>
    </FlexContainer>
  );
}
