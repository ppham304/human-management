import { connect } from 'react-redux';

import UserDetail from '../../components/users/UserDetail';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';

const mapStateToProps = (state) => {
	return {
		userDetail: UsersSelector.getUserDetail(state),
		isGettingUserDetail: UsersSelector.getIsGettingUserDetail(state),
		action: UsersSelector.getAction(state),
	};
}

const mapDispatchToProps = {
	getUserDetail: UsersAction.getUserDetail,
	addUser: UsersAction.addUser,
	updateUser: UsersAction.updateUser,
	getDisplayUpdateUser: UsersAction.getDisplayUpdateUser,
	getCloseUpdateUser: UsersAction.getCloseUpdateUser,
	getCloseForm: UsersAction.getCloseForm,
	addAddress: UsersAction.addAddress,
	deleteAddress: UsersAction.deleteAddress,
	addPhoneNumber: UsersAction.addPhoneNumber,
	deletePhoneNumber: UsersAction.deletePhoneNumber,
	addEmail: UsersAction.addEmail,
	deleteEmail: UsersAction.deleteEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);