import { connect } from 'react-redux';

import Users from '../../components/users/Users';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';

const mapStateToProps = (state) => {
	return {
		action: UsersSelector.getAction(state),
	};
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
