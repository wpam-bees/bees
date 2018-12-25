import React, { Component } from 'react';
import { StyleSheet, Button, Text } from 'react-native';
import { createBottomTabNavigator, SafeAreaView } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import BraintreeDropIn from 'react-native-braintree-dropin-ui';

import ListStack from './jobsList/ListStack';


const Nav = createBottomTabNavigator(
    {
        List: ListStack,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Map') {
                    iconName = 'map';
                } else if (routeName === 'List') {
                    iconName = 'list-ul';
                } else if (routeName === 'Settings') {
                    iconName = 'wrench';
                }

                return <FontAwesome name={iconName} size={20} color={tintColor} />;
            },
        }),
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
                {/* <Text>Welcome to Bees app</Text>
                <Button
                    title="Make a payment"
                    onPress={this.pay}
                /> */}
                <Nav navigation={navigation} />
            </SafeAreaView>
        );
    }
}
