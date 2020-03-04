import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { FETCH_ALL_ARTWORK } from '../constants';
import { retrievedArtwork } from '../reducers/artworkReducer';

// Sagas

export function* fetchAllArtwork() {
  const response = yield call(async() => await axios.get('/api/artwork'));
  console.log(response);
  const artwork = response.data;
  yield put(retrievedArtwork(artwork));
}

export function* watchFetchAllArtwork() {
  yield takeEvery(FETCH_ALL_ARTWORK, fetchAllArtwork);
}