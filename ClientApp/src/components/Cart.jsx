import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'reactstrap';

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

    let totalPrice = 0;
    let items = this.props.cart.cart.items.map((item) => {
      const currentTotalPrice = item.quantity * item.price;
      totalPrice += currentTotalPrice;
      return (
        <tr key={item.itemId}>
          <td>{item.title}</td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
          <td>{item.quantity * item.price}</td>
        </tr>
      )})

    if (items.length <= 0) {
      items = [
        (
          <tr>
            <th colSpan={4}>Cart is Empty</th>
          </tr>
        )
      ]
    }

    return (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {items}
            <tr>
              <td></td>
              <td></td>
              <th>Total</th>
              <th>{totalPrice}</th>
            </tr>
          </tbody>
        </Table>
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