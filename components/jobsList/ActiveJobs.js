import React, { Component } from 'react';
import { StyleSheet, FlatList, Button, ScrollView } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';

import { fetchActiveJobs } from '../../redux/jobs';


class ActiveJobs extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Active jobs",
            headerRight: (
                <Button
                    title="Add"
                    onPress={() => navigation.navigate('NewJob')}
                />
            ),
        };
    };

    constructor(props) {
        super(props);

        props.fetchActiveJobs();
    }

    renderRow = row => (
        <ListItem
            title={row.item.title}
            subtitle={row.item.status}
            containerStyle={styles.listItem}
            onPress={() => this.props.navigation.navigate('JobPreview', {
                job: row.item,
            })}
            hideChevron
        />
    )

    renderEmpty = () => (
        <ListItem
            title="No active jobs"
            containerStyle={styles.emptyItem}
            titleStyle={styles.emptyItemText}
            hideChevron
        />
    );

    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.props.activeJobs}
                renderItem={this.renderRow}
                ListEmptyComponent={this.renderEmpty}
                keyExtractor={item => String(item.id)}
                ItemSeparatorComponent={() => (<Divider />)}
                onRefresh={this.props.fetchActiveJobs}
                refreshing={this.props.jobsLoading}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
    },
    emptyItem: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomWidth: 0,
    },
    emptyItemText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

const mapStateToProps = state => ({
    activeJobs: state.jobs.active,
    jobsLoading: state.jobs.isLoading,
});


const mapDispatchToProps = {
    fetchActiveJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);
