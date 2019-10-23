import * as UsersType from '../types/users';

const initState = {
	listUser: [],
	userDetail: {},
	isGettingListUser: false,
	isGettingUserDetail: false,
	isAddingUser: false,
	isUpdatingUser: false,
	isDeletingUser: false,
	isLoggingWork: false,
	action: '',
	searchValue: '',
	error: '',
}

function UsersReducer(state = initState, action) {
	switch(action.type) {
		case UsersType.GET_LIST_USER:
			return {
				...state,
				isGettingListUser: true,
				error: '',
			}
		case UsersType.GET_LIST_USER_SUCCESS:
			return {
				...state,
				listUser: action.payload.data,
				isGettingListUser: false,
			}
		case UsersType.GET_LIST_USER_FAILED:
			return {
				...state,
				isGettingListUser: false,
				error: action.payload.error,
			}
		case UsersType.GET_USER_DETAIL:
			return {
				...state,
				isGettingUserDetail: true,
				action: 'view',
				error: '',
			}
		case UsersType.GET_USER_DETAIL_SUCCESS:
			return {
				...state,
				userDetail: action.payload.data,
				isGettingUserDetail: false,
			}
		case UsersType.GET_USER_DETAIL_FAILED:
			return {
				...state,
				isGettingUserDetail: false,
				action: '',
				error: action.payload.error,
			}
		case UsersType.ADD_USER:
			return {
				...state,
				isAddingUser: true,
			}
		case UsersType.ADD_USER_SUCCESS:
			return {
				...state,
				listUser: [
					...state.listUser,
					action.payload.data,
				],
				userDetail: {},
				isAddingUser: false,
				action: '',
			}
		case UsersType.ADD_USER_FAILED:
			return {
				...state,
				isAddingUser: false,
				userDetail: {},
				error: action.payload.error,
			}
		case UsersType.UPDATE_USER:
			return {
				...state,
				isUpdatingUser: true,
			}
		case UsersType.UPDATE_USER_SUCCESS:
			var { listUser } = state;
			var clonedListUser = [...listUser];
			clonedListUser = clonedListUser.map((user) => {
				if(user._id === action.payload.data._id)
					user = action.payload.data;
				return user;
			});
			return {
				...state,
				listUser: clonedListUser,
				userDetail: action.payload.data,
				isUpdatingUser: false,
				action: 'view',
			}
		case UsersType.UPDATE_USER_FAILED:
			return {
				...state,
				isUpdatingUser: false,
				action: 'view',
				error: action.payload.error,
			}
		case UsersType.DELETE_USER:
			return {
				...state,
				isDeletingUser: true,
				error: '',
			}
		case UsersType.DELETE_USER_SUCCESS:
			return {
				...state,
				isDeletingUser: false,
			}
		case UsersType.DELETE_USER_FAILED:
			return {
				...state,
				isDeletingUser: false,
				error: action.payload.error,
			}
		case UsersType.ADD_ADDRESS:
			var { userDetail } = state;
			var newListAddress = [];
			if(userDetail.addresses) {
				newListAddress = [...userDetail.addresses, action.payload.data];
			} else {
				newListAddress.push(action.payload.data);
			}
			return {
				...state,
				userDetail: {
					...state.userDetail,
					addresses: newListAddress,
				}
			}
		case UsersType.DELETE_ADDRESS:
			var { userDetail } = state;
			var newListAddress = [];
			if(userDetail.addresses) {
				newListAddress = [...userDetail.addresses];
				newListAddress = [...newListAddress.slice(0, action.payload.index), ...newListAddress.slice(action.payload.index + 1)]
			}
			return {
				...state,
				userDetail: {
					...state.userDetail,
					addresses: newListAddress,
				}
			}
		case UsersType.ADD_PHONE_NUMBER:
			var { userDetail } = state;
			var newListPhone = [];
			if(userDetail.phoneNumbers) {
				newListPhone = [...userDetail.phoneNumbers, action.payload.data];
			} else {
				newListPhone.push(action.payload.data);
			}
			return {
				...state,
				userDetail: {
					...state.userDetail,
					phoneNumbers: newListPhone,
				}
			}
		case UsersType.DELETE_PHONE_NUMBER:
			var { userDetail } = state;
			var newListPhone = [];
			if(userDetail.phoneNumbers) {
				newListPhone = [...userDetail.phoneNumbers];
				newListPhone = [...newListPhone.slice(0, action.payload.index), ...newListPhone.slice(action.payload.index + 1)]
			}
			return {
				...state,
				userDetail: {
					...state.userDetail,
					phoneNumbers: newListPhone,
				}
			}
		case UsersType.ADD_EMAIL:
			var { userDetail } = state;
			var newListEmail = [];
			if(userDetail.emails) {
				newListEmail = [...userDetail.emails, action.payload.data];
			} else {
				newListEmail.push(action.payload.data);
			}
			return {
				...state,
				userDetail: {
					...state.userDetail,
					emails: newListEmail,
				}
			}
		case UsersType.DELETE_EMAIL:
			var { userDetail } = state;
			var newListEmail = [];
			if(userDetail.emails) {
				newListEmail = [...userDetail.emails];
				newListEmail = [...newListEmail.slice(0, action.payload.index), ...newListEmail.slice(action.payload.index + 1)]
			}
			return {
				...state,
				userDetail: {
					...state.userDetail,
					emails: newListEmail,
				}
			}
		case UsersType.SEARCH_USERS:
			return {
				...state,
				searchValue: action.payload.value,
			}
		case UsersType.LOG_WORK:
			return {
				...state,
				isLoggingWork: true,
				error: '',
			}
		case UsersType.LOG_WORK_SUCCESS:
			var { listUser } = state;
			var clonedListUser = [...listUser];
			clonedListUser = clonedListUser.map((user) => {
				if(user._id === action.payload.data._id)
					user = action.payload.data;
				return user;
			});
			return {
				...state,
				listUser: clonedListUser,
				userDetail: action.payload.data,
				isLoggingWork: false,
			}
		case UsersType.LOG_WORK_FAILED:
			return {
				...state,
				isLoggingWork: false,
				error: action.payload.error,
			}
		case UsersType.DISPLAY_LOG_WORK:
			return {
				...state,
				action: 'log',
				error: '',
			}
		case UsersType.DISPLAY_ADD_USER:
			return {
				...state,
				action: 'add',
				error: '',
			}
		case UsersType.DISPLAY_UPDATE_USER:
			return {
				...state,
				action: 'update',
				error: '',
			}
		case UsersType.CLOSE_UPDATE_USER:
			return {
				...state,
				action: 'view',
			}
		case UsersType.CLOSE_FORM:
			return {
				...state,
				userDetail: {},
				action: '',
			}
		default:
			return state;
	}
}

export default UsersReducer;
