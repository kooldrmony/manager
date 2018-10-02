import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {
	constructor() {
	super()
	this.onEmailChange = this.onEmailChange.bind(this)
	this.onPasswordChange = this.onPasswordChange.bind(this)
	this.onButtonPress = this.onButtonPress.bind(this)
}

	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text)
	};

	renderError() {
		if (this.props.error) {
			return (
				<View style={{backGroundColor: 'white'}}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
	}

	onButtonPress(){
		const { email, password } = this.props;

		this.props.loginUser({ email, password });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.onButtonPress}>
				Login
			</Button>
			);
	}



	render() {
		return (
			<Card>
				<CardSection>
					<Input
						label="email"
						placeholder="email@gmail.com"
						onChangeText={this.onEmailChange}
						value={this.props.email}
					/>
				</CardSection>

				<CardSection>
					<Input
						secureTextEntry
						label="Password"
						placeholder="Password"
						onChangeText={this.onPasswordChange}
						value={this.props.password}
					/>
				</CardSection>

				{this.renderError()}

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
			)
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'

	}

}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;

	return { email, password, error, loading };
};

// const mapStateToProps = state => {
// 	return { 
// 		email: state.auth.email,
// 		password: state.auth.password,
// 		error: state.auth.error
// 	};
// };

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);