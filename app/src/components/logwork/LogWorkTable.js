import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input } from 'antd';

import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';

const { Column } = Table;
const { Search } = Input;

class LogWorkTable extends Component {
	componentDidMount() {
		this.onGetListUser();
	}

	onGetListUser = () => {
		const { getListUser } = this.props;
		getListUser();
	}

	onDisplayViewUserDetail = (record) => {
		const { getDisplayViewUserDetail } = this.props;
		getDisplayViewUserDetail(record._id);
	}

	onDisplayLogWork = (record) => {
		const { getDisplayLogWork } = this.props;
		getDisplayLogWork(record._id);
	}

	onSearch = (value) => {
		const { searchUsers } = this.props;
		searchUsers(value);
	}

	render() {
		const { listUser, searchValue } = this.props;
		let displayedListUser = [...listUser];

		if(searchValue) {
			displayedListUser = displayedListUser.filter((user) => {
				return user.name.full.toUpperCase().includes(searchValue.toUpperCase());
			});
		}

    return (
      <div className="LogWorkTable">
    		<React.Fragment>
      		<div className="add-search-div">
	    			<Search
				      placeholder="Search Text"
				      enterButton="Search"
				      onSearch={ value => this.onSearch(value) }
				      style={{ width: "70%" }}
				    />
			    </div>
      		<Table bordered dataSource={displayedListUser} rowKey={record => record._id}>
				    <Column 
				    	title="Name" 
				    	dataIndex="name" 
				    	key="name"
				    	render={ (text, record) => <a onClick={ () => this.onDisplayViewUserDetail(record) }>{ record.name.full }</a> }
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
															className="btn-info no-margin-y"
															onClick={ () => this.onDisplayLogWork(record) }
														>
																Log Work
														</Button>
													</React.Fragment>
				    					}
				    />
				  </Table>
			  </React.Fragment>
      </div>
    );
  }
}

export default LogWorkTable;
