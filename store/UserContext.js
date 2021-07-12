import { createContext, useState } from "react";

const UserContext = createContext({
  userId: null,
  numItems: 0,
  signIn: function (userId) {},
  signOut: function () {},
  addItem: function (cartItem) {},
  removeItem: function (cartItem) {},
});

export function UserContextProvider() {
  const [userId, setUserId] = useState();
  const [cart, setCart] = useState([{}]);
  const [numItems, setNumItems] = useState(0);

  function addItem(cartItem) {}

  function removeItem(cartItem) {}

  function signIn(userId) {
    setUserId(userId);
  }

  function signOut() {
    setUserId(null);
  }

  const context = {
    userId,
    numItems,
    signIn,
    signOut,
    addItem,
    removeItem,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
