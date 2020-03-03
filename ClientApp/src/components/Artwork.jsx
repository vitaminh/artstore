import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

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
      </div>
    )
  }
}

export default withRouter(Artwork);