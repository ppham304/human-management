import { connect } from 'react-redux';

import Users from '../../components/users/Users';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';

const mapStateToProps = (state) => {
	return {
		listUser: UsersSelector.getListUser(state),
		searchValue: UsersSelector.getSearchValue(state),
		action: UsersSelector.getAction(state),
		error: UsersSelector.getError(state),
	};
}

const mapDispatchToProps = {
	getListUser: UsersAction.getListUser,
	getDisplayAddUser: UsersAction.getDisplayAddUser,
	getDisplayViewUserDetail: UsersAction.getDisplayViewUserDetail,
	deleteUser: UsersAction.deleteUser,
	searchUsers: UsersAction.searchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
