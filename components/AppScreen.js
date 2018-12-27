import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';

// import BraintreeDropIn from 'react-native-braintree-dropin-ui';

import LocationWatcher from './LocationWatcher';

import ListStack from './jobsList/ListStack';

import NewJob from './newJob/NewJob';
import LocationChooser from './newJob/LocationChooser';
import CategoryChooser from './category/CategoryChooser';
import JobPreview from './jobsList/JobPreview';


const Nav = createStackNavigator(
    {
        ListStack,
        NewJob,
        LocationChooser,
        CategoryChooser,
        JobPreview,
    },
);


export default class AppScreen extends Component {
    static router = Nav.router;

    pay = () => {
        // BraintreeDropIn.show({
        //     clientToken: 'sandbox_w7xcgt6d_cwsft3vzjpgfjptf',
        //     orderTotal: 112.0,
        // })
        //     .then(result => console.warn(result))
        //     .catch((error) => {
        //         if (error.code === 'USER_CANCELLATION') {
        //             console.warn('cnacel');
        //         } else {
        //             console.warn(error);
        //         }
        //     });
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={StyleSheet.absoluteFill}>
                <Nav navigation={navigation} />
                <LocationWatcher />
            </SafeAreaView>
        );
    }
}
