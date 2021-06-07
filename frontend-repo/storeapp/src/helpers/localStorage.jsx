export const setUserInStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const loadUserFromStorage = () => {
  const userString = localStorage.getItem("user");
  // if item was found in localStorage => parse string into user object
  return userString && JSON.parse(userString);
};

export const clearUserInStorage = () => {
  localStorage.removeItem("user");
};

// cart
export const loadCartArrayFromStorage = () => {
  const cartString = localStorage.getItem("carts");
  return cartString ? JSON.parse(cartString) : [];
};

export const loadUserCart = (userId) => {
  const carts = this.loadCartArrayFromStorage();
  const userCart = carts.find((cart) => cart.userId === userId);
  return userCart;
};

export const setCartInStorage = (cart, userId) => {
  const carts = this.loadCartArrayFromStorage();
  const userCart = carts.find((cart) => cart.userId === userId);

  !userCart ? carts.push({ ...cart, userId }) : Object.assign(userCart, cart); // we override the existing cart
  localStorage.setItem("carts", JSON.stringify(carts));
};

export const deleteUserCart = (userId) => {
  const carts = this.loadCartArrayFromStorage();
  const remainingCarts = carts.filter((cart) => cart.userId !== userId);

  localStorage.setItem("carts", JSON.stringify(remainingCarts));
};
