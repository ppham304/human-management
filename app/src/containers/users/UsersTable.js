import { connect } from 'react-redux';

import UsersTable from '../../components/users/UsersTable';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';

const mapStateToProps = (state) => {
	return {
		listUser: UsersSelector.getListUser(state),
		searchValue: UsersSelector.getSearchValue(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
