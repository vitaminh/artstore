import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

class AllArtists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      loading: true,
      error: {}
    }
  }

  async componentDidMount() {
    // Fetch artist data

    try {
      const response = await axios.get(`/api/artists`);
      this.setState({
        ...this.state,
        artists: response.data,
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

    const artists = this.state.artists.map((artist, key) => {
      return <p key={key}>{`${artist.firstName} ${artist.lastName}`}</p>
    });

    if (this.state.error.message) {
      return (<p>{`${this.state.error.message}`}</p>)
    }

    return (
      <div>
        {artists}
      </div>
    )
  }
}

export default withRouter(AllArtists);