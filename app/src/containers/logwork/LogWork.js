import { connect } from 'react-redux';

import LogWork from '../../components/logwork/LogWork';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';

const mapStateToProps = (state) => {
	return {
		action: UsersSelector.getAction(state),
	};
}

const mapDispatchToProps = {
	
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWork);