import { createContext, useState, useEffect } from "react";

const UserContext = createContext({
  userId: null,
  cart: [],
  getNumItems: function () {},
  signIn: function (userId) {},
  signOut: function () {},
  addItem: function (cartItem) {},
  setItemQuantity: function (cartItem) {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({}); //Dictionary by Item Id

  //don't call useEffect on mount, only on update
  const [isFirstCartRender, setFirstCartRender] = useState(true);
  const [isFirstUserRender, setFirstUserRender] = useState(true);

  useEffect(() => {
    if (isFirstUserRender) {
      setFirstUserRender(false);
    } else {
      setupCart();
    }
  }, [user]);

  useEffect(() => {
    if (isFirstCartRender) {
      setFirstCartRender(false);
    } else {
      updateStorage();
    }
  }, [cart]);

  function addItem(item, quantity) {
    let totalQuantity = +quantity;
    if (cart[item._id]) {
      totalQuantity = +quantity + cart[item._id].quantity;
    }
    setCart({ ...cart, [item._id]: { ...item, quantity: totalQuantity } });
  }

  function setItemQuantity(item, quantity) {
    if (!quantity) {
      delete cart[item._id];
      setCart({ ...cart });
    } else {
      setCart({ ...cart, [item._id]: { ...item, quantity } });
    }
  }

  async function updateStorage() {
    //either save information to database or local storage
    if (user?.id) {
      try {
        console.log(cart);
        await fetch(`/api/v1/users/${user.id}`, {
          method: "PATCH",
          body: JSON.stringify({ cart: cart }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("updating db", cart);
      } catch (err) {
        window.localStorage.setItem("cart", JSON.stringify(cart));
        console.log("updating localErr", cart);
      }
    } else {
      window.localStorage.setItem("cart", JSON.stringify(cart));
      console.log("updating local", cart);
    }
  }

  //user signs in... if localstorage && user's cart is empty, update to be equal to local storage and empty local storage
  // ... if user's cart isn't empty, update cart to user's cart
  async function setupCart() {
    const localCart = JSON.parse(window.localStorage.getItem("cart"));

    if (user?.cart && user?.id) {
      //if there is a local cart, and the user's cart is empty, update user's cart with local storage
      if (
        Object.keys(localCart).length > 0 &&
        Object.keys(user?.cart).length === 0
      ) {
        setCart(localCart);
        window.localStorage.setItem("cart", JSON.stringify({}));
      } else {
        setCart(user.cart);
        console.log("db", user.cart);
      }
    } else {
      if (Object.keys(localCart).length > 0) {
        setCart(localCart);
        console.log("local", localCart);
      }
    }
  }

  function getNumItems() {
    return Object.keys(cart).length;
  }

  function signIn(user) {
    //move local storage information to user's cart and update in db
    setUser(user);
  }

  async function signOut() {
    setUser(null);
  }

  const context = {
    user,
    cart,
    getNumItems,
    signIn,
    signOut,
    addItem,
    setItemQuantity,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
