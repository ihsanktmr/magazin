import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    FlatList,
    Button,
    Dimensions, ScrollView,
    Alert, TouchableOpacity
} from 'react-native';

import Spinner from 'react-native-spinkit';
import {List} from "react-native-elements";
import InAppBilling from 'react-native-billing';
import {aldiysanSetEt, Apple} from "../payment/Buycontainer";
import {withNavigationFocus} from "react-navigation";

let deviceWidth = Dimensions.get('window').width / 3.4;
let deviceHeight = Dimensions.get('window').height / 3.2;

let topluVeriler = [];

let apple = new Apple('macintosh');


let multipleSearchArray = [100, 110, 120];

class Homemymagazine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            refreshing: false,
            allPurchases: []
        };

    }

    componentDidMount() {
        console.log(this.state.allPurchases);
        this.setState({loading: true});
        this.listOwnedProducts();
        setTimeout(() => {
            this.searchBring();
        }, 100);

    }

    componentWillReceiveProps(prevState,nextState) {
        console.log(this.state.allPurchases);

        setTimeout(() => {
            this.listOwnedProducts();
            this.searchBring();
        }, 1000);
    }

    listOwnedProducts = async () => { //1-alerti çalıştır 2-ispurchasedi çalıştır(gerçi çalıştı)
        await InAppBilling.close();
        try {
            await InAppBilling.open();
            InAppBilling.listOwnedProducts().then(details => this.setState({allPurchases: details}));
            Alert.alert("Owned Products request result : " + details);
            await InAppBilling.close();

        } catch (err) {
            this.setState({error: JSON.stringify(err)});
            await InAppBilling.close();
        }
    };

    fixTheArray(param) {

        let multipleSearchToString = "";
        let multipleSearchReplace = "";

        multipleSearchToString = param.toString();
        multipleSearchToString = multipleSearchToString.replace(/,/g, " "); // hepsini degistirebiliyoruz artık kıyaks .

        return multipleSearchToString;

    };

    serializeKey(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody;
    }

    searchBring = () => {

        const url = `https://www.neocrea.com.tr/magazin/json.php`;
        this.setState({isSearched: true, loading: true, refreshing: true});
        const {params} = this.props.navigation.state;

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: this.serializeKey({
                islem: "dergi_bul_coklu",
                sayisi: this.fixTheArray(this.state.allPurchases)//params ? params.denemeAllPurchases : ""
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    loading: false,
                    refreshing: false,
                    data: res.dergiler
                })
            })
            .catch(error => {
                this.setState({error, loading: false});
                console.log(error)
            });
    };


    goPdfPage = (item) => {
        this.props.navigation.navigate('Openpdf', item);
    };

    handleRefresh = () => {
        this.setState(
            {
                data: this.state.data,
            },
            () => {
                this.searchBring();
            }
        );
    };


    render() {

        //    const { params } = this.props.navigation.state;
        //   params ? multipleSearchArray.push(params.alinanSayi) : console.log("bisey gelmedi");

        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                <List containerStyle={{
                    marginTop: 0,
                    marginBottom: 60,
                    alignItems: 'center',
                    paddingBottom: deviceHeight / 15
                }}>

                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15,}}>
                        <Text style={styles.ButtonInsideText}> SATIN ALDIKLARIM </Text>
                    </View>

                    <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 80,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Spinner isVisible={this.state.loading} type={"Pulse"} size={50} color={"black"}/>
                    </View>
                    <FlatList

                        data={this.state.data}
                        renderItem={({item}) => (

                            <TouchableWithoutFeedback onPress={() => this.goPdfPage(item)}>
                                <View style={styles.container}>
                                    <Image style={styles.image}
                                           source={{uri: item.image}}
                                    />
                                    <View style={{flex: 1}}>
                                        <View style={{flex: 2, justifyContent: 'center'}}>

                                            <Text
                                                style={styles.gridTextIsim}>

                                                {((item.isim).length > 31) ? (((item.isim).substring(0, 31 - 3)) + '...') : item.isim}
                                            </Text>
                                        </View>
                                        <View style={{flex: 1, justifyContent: 'center'}}>
                                            <Text
                                                style={styles.gridTextSayi}>
                                                {item.tarih + " " + item.sayisi + ".Sayı"}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={item => item.ID}
                        numColumns={3}
                        key={'THREE COLUMN'}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}
                    />
                </List>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    ButtonInsideText: {
        margin: 18,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '80%',
        height: 22,
        color: '#3f3f3f',
        fontWeight: 'bold',
        fontSize: 15,
        backgroundColor: 'white',

    },
    viewText: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '74%',
    },
    container: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginBottom: 10,
        borderWidth: 0,
        shadowColor: '#000',
        elevation: 5,
        opacity: 1
    },
    containerYok: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginBottom: 10,
        borderWidth: 0,
        shadowColor: '#000',
        elevation: 5,
        opacity: 0
    },
    gridTextIsim: {
        fontSize: 12,
        color: '#3f3f3f',
        marginLeft: 3
    },
    gridTextSayi: {
        fontSize: 9.5,
        color: 'grey',
        justifyContent: 'center',
        marginLeft: 1.8,
        marginBottom: 2
    },

});

export default withNavigationFocus(Homemymagazine);


/* const { params } = this.props.navigation.state;
        if (params) {
            this.setState({gelenIsim:params.name});
            this.setState({gelenNumber:params.number});
            this.setState({gelenDate:params.date});
            this.setState({gelenDergi:params.dergi});
            this.setState({gelenImage:params.image});

            let gelenVeriler = [];

            let verilerinDonduguYer = [
                {
                    isim: this.state.gelenIsim,
                    number: this.state.gelenNumber,
                    date: this.state.gelenDate,
                    dergi: this.state.gelenDergi,
                    image: this.state.gelenImage
                }
            ];
            gelenVeriler.push(verilerinDonduguYer)
            this.setState({topluVeriler: gelenVeriler})
            console.log(this.state.topluVeriler)

        } else {
            console.log("-")
        }*/

// console.log(this.props.isFocused ? 'Focused' : 'Not focused'+ this.searchBring());