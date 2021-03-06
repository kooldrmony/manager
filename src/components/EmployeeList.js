import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import { ListView, View, Text } from 'react-native';
import _ from 'lodash';
import ListItem from './ListItem';

class EmployeeList extends Component {
	constructor() {
		super();
		this.renderRow = this.renderRow.bind(this)
		this.createDataSource = this.createDataSource.bind(this)
		// this.dataSource = this.dataSource.bind(this)
	}
	componentWillMount() {
		this.props.employeesFetch();
	
		this.createDataSource(this.props);
}

	componentWillReceiveProps(nextProps) {

		this.createDataSource(nextProps);
	}

	createDataSource({ employees }) {

	const ds = new ListView.DataSource ({
		rowHasChanged: (r1, r2) => r1 !== r2
	});

	this.dataSource = ds.cloneWithRows(this.props.employees)

	}

	renderRow(employee) {
		return <ListItem employee={employee} />;
	};

	render() {
		return (
			<View>
			<Text>Employee List</Text>
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}

			/>
			</View>
			)
	}
};

const mapStateToProps = state => {
	const employees = _.map(state.employees, (val, uid) => {
		return { ...val, uid };
	});

	return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);