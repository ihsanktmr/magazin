import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    StatusBar,
    Button,
    TextInput,
    Alert
} from 'react-native';
import InAppBilling from 'react-native-billing';
import {withNavigation, NavigationActions, TabNavigator} from "react-navigation";

import Homemymagazine from "../mymagazine/Homemymagazine";


let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let buttonWidth = Dimensions.get('window').width / 3;


export function Apple(type) {
    this.type = type;
    this.color = "";
    this.getInfo = getAppleInfo;
}

export function getAppleInfo() {
    return this.color + ' ' + this.type;
}

export var person = {   //diger sayfada buradan degisiklik yapmamız lazim.. Gunaydın...
    firstName: 'Jimmy',
    lastName: 'Smith',
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    },
    set fullName(name) {
        let words = name.toString().split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    }
};

const defaultState = {
    productDetails: null,
    transactionDetails: null,
    consumed: false,
    error: null,
    token: "",
    orderId: "",
    allPurchases: [],
    isPurchasedState: false,
};

class Buycontainer extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                satinAldikMi: false,
                sayistate: 200,
                someText: "Hadi oglum",
                switcher: false,
                sayisiForArray: "170",
                productId: "android.test.purchased",
                ...defaultState
            };
    }


    fixTheArray(param) {

        let multipleSearchToString = "";
        let multipleSearchReplace = "";
        multipleSearchToString = param.toString();
        multipleSearchToString = multipleSearchToString.replace(/,/g, " "); // hepsini degistirebiliyoruz artık kıyaks .
        // "\"" + this.props.sayisi + "\""     ==> degiskeni tırnak icinde tırnakla yazma
        Alert.alert(multipleSearchToString);

        return multipleSearchToString;
    };

    resetState = () => {
        this.setState(defaultState);
    };

    componentDidMount() {
        this.isPurchased();
    }

    purchaseProduct = async () => {
        await InAppBilling.close();
        try {
            this.resetState();
            await InAppBilling.open();
            const details = await InAppBilling.purchase(this.props.sayisi.toString());
            await InAppBilling.close();
            this.setState({transactionDetails: details});
            console.log(JSON.stringify(details));
            await this.isPurchased();
            //this.purchaseAndFixEvent() // burası array burdayken denediğim fonksiyon
        } catch (err) {
            this.setState({error: JSON.stringify(err), isPurchasedState: false});
            await InAppBilling.close();
        }
    };

    isPurchased = async () => {
        await InAppBilling.close();
        try {
            this.resetState();
            await InAppBilling.open();
            InAppBilling.isPurchased(this.props.sayisi.toString()).then(details => this.setState({isPurchasedState: details.toString()}));
            await InAppBilling.close();
         //   Alert.alert(this.props.sayisi + ".Sayi satın alinmis mi ? = " + this.state.isPurchasedState);
        } catch (err) {
            this.setState({error: JSON.stringify(err)});
            await InAppBilling.close();
        }
    };

    goPdfPage = (event) => {
        // onPress event fires with an event object
        const {navigate} = this.props.navigation;
        navigate('Openpdf', {
            PDF: this.props.PDF,
        })

    };

    dispatchParams = () => {
        if (this.props.keyParameter.length > 0) {

            const setParamsAction = NavigationActions.setParams({
                params: {
                    allPurchases: this.state.allPurchases,
                    alinanSayi: this.props.sayisi,
                    switcher: this.state.switcher,
                    denemeAllPurchases: this.fixTheArray(this.state.allPurchases)
                },
                key: this.props.keyParameter,
            });
            this.props.navigation.dispatch(setParamsAction);
            Alert.alert("İletildi");
        }
    }; // çok onemli tekrardan üzerinden geçilecek
    purchaseAndFixEvent = () => {
        this.state.allPurchases.push(this.props.sayisi) && this.fixTheArray(this.state.allPurchases);
        setTimeout(() => {
            this.dispatchParams();
        }, 100);

    }; // farklı yontem sonra tekrar bakılacak
    updateProductId = productId => {
        this.setState({productId});
    }; // ilerde gerekli olabilir
    getPurchaseTransactionDetails = async () => {
        try {
            await InAppBilling.close();
            await InAppBilling.open();
            const details = await InAppBilling.getPurchaseTransactionDetails();
            await InAppBilling.close();
            this.setState({orderId: details.orderId});
            console.log(this.state.orderId);
        } catch (err) {
            console.log(err);
            await InAppBilling.close();
        }
    }; // orderID çektiğimiz fonksiyon

    render() {
        // const Homemymagazinekey = this.props.screenProps.keys.find((key) => (key.routeName === 'Mymagazine')).key;

        let satin_al_text = "Sayıyı satın al";
        let goruntule_text = "Dergiyi Görüntüle";

        return (

            <ScrollView contentContainerStyle={styles.mainView}>
                <View style={{
                    width: deviceWidth,
                    height: deviceHeight / 1.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={{width: '83%', height: '100%'}}
                           source={{uri: this.props.image}}
                    />

                </View>

                <Text style={{
                    fontWeight: 'bold',
                    paddingHorizontal: 2,
                    fontSize: deviceWidth / 25,
                    color: '#3f3f3f',
                    textAlign: 'center',
                    marginTop: 7
                }}> {this.props.sayisi}.Sayı {"-"} {this.props.tarih}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 7}}>


                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={.5}
                        onPress={this.state.isPurchasedState === 'true' ? () => this.goPdfPage() : this.purchaseProduct}
                    >
                        <Text style={styles.satinAlText}>
                            {this.state.isPurchasedState === 'true' ? goruntule_text : satin_al_text}
                        </Text>


                    </TouchableOpacity>

                </View>

                <Text style={{fontSize: 15, color: 'black', textAlign: 'justify', margin: 11}}>
                    {this.props.isim}

                </Text>

            </ScrollView>
        )
    }


}

const styles = StyleSheet.create({
    satinAlText: {
        color: 'green',
        fontSize: 13.3,
        padding: 4,
    },
    aboneOlText: {
        color: 'red',
        fontSize: 13.3,
        padding: 4,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: deviceWidth / 3,
        height: deviceHeight / 18,
        borderWidth: 2.1,
        borderColor: '#3f3f3f',
        borderRadius: 15,
        marginHorizontal: 7
    },
    sayiText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#3f3f3f',
    },
    mainView: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    }


});


export default withNavigation(Buycontainer);