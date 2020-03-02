import { RETRIEVED_ALL_ARTWORK } from '../constants'

// Initial State
const initialArtworkState = {
  loaded: false,
  artwork: []
};

// Action Creators
export const retrievedArtwork = artwork => ({
  type: RETRIEVED_ALL_ARTWORK,
  artwork
});

// Reducer
const artworkReducer = (artwork = initialArtworkState, action) => {
  switch (action.type) {
    case RETRIEVED_ALL_ARTWORK:
      return {
        loaded: true,
        artwork: action.artwork
      }
    default:
      return artwork;
  }
}

export default artworkReducer;