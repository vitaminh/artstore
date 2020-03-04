import { RETRIEVED_CART } from '../constants'

// Initial State
const initialCartState = {
  loaded: false,
  cart: {}
};

// Action Creators
export const retrievedCart = cart => ({
  type: RETRIEVED_CART,
  cart
});

// Reducer
const cartReducer = (cart = initialCartState, action) => {
  switch (action.type) {
    case RETRIEVED_CART:
      return {
        loaded: true,
        cart: action.cart
      }
    default:
      return cart;
  }
}

export default cartReducer;