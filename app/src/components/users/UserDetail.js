import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';
import * as utils from '../../utils/common';
import * as Constants from '../../constants'

class UserDetail extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	firstName: '',
	  	lastName: '',
	  	shortName: '',
	  	birthday: undefined,
	  	idNumber: '',
	  	addedAddress: '',
	  	addresses: [],
	  	addedPhoneNumber: '',
	  	phoneNumbers: [],
	  	addedEmail: '',
	  	emails: [],
	  	joinedDate: undefined,
	  	expirationDate: undefined,
	  }

	  const { userDetail } = this.props;
	  if(userDetail.id) {
	  	this.onGetUserDetail(userDetail.id);
	  }
	}

	componentDidUpdate(prevPros) {
		const { userDetail, isGettingUserDetail } = this.props;
		if(prevPros.isGettingUserDetail && !isGettingUserDetail) {
			const { userDetail } = this.props;
			if(userDetail) {
				if(userDetail.name) {
					this.setState({
						firstName: userDetail.name.first,
						lastName: userDetail.name.last,
						shortName: userDetail.name.short,
					});
				} else {
					this.setState({
						firstName: '',
						lastName: '',
						shortName: '',
					});
				}

				let formatBirthday, formatJoinedDate, formatExpirationDate;
				if(userDetail.birthday)
					formatBirthday = moment(userDetail.birthday, Constants.FORMAT_DATE);
				if(userDetail.joinedDate)
					formatJoinedDate = moment(userDetail.joinedDate, Constants.FORMAT_DATE);
				if(userDetail.expirationDate)
					formatExpirationDate = moment(userDetail.expirationDate, Constants.FORMAT_DATE);

				this.setState({
					birthday: formatBirthday,
			  	idNumber: userDetail.idNumber,
			  	addresses: userDetail.addresses,
			  	phoneNumbers: userDetail.phoneNumbers,
			  	emails: userDetail.emails,
			  	joinedDate: formatJoinedDate,
			  	expirationDate: formatExpirationDate,
				});
			}
		}
	}

	dataForm = () => {
		const { 
			firstName, 
			lastName, 
			idNumber, 
			birthday, 
			addresses, 
			phoneNumbers, 
			emails, 
			joinedDate, 
			expirationDate 
		} = this.state;

		const { userDetail } = this.props;

		let formatBirthday, formatJoinedDate, formatExpirationDate;
		if(birthday)
			formatBirthday = birthday.utc().toISOString();
		if(joinedDate)
			formatJoinedDate = joinedDate.utc().toISOString();
		if(expirationDate)
			formatExpirationDate = expirationDate.utc().toISOString();

		return {
			name: {
				first: firstName,
				last: lastName,
			},
			idNumber,
			birthday: formatBirthday,
			addresses,
			phoneNumbers,
			emails,
			joinedDate: formatJoinedDate,
			expirationDate: formatExpirationDate,
		}
	}

	onGetUserDetail = (id) => {
		const { getUserDetail } = this.props;
		getUserDetail(id);
	}

	onAddUser = () => {
		const { addUser } = this.props;
		addUser(this.dataForm());
		utils.goToTopFunction();
	}

	onUpdateUser = (id) => {
		const { updateUser } = this.props;
		updateUser(id, this.dataForm());
		utils.goToTopFunction();
	}

	onDisplayUpdateUser = () => {
		const { getDisplayUpdateUser } = this.props;
		getDisplayUpdateUser();
		utils.goToTopFunction();
	}

	onCloseUpdateUser = () => {
		const { getCloseUpdateUser } = this.props;
		getCloseUpdateUser();
		utils.goToTopFunction();
	}

	onCloseForm = () => {
		const { getCloseForm } = this.props;
		getCloseForm();
		utils.goToTopFunction();
	}

	onAddAddress = () => {
		const { addAddress } = this.props;
		const { addedAddress, addresses } = this.state;
		addAddress(addedAddress);
		this.setState({
			addresses: [...addresses, addedAddress],
			addedAddress: '',
		});
	}

	onDeleteAddress = (index) => {
		const { deleteAddress } = this.props;
		const { addresses } = this.state;
		deleteAddress(index);

		this.setState({
			addresses: [...addresses.slice(0,index), ...addresses.slice(index+1)],
			addedAddress: '',
		});
	}

	onAddPhoneNumber = () => {
		const { addPhoneNumber } = this.props;
		const { addedPhoneNumber, phoneNumbers } = this.state;
		addPhoneNumber(addedPhoneNumber);
		this.setState({
			phoneNumbers: [...phoneNumbers, addedPhoneNumber],
			addedPhoneNumber: '',
		});
	}

	onDeletePhoneNumber = (index) => {
		const { deletePhoneNumber } = this.props;
		const { phoneNumbers } = this.state;
		deletePhoneNumber(index);
		this.setState({
			phoneNumbers: [...phoneNumbers.slice(0,index), ...phoneNumbers.slice(index+1)],
			addedPhoneNumber: '',
		});
	}

	onAddEmail = () => {
		const { addEmail } = this.props;
		const { addedEmail, emails } = this.state;
		addEmail(addedEmail);
		this.setState({
			emails: [...emails, addedEmail],
			addedEmail: '',
		});
	}

	onDeleteEmail = (index) => {
		const { deleteEmail } = this.props;
		const { emails } = this.state;
		deleteEmail(index);
		this.setState({
			emails: [...emails.slice(0,index), ...emails.slice(index+1)],
			addedEmail: '',
		});
	}

	onChangeFormItem = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;

		this.setState({
			[name]: value
		});
  }

  onChangeDatePicker = (field, value) => {
  	this.setState({
			[field]: value
		});
  }

	render() {
		const { userDetail, action } = this.props;
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

    const { addresses, phoneNumbers, emails } = userDetail;
    let addressesElement = '';
    let phoneNumbersELement = '';
    let emailsElement = '';

    if(addresses) {
	    addressesElement = addresses.map((address, index) => {
	    	return <Form.Item label={ `Address ${index + 1}` } key={ index }>
						      <Input
						      	placeholder={ `Address ${index + 1}` } 
						      	className={ action !== "view" ? "input-with-btn" : "" }
						      	disabled={ true }
						      	name={ `addresses${index}` }
						      	value={ this.state.addresses[index] }
						      />
						      <Button 
						      	type="primary" 
						      	icon="minus" 
						      	className={ action !== "view" ? "btn-minus-with-input" : "display-none"}
						      	onClick={ () => this.onDeleteAddress(index) }
						      />
						  </Form.Item>
	    });
    }

    if(phoneNumbers) {
	    phoneNumbersELement = phoneNumbers.map((phoneNumber, index) => {
	    	return <Form.Item label={ `Phone Number ${index + 1}` } key={ index }>
						      <Input
						      	placeholder={ `Phone Number ${index + 1}` } 
						      	className={ action !== "view" ? "input-with-btn" : "" }
						      	disabled={ true }
						      	name={ `phoneNumbers${index}` }
						      	value={ this.state.phoneNumbers[index] }
						      />
						      <Button 
						      	type="primary" 
						      	icon="minus" 
						      	className={ action !== "view" ? "btn-minus-with-input" : "display-none"}
						      	onClick={ () => this.onDeletePhoneNumber(index) }
						      />
						  </Form.Item>
	    });
    }

    if(emails) {
	    emailsElement = emails.map((email, index) => {
	    	return <Form.Item label={ `Email ${index + 1}` } key={ index }>
						      <Input
						      	placeholder={ `Email ${index + 1}` } 
						      	className={ action !== "view" ? "input-with-btn" : "" }
						      	disabled={ true }
						      	name={ `emails${index}` }
						      	value={ this.state.emails[index] }
						      />
						      <Button 
						      	type="primary" 
						      	icon="minus" 
						      	className={ action !== "view" ? "btn-minus-with-input" : "display-none"}
						      	onClick={ () => this.onDeleteEmail(index) }
						      />
						  </Form.Item>
	    });
    }

  	let header, button1, button2, function1, function2;
  	switch(action) {
  		case "view":
  			header = "User Detail";
  			button1 = "Update";
  			button2 = "Close";
  			function1 = this.onDisplayUpdateUser.bind(this);
  			function2 = this.onCloseForm.bind(this);
  			break;
  		case "add":
  			header = "Add User";
  			button1 = "Save";
  			button2 = "Cancel";
  			function1 = this.onAddUser.bind(this);
  			function2 = this.onCloseForm.bind(this);
  			break;
  		case "update":
  			header = "Update User";
  			button1 = "Save";
  			button2 = "Exit Update";
  			function1 = this.onUpdateUser.bind(this, userDetail._id);
  			function2 = this.onCloseUpdateUser.bind(this);
  			break;
  		default:
  			break;
  	}
    return (
      <div className="UserDetail">
        <div className={ action === "view" || action === "add" || action === "update" ? "display-block" : "display-none" }>
        		<div>
      				<h1>{ header }</h1>
        			<Form {...formItemLayout}>
        				<Form.Item label="First Name">
						      <Input 
						      	placeholder="First Name"
						      	disabled={action === 'view'}
						      	name="firstName"
						      	value={ this.state.firstName }
                    onChange={ this.onChangeFormItem }
						      />
						    </Form.Item>
						    <Form.Item label="Last Name">
						      <Input 
						      	placeholder="Last Name"
						      	disabled={action === 'view'}
						      	name="lastName"
						      	value={ this.state.lastName }
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
						    <Form.Item label="Date of birth">
						    	<DatePicker 
						      	disabled={action === 'view'}
						      	name="birthday"
						      	value={ this.state.birthday }
                    onChange={ (value) => this.onChangeDatePicker('birthday', value) }
						    	/>
						    </Form.Item>
						    <Form.Item label="ID Number">
						      <Input 
						      	placeholder="ID Number" 
						      	disabled={action === 'view'}
						      	name="idNumber"
						      	value={ this.state.idNumber }
                    onChange={ this.onChangeFormItem }
						      />
						    </Form.Item>
        				<Form.Item label="Add Address" className={ action !== "view" ? "display-block" : "display-none" }>
						      <Input
						      	placeholder="Address" 
						      	className="input-with-btn"
						      	name="addedAddress"
						      	value={ this.state.addedAddress }
                    onChange={ this.onChangeFormItem }
						      />
						      <Button 
						      	type="primary" 
						      	icon="plus" 
						      	className="btn-plus-with-input"
						      	onClick={ this.onAddAddress }
						      />
							  </Form.Item>
        				{ addressesElement }
						    <Form.Item label="Add Phone Number" className={ action !== "view" ? "display-block" : "display-none" }>
						      <Input
						      	placeholder="Phone Number" 
						      	className="input-with-btn"
						      	name="addedPhoneNumber"
						      	value={ this.state.addedPhoneNumber }
                    onChange={ this.onChangeFormItem }
						      />
						      <Button 
						      	type="primary" 
						      	icon="plus" 
						      	className="btn-plus-with-input"
						      	onClick={ this.onAddPhoneNumber }
						      />
							  </Form.Item>
						    { phoneNumbersELement }
						    <Form.Item label="Add Email" className={ action !== "view" ? "display-block" : "display-none" }>
						      <Input
						      	placeholder="Email" 
						      	className="input-with-btn"
						      	name="addedEmail"
						      	value={ this.state.addedEmail }
                    onChange={ this.onChangeFormItem }
						      />
						      <Button 
						      	type="primary" 
						      	icon="plus" 
						      	className="btn-plus-with-input"
						      	onClick={ this.onAddEmail }
						      />
							  </Form.Item>
						    { emailsElement }
						    <Form.Item label="Joined Date">
						    	<DatePicker 
						      	disabled={action === 'view'}
						      	name="joinedDate"
						      	value={ this.state.joinedDate }
                    onChange={ (value) => this.onChangeDatePicker('joinedDate', value) }
						    	/>
						    </Form.Item>
						    <Form.Item label="Expiration Date">
						    	<DatePicker 
						      	disabled={action === 'view'}
						      	name="expirationDate"
						      	value={ this.state.expirationDate }
                    onChange={ (value) => this.onChangeDatePicker('expirationDate', value) }
						    	/>
						    </Form.Item>
        			</Form>
        			<div style={{ float: "right" }}>
	        			<Button className="btn-danger button-action" onClick={ function1 }>{ button1 }</Button>
	        			<Button className="btn-danger button-action" onClick={ function2 }>{ button2 }</Button>
	        		</div>
        		</div>
    		</div>
			</div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		userDetail: UsersSelector.getUserDetail(state),
		isGettingUserDetail: UsersSelector.getIsGettingUserDetail(state),
		action: UsersSelector.getAction(state),
	};
}

const mapDispatchToProps = {
	getUserDetail: UsersAction.getUserDetail,
	addUser: UsersAction.addUser,
	updateUser: UsersAction.updateUser,
	getDisplayUpdateUser: UsersAction.getDisplayUpdateUser,
	getCloseUpdateUser: UsersAction.getCloseUpdateUser,
	getCloseForm: UsersAction.getCloseForm,
	addAddress: UsersAction.addAddress,
	deleteAddress: UsersAction.deleteAddress,
	addPhoneNumber: UsersAction.addPhoneNumber,
	deletePhoneNumber: UsersAction.deletePhoneNumber,
	addEmail: UsersAction.addEmail,
	deleteEmail: UsersAction.deleteEmail,
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
)(UserDetail);
