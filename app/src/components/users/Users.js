import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Table, Button, Input } from 'antd';

import UserDetail from './UserDetail';
import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';
import * as utils from '../../utils/common';

const { Column } = Table;
const { Search } = Input;

class Users extends Component {
	componentDidMount() {
		this.onGetListUser();
	}

	onGetListUser = () => {
		const { getListUser } = this.props;
		getListUser();
	}

	onGetUserDetail = (record) => {
		const { getUserDetail } = this.props;
		getUserDetail(record._id);
	}

	onDeleteUser = (id) => {
		const { deleteUser } = this.props;
		deleteUser(id);
	}

	onDisplayAddUser = () => {
		const { getDisplayAddUser } = this.props;
		getDisplayAddUser();
	}

	onSearch = (value) => {
		const { searchUsers } = this.props;
		searchUsers(value);
	}

	render() {
		const { listUser, action, searchValue } = this.props;

		let displayedListUser = [...listUser];

		if(searchValue) {
			displayedListUser = displayedListUser.filter((user) => {
				return user.name.full.toUpperCase().includes(searchValue.toUpperCase());
			});
		}

    return (
      <div className="Users">
	    	{
	    		action === "view" || action === "add" || action === "update"
	    		?
        	<UserDetail show={ action === "view" } />
	    		:
	    		<React.Fragment>
	    			<div className="add-search-div">
		    			<Button 
		    				className="btn-success" 
		    				onClick={ this.onDisplayAddUser }
		    				style={{ width: "10%", marginRight: "10px" }}
		    			>
		    				Add User
		    			</Button>
		    			<Search
					      placeholder="Search Text"
					      enterButton="Search"
					      onSearch={ value => this.onSearch(value) }
					      style={{ width: "88%", marginLeft: "11px" }}
					    />
				    </div>
		        <Table bordered dataSource={displayedListUser} rowKey={record => record._id}>
					    <Column 
					    	title="Name" 
					    	dataIndex="name" 
					    	key="name"
					    	render={ (text, record) => <a onClick={ () => this.onGetUserDetail(record) }>{ record.name.full }</a> }
					    />
					    <Column 
					    	title="Joined Date" 
					    	dataIndex="joinedDate" 
					    	key="joinedDate"
					    	render={ (text, record) => <span>{ utils.formatDate(record.joinedDate) }</span>}
					    />
					    <Column 
					    	title="Expiration Date" 
					    	dataIndex="expirationDate" 
					    	key="expirationDate"
					    	render={ (text, record) => <span>{ utils.formatDate(record.expirationDate) }</span>}
					    />
					    <Column 
					    	title="Worked Hours" 
					    	dataIndex="workedHours" 
					    	key="workedHours"
					    	render={ (text, record) => <span>{ record.workedHours }</span>}
					    />
					    <Column 
					    	title="Action" 
					    	dataIndex="action" 
					    	key="action"
					    	render={ 
					    						(text, record) => 
					    							<React.Fragment>
															<Button 
																className="btn-danger no-margin-y" 
																onClick={ () => this.onDeleteUser(record._id) }
															>
																	Delete
															</Button>
														</React.Fragment>
					    					}
					    />
		        </Table>
		      </React.Fragment>
	    	}
			</div>
    );
  }
}

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
	getUserDetail: UsersAction.getUserDetail,
	getDisplayAddUser: UsersAction.getDisplayAddUser,
	deleteUser: UsersAction.deleteUser,
	searchUsers: UsersAction.searchUsers,
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
)(Users);
