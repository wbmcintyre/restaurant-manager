import { createContext, useState } from "react";

const UserContext = createContext({
  userId: null,
  cart: null,
  numItems: 0,
  signIn: function (userId) {},
  signOut: function () {},
  addItem: function (cartItem) {},
  removeItem: function (cartItem) {},
  assignCart: function (cart) {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([{}]);
  const [numItems, setNumItems] = useState(0);

  function addItem(cartItem) {
    setCart(cart.push(cartItem));
    setNumItems(numItems + cartItem.quantity);
  }

  function removeItem(cartItem) {
    //check for number of that item currently in the cart
    //get the difference (how many will remain)
    //if 0, remove item
    //if not, replace old item quantity with new item quantity
    setNumItems(numItems - cartItem.quantity);
  }

  function assignCart(newCart) {
    setCart(newCart);
  }

  function signIn(user) {
    setUser(user);
  }

  function signOut() {
    setUser(null);
  }

  const context = {
    user,
    cart,
    numItems,
    signIn,
    signOut,
    addItem,
    removeItem,
    assignCart,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
