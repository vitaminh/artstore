import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      loading: true,
      error: {}
    }
  }

  async componentDidMount() {
    // Fetch artist data
    const artistId = this.props.match.params.id;

    try {
      const response = await axios.get(`/api/artists/${artistId}`);
      this.setState({
        ...this.state,
        artist: response.data,
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

    const artist = this.state.artist;

    if (!artist.firstName) {
      return (<p>{`${this.state.error.message}`}</p>)
    }

    return (
      <div>
        <p>{`${artist.firstName} ${artist.lastName}`}</p>
      </div>
    )
  }
}

export default withRouter(Artist);