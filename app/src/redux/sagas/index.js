import { all } from 'redux-saga/effects'

import UsersSaga from './users';


export default function* rootSaga() {
	yield all([
		UsersSaga(),
	])
}