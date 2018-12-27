import React, { Component } from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';

import { fetchPastJobs } from '../../redux/jobs';

import { backgroundColor } from '../../assets';


class PastJobs extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Past jobs",
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

        props.fetchPastJobs();
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
                data={this.props.pastJobs}
                renderItem={this.renderRow}
                ListEmptyComponent={this.renderEmpty}
                keyExtractor={item => String(item.id)}
                ItemSeparatorComponent={() => (<Divider />)}
                onRefresh={this.props.fetchPastJobs}
                refreshing={this.props.jobsLoading}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor,
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
    pastJobs: state.jobs.past,
    jobsLoading: state.jobs.isLoading,
});


const mapDispatchToProps = {
    fetchPastJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(PastJobs);
