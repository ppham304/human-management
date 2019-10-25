import { connect } from 'react-redux';

import LogWork from '../../components/logwork/LogWork';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';

const mapStateToProps = (state) => {
	return {
		listUser: UsersSelector.getListUser(state),
		searchValue: UsersSelector.getSearchValue(state),
		action: UsersSelector.getAction(state),
	};
}

const mapDispatchToProps = {
	getListUser: UsersAction.getListUser,
	getDisplayViewUserDetail: UsersAction.getDisplayViewUserDetail,
	getDisplayLogWork: UsersAction.getDisplayLogWork,
	searchUsers: UsersAction.searchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWork);