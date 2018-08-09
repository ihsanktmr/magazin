import React, {Component} from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Picker,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";
import Spinner from 'react-native-spinkit';

import { List, ListItem, SearchBar } from "react-native-elements";

import ModalDropdown from 'react-native-modal-dropdown';

import InAppBilling from "react-native-billing";

const defaultState = {
    productDetails: null,
    transactionDetails: null,
    consumed: false,
    error: null
};

export default class Trypayment extends Component {



    /* state = {
         productId: "deneme",
         ...defaultState
     };

     resetState = () => {
         this.setState(defaultState);
     };

     getProductDetails = async () => {
         try {
             this.resetState();
             await InAppBilling.open();
             const details = await InAppBilling.getProductDetails(
                 this.state.productId
             );
             await InAppBilling.close();
             this.setState({ productDetails: JSON.stringify(details) });
         } catch (err) {
             this.setState({ error: JSON.stringify(err) });
             await InAppBilling.close();
         }
     };

     purchaseProduct = async () => {
         try {
             this.resetState();
             await InAppBilling.open();
             const details = await InAppBilling.purchase(this.state.productId);
             await InAppBilling.close();
             this.setState({ transactionDetails: JSON.stringify(details) });
         } catch (err) {
             this.setState({ error: JSON.stringify(err) });
             await InAppBilling.close();
         }
     };

     consumePurchase = async () => {
         try {
             this.resetState();
             await InAppBilling.open();
             await InAppBilling.consumePurchase(this.state.productId);
             await InAppBilling.close();
             this.setState({ consumed: true });
         } catch (err) {
             this.setState({ error: JSON.stringify(err) });
             await InAppBilling.close();
         }
     };

     updateProductId = productId => {
         this.setState({ productId });
     };
 */


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });

            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        data: page === 1 ? res.results : [...this.state.data, ...res.results],
                        error: res.error || null,
                        loading: false,
                        refreshing: false
                    });
                })
                .catch(error => {
                    this.setState({ error, loading: false });
                });

    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };


    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {

        return (

            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.name.first} ${item.name.last}`}
                            subtitle={item.email}
                            avatar={{ uri: item.picture.thumbnail }}
                            containerStyle={{ borderBottomWidth: 0 }}
                        />
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                //    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={175}
                />
            </List>
        );
    }
}

/*
<View style={styles.container}>
    <TextInput
        onChangeText={this.updateProductId}
        value={this.state.productId}
    />
    <Button onPress={this.getProductDetails} title="Get product details" />
    {this.state.productDetails && (
        <Text style={styles.text}>{this.state.productDetails}</Text>
    )}
    <Button
        onPress={this.purchaseProduct}
        title={"Purchase " + this.state.productId}
    />
    {this.state.transactionDetails && (
        <Text style={styles.text}>{this.state.transactionDetails}</Text>
    )}
    <Button
        onPress={this.consumePurchase}
        title={"Consume " + this.state.productId}
    />
    {this.state.consumed && (
        <Text style={styles.text}>Purchase consumed</Text>
    )}
    {this.state.error && (
        <Text style={[styles.text, { color: "red", marginTop: 10 }]}>
            Error:{"\n"}
            {this.state.error}
        </Text>
    )}
</View>  */


/*


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    text: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    }
});*/


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d35400',
    },

    spinner: {
        marginBottom: 50
    },

    btn: {
        marginTop: 20
    },

    text: {
        color: "white"
    }
});
