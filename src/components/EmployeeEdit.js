import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave } from '../actions';
import _ from 'lodash';
import Communications from 'react-native-communications';

class EmployeeEdit extends Component {
	consturctor()
	super();
	this.state = {
		showModal: false
	};
	
	componentWillMount() {
		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUdate({ prop, value });
		});
	}

	onButtonPress() {
		const { name, phone, shift } =  this.props;

		this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid })
	}

	onTextPress() {
	 const { phone, shift } = this.props;

	 Communications.text(phone, `Your upcoming schedule is on ${shift}`);
	}

	render() {
		return(
			<Card>
				<Employeeform />			
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={this.onTextPress.bind(this)}>
						Text Schedule
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Fire Employee
					</Button>
				</CardSection>

				<Confirm
					visible={this.state.showModal}
				>
					Are you sure you want to delete this employee?
				</Confirm>
			</Card>

			)
	}
}

const mapStateToProps = (state) => {
	const { name, phone, shift } = state.employeeForm; 

	return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUdate, employeeSave } )(EmployeeEdit);