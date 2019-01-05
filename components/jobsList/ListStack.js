import React, { Component } from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ActiveJobs from './ActiveJobs';
import PastJobs from './PastJobs';


const Navigation = createBottomTabNavigator(
    {
        'Active Jobs': ActiveJobs,
        'Past Jobs': PastJobs,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Active Jobs') {
                    iconName = 'list-ul';
                } else if (routeName === 'Past Jobs') {
                    iconName = 'check-square';
                }

                return <FontAwesome name={iconName} size={20} color={tintColor} />;
            },
        }),
    },
);

export default class ListStack extends Component {
    static router = Navigation.router;
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Jobs",
            headerRight: (
                <Button
                    title="Add"
                    onPress={() => navigation.navigate('NewJob')}
                />
            ),
            headerLeft: (
                <Button
                    title="Log Out"
                    onPress={() => navigation.navigate('Logout')}
                    color="red"
                />
            ),
        };
    };

    render() {
        const { navigation } = this.props;
        return (
            <Navigation navigation={navigation} />
        );
    }
}