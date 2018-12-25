import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class LocationChooser extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Choose location",
            headerRight: (
                <Button
                    title="Choose"
                    // color="#00F"
                    onPress={() => navigation.navigate('NewJob')}
                />
            ),
        };
    };

    render() {
        return (
            <View>
                <Text>LocationChooser</Text>
            </View>
        )
    }
}
