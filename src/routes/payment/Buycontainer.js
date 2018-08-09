import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView} from 'react-native';
import InAppBilling from 'react-native-billing';
import {withNavigation} from "react-navigation";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let buttonWidth = Dimensions.get('window').width / 3;

class Buycontainer extends Component {
    constructor(props) {
        super(props);
        this.pdf = null;
    }


    goAndBuy = () => {
        InAppBilling.open()
            .then(() => InAppBilling.purchase(this.props.sayisi))
            .then(details => {
                console.log("You purchased: ", details);
                return InAppBilling.close();
            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {

        return (


            <ScrollView contentContainerStyle={styles.mainView}>

                <View style={{
                    width: deviceWidth,
                    height: deviceHeight/1.4,
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
                    marginTop:7
                }}> {this.props.sayisi}.Sayı {"-"} {this.props.tarih}</Text>


                    <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center',marginTop:7}}>
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={.5}
                            onPress={this.goAndBuy}
                        >
                            <Text style={styles.satinAlText}>
                                Sayıyı Satın Al
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={.5}
                        >
                            <Text style={styles.aboneOlText}>
                               Abone Ol
                            </Text>

                        </TouchableOpacity>
                    </View>

                <Text style={{fontSize: 15, color: 'black', textAlign: 'justify', margin:11}}>
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
        marginHorizontal:7
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