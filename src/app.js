import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import {
	Header,
	Card,
	CardSection,
	Button,
	Spinner
} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: null,
		};
		this.renderContent = this.renderContent.bind(this);
	}

	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyBU-rcEOsA_jSLvvpt8DEJfzkeC_MbZtJ4',
			authDomain: 'authentication-3ce6a.firebaseapp.com',
			databaseURL: 'https://authentication-3ce6a.firebaseio.com',
			storageBucket: 'authentication-3ce6a.appspot.com',
			messagingSenderId: '842130720340'
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<Card>
						<CardSection>
							<Button onPress={() => { firebase.auth().signOut(); }}>
								Logout
							</Button>
						</CardSection>
					</Card>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner />;
		}
	}

	render() {
		return (
			<View>
				<Header title={'Authentication'} />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
