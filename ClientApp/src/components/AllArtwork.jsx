import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import store, { FETCH_ALL_ARTWORK } from '../store';

class AllArtwork extends React.Component {
  componentDidMount() {
    if (!this.props.artwork.loaded) {
      store.dispatch({type: FETCH_ALL_ARTWORK})
    }
  }

  render() {
    if (!this.props.artwork.loaded) {
      return <div>Loading Artwork...</div>
    }

    const artwork = this.props.artwork.artwork;

    return (
      <div>
        <ul>
          {artwork.map(art => {
            return (
              <li key={art.id}>{art.title} - {art.artist.firstName} {art.artist.lastName}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => ({
  artwork: state.artwork
});

const AllArtworkContainer = connect(
  mapState
)(AllArtwork);

export default withRouter(AllArtworkContainer);