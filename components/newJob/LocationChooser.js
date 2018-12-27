import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


export default class LocationChooser extends Component {
    static navigationOptions = ({ navigation: { state: { params: { chosenPoint, onChoose } }, goBack } }) => {
        const choose = () => {
            onChoose(chosenPoint);
            goBack();
        }

        return {
            headerTitle: "Choose location",
            headerRight: (
                <Button
                    title={chosenPoint ? 'Choose' : 'Clear'}
                    onPress={choose}
                />
            ),
        };
    };

    componentWillMount() {
        const { navigation } = this.props;
        navigation.setParams({
            chosenPoint: null,
        })
    }

    onMapClick = (event) => {
        const { nativeEvent: { coordinate } } = event;
        const { navigation } = this.props;
        navigation.setParams({
            chosenPoint: coordinate,
        })
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <MapView
                    ref={(map) => { this._map = map; }}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    // initialRegion={initialRegion}
                    onPress={this.onMapClick}
                    showsUserLocation
                    showsMyLocationButton
                >
                    {
                        navigation.state.params.chosenPoint
                            ? <Marker coordinate={navigation.state.params.chosenPoint} />
                            : null
                    }
                </MapView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
