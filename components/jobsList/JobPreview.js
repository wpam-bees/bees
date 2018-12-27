import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';

import { deleteJob, markFinished } from '../../redux/jobs';

import { appleRed } from '../../assets';


class JobPreview extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {
            finish: () => {},
        } } = navigation.state;
        const job = navigation.state.params.job;

        return {
            headerTitle: job.title,
            headerRight: job.status === 'Marked finished'
                ? (
                    <Button
                        title="Finish"
                        onPress={params.finish || (() => {})}
                    />
                )
                : null,
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({
            finish: this.finish,
        })
    }

    finish = async () => {
        const { markFinished, navigation } = this.props;
        await markFinished(navigation.state.params.job);
        navigation.goBack();
    }

    delete = async () => {
        const { navigation, deleteJob } = this.props;
        await deleteJob(navigation.state.params.job);
        navigation.goBack();
    }

    render() {
        const job = this.props.navigation.state.params.job;
        return (
            <ScrollView>
                <ListItem
                    containerStyle={styles.listItemContainer}
                    title="Title"
                    rightTitle={job.title}
                    hideChevron
                />
                <Divider />
                <ListItem
                    containerStyle={styles.listItemContainer}
                    title="Price"
                    rightTitle={`${job.initial_fee} zł`}
                    hideChevron
                />
                <Divider />
                <ListItem
                    containerStyle={styles.listItemContainer}
                    title="Category"
                    rightTitle={job.category_name}
                    hideChevron
                />
                <Divider />
                <ListItem
                    containerStyle={styles.listItemContainer}
                    title="Location"
                    rightTitle={
                        job.location
                            ? job.location.coordinates.map(coord => coord.toFixed(3)).join(' ')
                            : 'No location'
                    }
                    hideChevron
                />
                <Divider />
                <ListItem
                    containerStyle={styles.listItemContainer}
                    title="Status"
                    rightTitle={job.status}
                    hideChevron
                />
                {
                    job.description
                        ? (
                            <View>
                                <Divider style={styles.divider} />
                                <Text style={styles.headerText}>Description</Text>
                                <Divider />
                                <ListItem
                                    containerStyle={styles.listItemContainer}
                                    title={job.description}
                                    titleNumberOfLines={null}
                                    hideChevron
                                />
                                <Divider />
                            </View>
                        )
                        : null
                }
                {
                    job.status === 'Awaiting for worker'
                        ? (<View>
                            <Divider style={styles.divider} />
                            <Divider />
                            <ListItem
                                title="Delete"
                                hideChevron
                                containerStyle={styles.listItemContainer}
                                titleStyle={{
                                    color: appleRed,
                                    textAlign: 'center',
                                }}
                                onPress={this.delete}
                            />
                            <Divider />
                        </View>)
                        : null
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    listItemContainer: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
    },
    divider: {
        backgroundColor: 'transparent',
        height: 20,
    },
    header: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        padding: 0,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingBottom: 3,
    },
});

const mapStateToProps = state => ({});


const mapDispatchToProps = {
    deleteJob,
    markFinished,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPreview);
