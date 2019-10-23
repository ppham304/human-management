export const getListUser = (state) => {
	return state.users.listUser;
}

export const getUserDetail = (state) => {
	return state.users.userDetail;
}

export const getIsGettingListUser = (state) => {
	return state.users.isGettingListUser;
}

export const getIsGettingUserDetail = (state) => {
	return state.users.isGettingUserDetail;
}

export const getIsAddingUser = (state) => {
	return state.users.isAddingUser;
}

export const getIsUpdatingUser = (state) => {
	return state.users.isUpdatingUser;
}

export const getIsDeletingUser = (state) => {
	return state.users.isDeletingUser;
}

export const getSearchValue = (state) => {
	return state.users.searchValue;
}

export const getAction = (state) => {
	return state.users.action;
}

export const getError = (state) => {
	return state.users.listError;
}
