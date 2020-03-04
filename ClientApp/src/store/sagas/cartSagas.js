import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { FETCH_CART, ADD_TO_CART } from '../constants';
import { retrievedCart } from '../reducers/cartReducer';

// Sagas

export function* fetchCart() {
  const response = yield call(async () => await axios.get('/api/cart'));
  const cart = response.data;
  yield put(retrievedCart(cart));
}

export function* addToCart() {
  const item = {
    itemId: 1,
    quantity: 10
  };
  const response = yield call(async () => await axios.post('/api/cart', item));
  const cart = response.data;
  yield put(retrievedCart(cart));
}

export function* watchFetchCart() {
  yield takeEvery(FETCH_CART, fetchCart);
}

export function* watchAddToCart() {
  yield takeEvery(ADD_TO_CART, addToCart)
}