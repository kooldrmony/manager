import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { Card, CardSection, Button } from './common';
import { employeeUpdate } from '../actions';
import _ from 'lodash';

class EmployeeEdit extends Component {
	componentWillMount() {
		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUdate({ prop, value });
		});
	}

	onButtonPress() {
		const { name, phone, shift } =  this.props;
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
			</Card>

			)
	}
}

const mapStateToProps = (state) => {
	const { name, phone, shift } = state.employeeForm; 

	return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUdate } )(EmployeeEdit);