import * as UsersType from '../types/users';

export function getListUser() {
	return {
		type: UsersType.GET_LIST_USER,
	}
}

export function getListUserSuccess(data) {
	return {
		type: UsersType.GET_LIST_USER_SUCCESS,
		payload: {
			data: data,
		},
	}
}

export function getListUserFailed(error) {
	return {
		type: UsersType.GET_LIST_USER_FAILED,
		payload: {
			error: error,
		},
	}
}

export function getUserDetail(id) {
	return {
		type: UsersType.GET_USER_DETAIL,
		payload: {
			id: id,
		},
	}
}

export function getUserDetailSuccess(data) {
	return {
		type: UsersType.GET_USER_DETAIL_SUCCESS,
		payload: {
			data: data,
		},
	}
}

export function getUserDetailFailed(error) {
	return {
		type: UsersType.GET_USER_DETAIL_FAILED,
		payload: {
			error: error,
		},
	}
}

export function addUser(data) {
	return {
		type: UsersType.ADD_USER,
		payload: {
			data: data,
		},
	}
}

export function addUserSuccess(data) {
	return {
		type: UsersType.ADD_USER_SUCCESS,
		payload: {
			data: data,
		},
	}
}

export function addUserFailed(error) {
	return {
		type: UsersType.ADD_USER_FAILED,
		payload: {
			error: error,
		},
	}
}

export function updateUser(id, data) {
	return {
		type: UsersType.UPDATE_USER,
		payload: {
			id: id,
			data: data,
		},
	}
}

export function updateUserSuccess(data) {
	return {
		type: UsersType.UPDATE_USER_SUCCESS,
		payload: {
			data: data,
		},
	}
}

export function updateUserFailed(error) {
	return {
		type: UsersType.UPDATE_USER_FAILED,
		payload: {
			error: error,
		},
	}
}

export function deleteUser(id) {
	return {
		type: UsersType.DELETE_USER,
		payload: {
			id: id,
		},
	}
}

export function deleteUserSuccess() {
	return {
		type: UsersType.DELETE_USER_SUCCESS,
	}
}

export function deleteUserFailed(error) {
	return {
		type: UsersType.DELETE_USER_FAILED,
		payload: {
			error: error,
		},
	}
}

export function addAddress(data) {
	return {
		type: UsersType.ADD_ADDRESS,
		payload: {
			data: data,
		},
	}
}

export function deleteAddress(index) {
	return {
		type: UsersType.DELETE_ADDRESS,
		payload: {
			index: index,
		},
	}
}

export function addPhoneNumber(data) {
	return {
		type: UsersType.ADD_PHONE_NUMBER,
		payload: {
			data: data,
		},
	}
}

export function deletePhoneNumber(index) {
	return {
		type: UsersType.DELETE_PHONE_NUMBER,
		payload: {
			index: index,
		},
	}
}

export function addEmail(data) {
	return {
		type: UsersType.ADD_EMAIL,
		payload: {
			data: data,
		},
	}
}

export function deleteEmail(index) {
	return {
		type: UsersType.DELETE_EMAIL,
		payload: {
			index: index,
		},
	}
}

export function searchUsers(value) {
	return {
		type: UsersType.SEARCH_USERS,
		payload: {
			value: value,
		},
	}
}

export function logWork(id, data) {
	return {
		type: UsersType.LOG_WORK,
		payload: {
			id: id,
			data: data,
		},
	}
}

export function logWorkSuccess(data) {
	return {
		type: UsersType.LOG_WORK_SUCCESS,
		payload: {
			data: data,
		},
	}
}

export function logWorkFailed(error) {
	return {
		type: UsersType.LOG_WORK_FAILED,
		payload: {
			error: error,
		},
	}
}

export function getDisplayLogWork() {
	return {
		type: UsersType.DISPLAY_LOG_WORK,
	}
}

export function getDisplayAddUser() {
	return {
		type: UsersType.DISPLAY_ADD_USER,
	}
}

export function getDisplayUpdateUser() {
	return {
		type: UsersType.DISPLAY_UPDATE_USER,
	}
}

export function getCloseUpdateUser() {
	return {
		type: UsersType.CLOSE_UPDATE_USER,
	}
}

export function getCloseForm() {
	return {
		type: UsersType.CLOSE_FORM,
	}
}
