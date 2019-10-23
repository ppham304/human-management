import { put, takeLatest, all, call } from 'redux-saga/effects';

import * as usersAPI from '../api/users';
import * as UsersAction from '../actions/users';
import * as UsersType from '../types/users';

export function* watchGetListUser() {
	yield takeLatest(UsersType.GET_LIST_USER, getListUserSaga);
}

export function* getListUserSaga() {
	try {
		const response = yield call(usersAPI.getListUser);
		const { data } = response;
		yield put(UsersAction.getListUserSuccess(data));
	} catch (error) {
		yield put(UsersAction.getListUserFailed(error));
	}
}

export function* watchGetUserDetail() {
	yield takeLatest(UsersType.GET_USER_DETAIL, getUserDetailSaga);
}

export function* getUserDetailSaga(action) {
	try {
		const response = yield call(usersAPI.getUserDetail, action.payload.id);
		const { data } = response;
		yield put(UsersAction.getUserDetailSuccess(data));
	} catch (error) {
		yield put(UsersAction.getUserDetailFailed(error));
	}
}

export function* watchAddUser() {
	yield takeLatest(UsersType.ADD_USER, addUserSaga);
}

export function* addUserSaga(action) {
	try {
		const response = yield call(usersAPI.addUser, action.payload.data);
		const { data } = response;
		yield put(UsersAction.addUserSuccess(data));
	} catch (error) {
		yield put(UsersAction.addUserFailed(error));
	}
}

export function* watchUpdateUser() {
	yield takeLatest(UsersType.UPDATE_USER, updateUserSaga);
}

export function* updateUserSaga(action) {
	try {
		const response = yield call(usersAPI.updateUser, action.payload.id, action.payload.data);
		const { data } = response;
		yield put(UsersAction.updateUserSuccess(data));
	} catch (error) {
		yield put(UsersAction.updateUserFailed(error));
	}
}

export function* watchDeleteUser() {
	yield takeLatest(UsersType.DELETE_USER, deleteUserSaga);
}

export function* deleteUserSaga(action) {
	try {
		yield call(usersAPI.deleteUser, action.payload.id);
		yield put(UsersAction.deleteUserSuccess());
		yield call(getListUserSaga);
	} catch (error) {
		yield put(UsersAction.deleteUserFailed(error));
	}
}

export function* watchLogWork() {
	yield takeLatest(UsersType.LOG_WORK, logWorkSaga);
}

export function* logWorkSaga(action) {
	try {
		const response = yield call(usersAPI.logWork, action.payload.id, action.payload.data);
		const { data } = response;
		yield put(UsersAction.logWorkSuccess(data));
	} catch (error) {
		yield put(UsersAction.logWorkFailed(error));
	}
}

export default function* Saga() {
	yield all([
		watchGetListUser(),
		watchGetUserDetail(),
		watchUpdateUser(),
		watchAddUser(),
		watchDeleteUser(),
		watchLogWork(),
	]);
}
