import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input } from 'antd';

import LogWorkDetail from '../../containers/logwork/LogWorkDetail';
import LogWorkTable from '../../containers/logwork/LogWorkTable';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';

const { Column } = Table;
const { Search } = Input;

class LogWork extends Component {
	render() {
		const { action } = this.props;

    return (
      <div className="LogWork">
      	{
      		action === "view" || action === "log"
      		?
			  	<LogWorkDetail />
      		:
      		<LogWorkTable />
      	}
      </div>
    );
  }
}

export default LogWork;
