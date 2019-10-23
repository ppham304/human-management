import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Input, DatePicker } from 'antd';

import * as UsersAction from '../../redux/actions/users';
import * as UsersSelector from '../../redux/selectors/users';
import * as utils from '../../utils/common';

class UserDetail extends Component {
	constructor(props) {
	  super(props);
	
	  this.addresses = [];
	  this.phoneNumbers = [];
	  this.emails = [];
	}

	componentDidUpdate() {
		const { userDetail } = this.props;
		if(userDetail.name) {
			this.firstName.input.value = userDetail.name.first || '';
			this.lastName.input.value = userDetail.name.last || '';
			this.shortName.input.value = userDetail.name.short || '';
		}

		if(userDetail.idNumber) {
			this.idNumber.input.value = userDetail.idNumber || '';
		}

		if(userDetail.birthday) {
			this.birthday.picker.input.value = utils.formatDate(userDetail.birthday) || '';
		}

		if(userDetail.addresses) {
			userDetail.addresses.map((address, index) => {
				this.addresses[index].input.value = address || '';
				return address;
			});
		}

		if(userDetail.phoneNumbers) {
			userDetail.phoneNumbers.map((phoneNumber, index) => {
				this.phoneNumbers[index].input.value = phoneNumber || '';
				return phoneNumber;
			});
		}

		if(userDetail.emails) {
			userDetail.emails.map((email, index) => {
				this.emails[index].input.value = email || '';
				return email;
			});
		}

		if(userDetail.joinedDate) {
			this.joinedDate.picker.input.value = utils.formatDate(userDetail.joinedDate) || '';
		}

		if(userDetail.expirationDate) {
			this.expirationDate.picker.input.value = utils.formatDate(userDetail.expirationDate) || '';
		}

		this.addedAddress.input.value = '';
		this.addedPhoneNumber.input.value = '';
		this.addedEmail.input.value = '';
	}

	onAddUser = () => {
		const { addUser, userDetail } = this.props;
		addUser({
			name: {
				first: this.firstName.input.value,
				last: this.lastName.input.value,
			},
			idNumber: this.idNumber.input.value,
			birthday: this.birthday.picker.input.value,
			addresses: userDetail.addresses,
			phoneNumbers: userDetail.phoneNumbers,
			emails: userDetail.emails,
			joinedDate: this.joinedDate.picker.input.value,
			expirationDate: this.expirationDate.picker.input.value,
		});
		utils.goToTopFunction();
	}

	onUpdateUser = (id) => {
		const { updateUser, userDetail } = this.props;
		updateUser(id, {
			name: {
				first: this.firstName.input.value,
				last: this.lastName.input.value,
			},
			idNumber: this.idNumber.input.value,
			birthday: this.birthday.picker.input.value,
			addresses: userDetail.addresses,
			phoneNumbers: userDetail.phoneNumbers,
			emails: userDetail.emails,
			joinedDate: this.joinedDate.picker.input.value,
			expirationDate: this.expirationDate.picker.input.value,
		});
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
		addAddress(this.addedAddress.input.value);
	}

	onDeleteAddress = (index) => {
		const { deleteAddress } = this.props;
		deleteAddress(index);
	}

	onAddPhoneNumber = () => {
		const { addPhoneNumber } = this.props;
		addPhoneNumber(this.addedPhoneNumber.input.value);
	}

	onDeletePhoneNumber = (index) => {
		const { deletePhoneNumber } = this.props;
		deletePhoneNumber(index);
	}

	onAddEmail = () => {
		const { addEmail } = this.props;
		addEmail(this.addedEmail.input.value);
	}

	onDeleteEmail = (index) => {
		const { deleteEmail } = this.props;
		deleteEmail(index);
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
    let emailsELement = '';

    if(addresses) {
	    addressesElement = addresses.map((address, index) => {
	    	return <Form.Item label={ `Address ${index + 1}` } key={ index }>
						      <Input
						      	placeholder={ `Address ${index + 1}` } 
						      	className={ action !== "view" ? "input-with-btn" : "" }
						      	ref={(ref) => { this.addresses[index] = ref; }}
						      	disabled={ true }
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
						      	ref={(ref) => { this.phoneNumbers[index] = ref; }}
						      	disabled={ true }
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
	    emailsELement = emails.map((email, index) => {
	    	return <Form.Item label={ `Email ${index + 1}` } key={ index }>
						      <Input
						      	placeholder={ `Email ${index + 1}` } 
						      	className={ action !== "view" ? "input-with-btn" : "" }
						      	ref={(ref) => { this.emails[index] = ref; }}
						      	disabled={ true }
						      />
						      <Button 
						      	type="primary" 
						      	icon="minus" 
						      	className={ action !== "view" ? "btn-minus-with-input" : "display-none"}
						      	onClick={ () => this.onAddEmail(index) }
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
						      	ref={(ref) => { this.firstName = ref; }} 
						      	disabled={action === 'view'}
						      />
						    </Form.Item>
						    <Form.Item label="Last Name">
						      <Input 
						      	placeholder="Last Name" 
						      	ref={(ref) => { this.lastName = ref; }} 
						      	disabled={action === 'view'}
						      />
						    </Form.Item>
						    <Form.Item label="Short Name">
						      <Input 
						      	placeholder="Short Name" 
						      	ref={(ref) => { this.shortName = ref; }} 
						      	disabled={ true }
						      />
						    </Form.Item>
						    <Form.Item label="Date of birth">
						    	<DatePicker 
						    		ref={(ref) => { this.birthday = ref; }}
						      	disabled={action === 'view'}
						    	/>
						    </Form.Item>
						    <Form.Item label="ID Number">
						      <Input 
						      	placeholder="ID Number" 
						      	ref={(ref) => { this.idNumber = ref; }} 
						      	disabled={action === 'view'}
						      />
						    </Form.Item>
        				<Form.Item label="Add Address" className={ action !== "view" ? "display-block" : "display-none" }>
						      <Input
						      	placeholder="Address" 
						      	className="input-with-btn"
						      	ref={(ref) => { this.addedAddress = ref; }}
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
						      	ref={(ref) => { this.addedPhoneNumber = ref; }}
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
						      	ref={(ref) => { this.addedEmail = ref; }}
						      />
						      <Button 
						      	type="primary" 
						      	icon="plus" 
						      	className="btn-plus-with-input"
						      	onClick={ this.onAddEmail }
						      />
							  </Form.Item>
						    { emailsELement }
						    <Form.Item label="Joined Date">
						    	<DatePicker 
						    		ref={(ref) => { this.joinedDate = ref; }}
						      	disabled={action === 'view'}
						    	/>
						    </Form.Item>
						    <Form.Item label="Expiration Date">
						    	<DatePicker 
						    		ref={(ref) => { this.expirationDate = ref; }}
						      	disabled={action === 'view'}
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
		action: UsersSelector.getAction(state),
	};
}

const mapDispatchToProps = {
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
