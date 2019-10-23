import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';
import * as utils from '../../utils/common';

class LogWorkDetail extends Component {
	componentDidUpdate() {
		const { userDetail } = this.props;
		if(userDetail.name) {
			this.fullName.input.value = userDetail.name.full || '';
			this.shortName.input.value = userDetail.name.short || '';
		}

		this.totalWorkedHours.input.value = userDetail.workedHours;
		this.totalSalary.input.value = userDetail.totalSalary;

		this.logWork.input.value = '';
	}

	onLogWork = () => {
		if(this.logWork.input.value) {
			const { logWork, userDetail } = this.props;
			logWork(userDetail._id, {
				workedHours: parseInt(this.logWork.input.value),
			});
		}
	}

	onCloseForm = () => {
		const { getCloseForm, action } = this.props;
		getCloseForm();
		utils.goToTopFunction();
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
				      	ref={(ref) => { this.fullName = ref; }}
				      	disabled={ true }
				      />
				    </Form.Item>
				    <Form.Item label="Short Name">
				      <Input 
				      	placeholder="Short Name" 
				      	ref={(ref) => { this.shortName = ref; }}
				      	disabled={ true }
				      />
				    </Form.Item>
				    <Form.Item label="Log Work" className={ action === "view" ? "display-none" : "" }>
				      <Input 
				      	placeholder="Log Work" 
				      	ref={(ref) => { this.logWork = ref; }}
				      />
				    </Form.Item>
				    <Form.Item label="Total Worked Hours">
				      <Input 
				      	placeholder="Total Worked Hours" 
				      	ref={(ref) => { this.totalWorkedHours = ref; }}
				      	disabled={ true }
				      />
				    </Form.Item>
				    <Form.Item label="Total Salary">
				      <Input 
				      	placeholder="Total Salary" 
				      	ref={(ref) => { this.totalSalary = ref; }}
				      	disabled={ true }
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
	};
}

const mapDispatchToProps = {
	getCloseForm: UsersAction.getCloseForm,
	logWork: UsersAction.logWork,
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
)(LogWorkDetail);
