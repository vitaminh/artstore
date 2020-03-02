import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import store, { FETCH_ALL_ARTWORK } from '../store';

class Artwork extends React.Component {
  componentDidMount() {
    if (!this.props.artwork.loaded) {
      store.dispatch({type: FETCH_ALL_ARTWORK})
    }
  }

  render() {
    if (!this.props.artwork.loaded) {
      return <div>Loading Artwork...</div>
    }

    return (
      <div>
        <p>{this.props.artwork.artwork[0].title}</p>
      </div>
    )
  }
}

const mapState = state => ({
  artwork: state.artwork
});

const ArtworkContainer = connect(
  mapState
)(Artwork);

export default withRouter(ArtworkContainer);