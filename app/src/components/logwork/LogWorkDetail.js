import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';
import * as utils from '../../utils/common';

class LogWorkDetail extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	fullName: '',
	  	shortName: '',
	  	logWork: '',
	  	totalWorkedHours: '',
	  	totalSalary: '',
	  };

	  const { userDetail } = this.props;
	  if(userDetail.id) {
	  	this.onGetUserDetail(userDetail.id);
	  }
	}

	componentDidUpdate(prepProps) {
		const { userDetail, isGettingUserDetail, isLoggingWork } = this.props;
		const condition = (prepProps.isLoggingWork && !isLoggingWork) ||
												(prepProps.isGettingUserDetail && !isGettingUserDetail);
		if(condition) {
			if(userDetail.name) {
				this.setState({
					fullName: userDetail.name.full,
					shortName: userDetail.name.short,
				});
			}
			this.setState({
		  	totalWorkedHours: userDetail.workedHours,
		  	totalSalary: userDetail.totalSalary,
			});
		}
	}

	onGetUserDetail = (id) => {
		const { getUserDetail } = this.props;
		getUserDetail(id);
	}

	onLogWork = () => {
		if(this.state.logWork) {
			const { logWork, userDetail } = this.props;
			logWork(userDetail._id, {
				workedHours: parseInt(this.state.logWork),
			});
			this.setState({
				logWork: '',
			});
		}
	}

	onCloseForm = () => {
		const { getCloseForm, action } = this.props;
		getCloseForm();
		utils.goToTopFunction();
	}

	onChangeFormItem = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;

		this.setState({
			[name]: value
		});
  }

	render() {
		const { action } = this.props;

		const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
      labelAlign: "left",
    };

    let button1, button2, function1, function2;
    switch(action) {
  		case "view":
  			button2 = "Close";
  			function2 = this.onCloseForm.bind(this);
  			break;
  		case "log":
  			button1 = "Log";
  			button2 = "Close";
  			function1 = this.onLogWork.bind(this);
  			function2 = this.onCloseForm.bind(this);
  			break;
  		default:
  			break;
  	}

		return (
      <div className="LogWorkDetail">
      	<div>
  				<h1>Log Work</h1>
    			<Form {...formItemLayout}>
    				<Form.Item label="Full Name">
				      <Input 
				      	placeholder="Full Name" 
				      	disabled={ true }
				      	name="fullName"
				      	value={ this.state.fullName }
                onChange={ this.onChangeFormItem }
				      />
				    </Form.Item>
				    <Form.Item label="Short Name">
				      <Input 
				      	placeholder="Short Name"
				      	disabled={ true }
				      	name="shortName"
				      	value={ this.state.shortName }
                onChange={ this.onChangeFormItem }
				      />
				    </Form.Item>
				    <Form.Item label="Log Work" className={ action === "view" ? "display-none" : "" }>
				      <Input 
				      	placeholder="Log Work"
				      	name="logWork"
				      	value={ this.state.logWork }
                onChange={ this.onChangeFormItem }
				      />
				    </Form.Item>
				    <Form.Item label="Total Worked Hours">
				      <Input 
				      	placeholder="Total Worked Hours" 
				      	disabled={ true }
				      	name="totalWorkedHours"
				      	value={ this.state.totalWorkedHours }
                onChange={ this.onChangeFormItem }
				      />
				    </Form.Item>
				    <Form.Item label="Total Salary">
				      <Input 
				      	placeholder="Total Salary"
				      	disabled={ true }
				      	name="totalSalary"
				      	value={ this.state.totalSalary }
                onChange={ this.onChangeFormItem }
				      />
				    </Form.Item>
    			</Form>
    			<div style={{ float: "right" }}>
      			<Button className={ action === "view" ? "display-none" : "btn-danger button-action" } onClick={ function1 }>{ button1 }</Button>
      			<Button className="btn-danger button-action" onClick={ function2 }>{ button2 }</Button>
      		</div>
    		</div>
      </div>
    );
  }
}

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

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
)(LogWorkDetail);
