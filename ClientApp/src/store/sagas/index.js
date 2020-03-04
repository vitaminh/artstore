import { all } from 'redux-saga/effects';

import { watchFetchAllArtwork } from './artworkSagas';
import { watchAddToCart, watchFetchCart } from './cartSagas';

export default function* rootSaga() {
  yield all([
    watchAddToCart(),
    watchFetchAllArtwork(),
    watchFetchCart()
  ])
}