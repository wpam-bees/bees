import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';

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
