import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";

import WelcomePage from './welcome/WelcomePage';
import Users from './users/Users';
import LogWork from './logwork/LogWork';
import * as UsersAction from '../redux/actions/users';
import * as UsersSelector from '../redux/selectors/users';
import * as utils from '../utils/common';
import * as Constants from '../constants';

class Home extends Component {
	changeState = (position) => {
		this.onCloseForm();
		this.props.history.push(position);
	}

	onCloseForm = () => {
		const { getCloseForm } = this.props;
		getCloseForm();
		utils.goToTopFunction();
	}

	selectedKeys = (path) => {
		switch(path) {
			case Constants.HOST_HOME:
				return 'home';
			case Constants.HOST_HOME_USERS:
				return 'user';
			case Constants.HOST_HOME_LOG:
				return 'log';
			default:
				return '';
		}
	}

	render() {
    const { location } = this.props;
    
    const menuItem = [
    	{
    		key: "home",
    		type: "home",
    		content: "Home",
    		onClickFunc: this.changeState.bind(this, Constants.HOST_HOME),
    	},
    	{
    		key: "user",
    		type: "user",
    		content: "Users",
    		onClickFunc: this.changeState.bind(this, Constants.HOST_HOME_USERS),
    	},
    	{
    		key: "log",
    		type: "clock-circle",
    		content: "Home",
    		onClickFunc: this.changeState.bind(this, Constants.HOST_HOME_LOG),
    	},
    ];

    const elementMenuItem = menuItem.map((item, index) => {
    	return <Menu.Item 
    						key={item.key} 
    						onClick={ item.onClickFunc }
    					>
								<Icon type={item.type} />
								{ item.content }
							</Menu.Item>
    });

    return (
      <div className="Home">
      	<Menu 
      		mode="horizontal"
      		selectedKeys={[this.selectedKeys(location.pathname)]}
      	>
					{ elementMenuItem }
				</Menu>
				<Switch>
					<Route exact path={ Constants.HOST_HOME } component={ WelcomePage } />
					<Route path={ Constants.HOST_HOME_USERS } component={ Users } />
					<Route path={ Constants.HOST_HOME_LOG } component={ LogWork } />
				</Switch>
		  </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {

	};
}

const mapDispatchToProps = {
	getCloseForm: UsersAction.getCloseForm,
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
)(Home);
