import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

import store, { ADD_TO_CART } from '../store';

class Artwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artwork: {},
      loading: true,
      error: {}
    }
  }

  async componentDidMount() {
    // Fetch artist data
    const artworkId = this.props.match.params.id;

    try {
      const response = await axios.get(`/api/artwork/${artworkId}`);
      this.setState({
        ...this.state,
        artwork: response.data,
        loading: false
      });
    } catch (e) {
      this.setState({
        ...this.state,
        error: e,
        loading: false
      })
    }
  }

  addToCart = () => {
    store.dispatch({
      type: ADD_TO_CART,
      itemId: this.props.match.params.id,
      title: this.state.artwork.title,
      quantity: 1
    })
  }

  render() {

    if (this.state.loading) {
      return (<p>Loading...</p>)
    }

    const artwork = this.state.artwork;

    if (!artwork.title) {
      return (<p>{`${this.state.error.message}`}</p>)
    }

    return (
      <div>
        <p>{`${artwork.title}`}</p>
        <button onClick={this.addToCart}>
          Add to Cart
        </button>
      </div>
    )
  }
}

export default withRouter(Artwork);