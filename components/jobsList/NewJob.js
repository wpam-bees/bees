import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Divider, ListItem } from 'react-native-elements';

import { appleRed, backgroundColor } from '../../assets';


export default class NewJob extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "New job",
        };
    };

    add = (values) => {
        console.log(values);
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Formik
                    onSubmit={this.add}
                >
                    {props => (
                        <KeyboardAwareScrollView
                            style={StyleSheet.container}
                            showsVerticalScrollIndicator={false}
                        >
                            <ListItem
                                containerStyle={styles.listItemContainer}
                                title="Title"
                                onChangeText={props.handleChange('title')}
                                onBlur={props.handleBlur('title')}
                                textInput
                                hideChevron
                            />
                            <Divider />
                            <ListItem
                                containerStyle={styles.listItemContainer}
                                title="Price [zł]"
                                textInputKeyboardType="decimal-pad"
                                onChangeText={props.handleChange('price')}
                                onBlur={props.handleBlur('price')}
                                textInput
                                hideChevron
                            />
                            <Divider />
                            <ListItem
                                containerStyle={styles.listItemContainer}
                                title="Description"
                                onChangeText={props.handleChange('title')}
                                onBlur={props.handleBlur('title')}
                                textInput
                                hideChevron
                                multiline
                                textInputMultiline
                            />
                            <Divider />
                            <ListItem
                                containerStyle={styles.listItemContainer}
                                title="Location"
                                onPress={() => navigation.navigate('LocationChooser', {
                                    onChoose: props.handleChange('location'),
                                })}
                            />
                        </KeyboardAwareScrollView>
                    )}
                </Formik>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    listItemContainer: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
    },
    divider: {
        backgroundColor,
        height: 20,
    },
});
