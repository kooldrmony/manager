import React, { Component } from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
	constructor() {
		super();
		this.onButtonPress = this.onButtonPress.bind(this)
	}
	onButtonPress() {
		const { name, phone, shift } = this.props;

		this.props.employeeCreate({ name, phone, shift: shift || "Monday" });

	}


	render() {
		return(
			<Card>
				<EmployeeForm {...this.props} />
				<CardSection>
					<Button onPress={this.onButtonPress}>
						Create
					</Button>
				</CardSection>


			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, phone, shift } = state.employeeForm;

	return { name, phone, shift };
}

export default connect(mapStateToProps, { employeeUpdate, employeeCreate }) (EmployeeCreate);