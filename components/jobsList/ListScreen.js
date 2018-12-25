import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class ListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Your jobs",
            headerRight: (
                <Button
                    title="Add"
                    // color="#00F"
                    onPress={() => navigation.navigate('NewJob')}
                />
            ),
        };
    };

    render() {
        return (
            <View>
                <Text>ListScreen</Text>
            </View>
        )
    }
}
