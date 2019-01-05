import React, { Component } from 'react';
import {
    ImageBackground,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { resetToken } from '../../redux/auth';

import {
    honeyYellow,
    beesBackground,
} from '../../assets';

class LogoutScreen extends Component {
    constructor(props) {
        super(props);
        this.logout();
    }

    logout = async () => {
        const { resetToken, navigation } = this.props;
        await resetToken();
        navigation.navigate('Login'); // eslint-disable-line react/prop-types
    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={beesBackground}
            >
                <ActivityIndicator
                    size="large"
                    color={honeyYellow}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapDispatchToProps = {
    resetToken,

};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
