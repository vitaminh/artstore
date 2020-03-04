import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import store, { FETCH_CART } from '../store';

class Cart extends React.Component {
  componentDidMount() {
    store.dispatch({type: FETCH_CART});
  }

  render() {
    if (!this.props.cart.loaded) {
      return <div>Loading Cart...</div>
    }

    const items = this.props.cart.cart.items.map((item) =>
      <li key={item.itemId}>{item.title}, {item.quantity}</li>
    );

    return (
      <div>
        <ul>
          {items}
        </ul>
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