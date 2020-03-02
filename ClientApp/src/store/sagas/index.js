import { all } from 'redux-saga/effects';

import { fetchAllArtwork, watchFetchAllArtwork } from './artworkSagas';

export default function* rootSaga() {
  yield all([
    fetchAllArtwork(),
    watchFetchAllArtwork()
  ])
}