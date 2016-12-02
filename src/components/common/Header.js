import React from 'react';
import {
	Text,
	View
} from 'react-native';

const Header = ({
	title
}) => {
	const { viewStyle, textStyle } = styles;

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{title}</Text>
		</View>
	);
};

const styles = {
	viewStyle: {
		backgroundColor: '#f8f8f8',
		justifyContent: 'center',
		height: 50,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.5,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20,
		textAlign: 'center'
	}
};

Header.propTypes = {
	title: React.PropTypes.string
};

export { Header };
