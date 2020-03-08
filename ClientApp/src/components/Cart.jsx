import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import store, { FETCH_CART } from '../store';

const fetchCartAction = {
  type: FETCH_CART
}

class Cart extends React.Component {
  componentDidMount() {
    store.dispatch(fetchCartAction);
  }

  checkout = async () => {
    await axios.delete('/api/cart');
    store.dispatch(fetchCartAction);
  }

  render() {
    if (!this.props.cart.loaded) {
      return <div>Loading Cart...</div>
    }

    const items = this.props.cart.cart.items.map((item) =>
      <li key={item.itemId}>
        <p>Title: {item.title}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Total Cost: {item.quantity * item.price}</p>
      </li>
    );

    return (
      <div>
        <ul>
          {items}
        </ul>
        <button onClick={this.checkout}>
          Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
});

const CartContainer = connect(
  mapState
)(Cart);

export default withRouter(CartContainer);