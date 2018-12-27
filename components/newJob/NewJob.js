import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Divider, ListItem } from 'react-native-elements';
import * as Yup from 'yup';

import { connect } from 'react-redux';

import { appleRed, backgroundColor } from '../../assets';

import { addJob } from '../../redux/jobs';


const FormSchema = Yup.object().shape({
    title: Yup.string()
        .required('This field is required'),
    initial_fee: Yup.number()
        .typeError('Value must be a number')
        .required('This field is required'),
    location: Yup.object()
        .nullable(),
    category: Yup.object()
        .nullable()
        .required('This field is required'),
});


class NewJob extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {
            submit: () => { }
        } } = navigation.state

        return {
            headerTitle: "New job",
            headerRight: (
                <Button
                    title="Save"
                    onPress={params.submit}
                />
            ),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({
            submit: this._form.submitForm,
        })
    }

    locationToGeoJSON = (location) => {
        return {
            type: 'POINT',
            coordinates: [location.latitude, location.longitude],
        };
    }

    add = async (values) => {
        const { addJob } = this.props;
        console.warn(values);
        await addJob({
            ...values,
            category: values.category.id,
            location: this.locationToGeoJSON(values.location),
        });
        this.props.navigation.goBack();
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Formik
                    ref={(c) => { this._form = c; }}
                    initialValues={{
                        title: '',
                        initial_fee: '',
                        location: null,
                        category: null,
                        description: '',
                    }}
                    validationSchema={FormSchema}
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
                                textInputOnChangeText={props.handleChange('title')}
                                textInputOnBlur={props.handleBlur('title')}
                                subtitle={
                                    props.errors.title && props.touched.title
                                        ? props.errors.title
                                        : null
                                }
                                subtitleStyle={styles.error}
                                textInput
                                hideChevron
                            />
                            <Divider />
                            <ListItem
                                containerStyle={styles.listItemContainer}
                                title="Price [zł]"
                                textInputKeyboardType="decimal-pad"
                                textInputOnChangeText={props.handleChange('initial_fee')}
                                textInputOnBlur={props.handleBlur('initial_fee')}
                                subtitle={
                                    props.errors.initial_fee && props.touched.initial_fee
                                        ? props.errors.initial_fee
                                        : null
                                }
                                subtitleStyle={styles.error}
                                textInput
                                hideChevron
                            />
                            <Divider />
                            <ListItem
                                containerStyle={styles.listItemContainer}
                                title="Location"
                                onPress={() => navigation.navigate('LocationChooser', {
                                    onChoose: (val) => props.setFieldValue('location', val),
                                })}
                                rightTitle={
                                    props.values.location
                                        ? `${props.values.location.latitude.toFixed(3)}, ${props.values.location.longitude.toFixed(3)}`
                                        : 'No location'
                                }
                                subtitle={
                                    props.errors.location && props.touched.location
                                        ? props.errors.location
                                        : null
                                }
                                subtitleStyle={styles.error}
                            />
                            <Divider />
                            <ListItem
                                containerStyle={styles.listItemContainer}
                                title="Category"
                                onPress={() => navigation.navigate('CategoryChooser', {
                                    onChoose: (val) => props.setFieldValue('category', val),
                                })}
                                rightTitle={
                                    props.values.category
                                        ? props.values.category.name
                                        : null
                                }
                                subtitle={
                                    props.errors.category && props.touched.category
                                        ? props.errors.category
                                        : null
                                }
                                subtitleStyle={styles.error}
                            />
                            <Divider />
                            <Divider style={styles.divider} />
                            <Divider />
                            <TextInput
                                style={styles.description}
                                placeholder="Add description"
                                onChangeText={props.handleChange('description')}
                                onBlur={props.handleBlur('description')}
                                multiline
                            />
                            <Divider />
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
    description: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        height: 120,
    },
    error: {
        fontSize: 12,
        color: appleRed,
        fontWeight: 'normal',
    }
});

const mapStateToProps = state => ({});


const mapDispatchToProps = {
    addJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewJob);
