import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input } from 'antd';

import UsersTable from '../../containers/users/UsersTable';
import UserDetail from '../../containers/users/UserDetail';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';
import * as utils from '../../utils/common';

const { Column } = Table;
const { Search } = Input;

class Users extends Component {
	render() {
		const { action } = this.props;

    return (
      <div className="Users">
	    	{
	    		action === "view" || action === "add" || action === "update"
	    		?
        	<UserDetail show={ action === "view" || action === "add" || action === "update" } />
	    		:
	    		<UsersTable />
	    	}
			</div>
    );
  }
}

export default Users;
