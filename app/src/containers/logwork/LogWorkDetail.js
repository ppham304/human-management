import { connect } from "react-redux";

import LogWorkDetail from '../../components/logwork/LogWorkDetail';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';

const mapStateToProps = (state) => {
	return {
		userDetail: UsersSelector.getUserDetail(state),
		action: UsersSelector.getAction(state),
		isGettingUserDetail: UsersSelector.getIsGettingUserDetail(state),
		isLoggingWork: UsersSelector.getIsLoggingWork(state),
	};
}

const mapDispatchToProps = {
	getUserDetail: UsersAction.getUserDetail,
	getCloseForm: UsersAction.getCloseForm,
	logWork: UsersAction.logWork,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkDetail);