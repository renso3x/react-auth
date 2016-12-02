import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import {
	Button,
	Card,
	CardSection,
	Input,
	Spinner
} from './common';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: '',
			loading: false
		};
		this.onButtonPress = this.onButtonPress.bind(this);
		this.renderButton = this.renderButton.bind(this);
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onLoginFail = this.onLoginFail.bind(this);
	}

	onButtonPress() {
		const { email, password } = this.state;

		this.setState({ loading: true });

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess)
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(this.onLoginSuccess)
					.catch(this.onLoginFail);
			});
	}

	onLoginFail() {
		this.setState({
			error: 'Authentiation Failed.',
			loading: false
		});
	}

	onLoginSuccess() {
		this.setState({
			email: '',
			password: '',
			error: '',
			loading: false
		});
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />;
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
						placeholder='user@gmail.com'
						label='Email'
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>
				</CardSection>
				<CardSection>
					<Input
						placeholder='password'
						label='Password'
						secureTextEntry
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
					/>
				</CardSection>
				<Text style={styles.errorText}>
					{this.state.error}
				</Text>
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorText: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default LoginForm;
