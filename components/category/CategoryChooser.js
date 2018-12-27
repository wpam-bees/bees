import React, { Component } from 'react';
import { StyleSheet, FlatList, Button, AlertIOS } from 'react-native';
import { Divider, ListItem, SearchBar } from 'react-native-elements';

import { connect } from 'react-redux';

import { fetchGroups, addGroup } from '../../redux/groups';

import { dividerGrey } from '../../assets';


class CategoryChooser extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {
            newCategory: () => {}
        } } = navigation.state

        return {
            headerTitle: 'Choose Group',
            headerRight: (
                <Button
                    title="New"
                    onPress={params.newCategory || (() => {})}
                />
            ),
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            isLoading: false,
        };

        props.fetchGroups();
    }

    componentDidMount() {
        this.props.navigation.setParams({
            newCategory: this.newCategory,
        })
    }

    newCategory = () => {
        AlertIOS.prompt(
            'New category',
            'Enter category name',
            (text) => this.props.addGroup({name: text}),
            'plain-text',
          );
    }

    onRefresh = async () => {
        const { fetchGroups } = this.props;
        await this.setState({ isLoading: true });
        await fetchGroups();
        await this.setState({ isLoading: false });
    }

    choose = (item) => {
        const { navigation: { state: { params: { onChoose } }, goBack } } = this.props;
        onChoose(item);
        goBack();
    }

    filterGroups = (groups, query = '') => groups.filter(
        group => group.name.toLowerCase().startsWith(query.toLowerCase()),
    );

    renderSearch = () => (
        <SearchBar
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
            placeholder="Search"
            onChangeText={query => this.setState({ query })}
        />
    )

    renderRow = row => (
        <ListItem
            title={row.item.name}
            containerStyle={styles.listItem}
            onPress={() => this.choose(row.item)}
            hideChevron
        />
    )

    renderEmpty = () => {
        return (
            <ListItem
                title="No groups found"
                containerStyle={styles.emptyItem}
                titleStyle={styles.emptyItemText}
                hideChevron
            />
        );
    }

    render() {
        const { groups } = this.props;
        const { query, isLoading } = this.state;
        return (
            <FlatList
                data={this.filterGroups(groups, query)}
                ListHeaderComponent={this.renderSearch}
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={() => (<Divider />)}
                renderItem={this.renderRow}
                keyExtractor={item => String(item.id)}
                onRefresh={this.onRefresh}
                refreshing={isLoading}
            />
        );
    }
}

const styles = StyleSheet.create({
    searchInput: {
        backgroundColor: 'rgb(223, 226, 232)',
        borderRadius: 10,
    },
    divider: {
        backgroundColor: dividerGrey,
    },
    searchContainer: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderBottomColor: dividerGrey,
        borderBottomWidth: StyleSheet.hairlineWidth,
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
    groups: state.groups,
});


const mapDispatchToProps = {
    fetchGroups,
    addGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryChooser);
