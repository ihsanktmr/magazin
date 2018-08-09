//this is most upper view of the main page

import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Alert, Dimensions, StatusBar} from 'react-native';
import {withNavigation} from "react-navigation";
import Spinner from 'react-native-spinkit';

let deviceWidth = Dimensions.get('window').width / 2;
let deviceHeight = Dimensions.get('window').height / 2;
let buttonWidth = Dimensions.get('window').width / 4;

class Cover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

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

    makeRemoteRequest = () => {

        const url = `https://www.neocrea.com.tr/magazin/json.php`;
        this.setState({loading: true});

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: this.serializeKey({
                islem: "dergiler",
                limit: 1
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.dergiler,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({error});
                console.log(error)
            });
    };

    changePage = () => {
        this.props.navigation.navigate('Trypayment')
    };

    render() {

        return (

            this.state.data.map((data) => (

                    <View style={styles.mainContainer}>

                        <View style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Spinner isVisible={this.state.loading} type={"Pulse"} size={50} color={"black"}/>
                        </View>

                        <StatusBar
                            backgroundColor="transparent"
                            barStyle="dark-content"
                            translucent={true}
                        />

                        <View style={styles.imageView}>
                            <Image
                                style={{width: '100%', height: '100%'}} //burasını katalog appin androidinde de düzelt
                                source={{uri: data.image}}
                            />
                        </View>

                        <View style={styles.viewBody}>
                            <Text style={styles.titleText}>SON ÇIKAN</Text>
                            <Text style={styles.bodyText}>{((data.isim).length > 65) ? (((data.isim).substring(0, 65 - 3)) + '...') : data.isim}</Text>

                            <Text style={styles.sayiText}>{data.tarih} {data.sayi}. Sayı</Text>

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity
                                    style={styles.purchaseButton}
                                    onPress={this.changePage}
                                >
                                    <Text style={styles.purchaseButtonText}> Sayıyı Satın Al </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.aboneButton}
                                    onPress={this.changePage}
                                >
                                    <Text style={styles.aboneButtonText}> Abone Ol </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                )
            ))
    }


}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 0,
        shadowColor: '#000',
        elevation: 15,

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    purchaseButton: {
        alignItems: 'center',
        backgroundColor: 'white',
        width: buttonWidth,
        borderWidth: 2.1,
        borderColor: '#3f3f3f',
        borderRadius: 10,
        marginVertical:5
    },
    aboneButton: {
        alignItems: 'center',
        backgroundColor: 'white',
        width: buttonWidth,
        borderWidth: 2.1,
        borderColor: '#3f3f3f',
        borderRadius: 10,
        marginVertical:5
    },
    purchaseButtonText: {
        color: 'green',
        fontSize: 10,
        padding: 4,
    },
    aboneButtonText: {
        color: 'red',
        fontSize: 10,
        padding: 4,
    },
    bodyText: {
        color: '#3f3f3f',
        fontSize: 12.5,
        marginTop: 4,
    },
    sayiText: {
        color: 'grey',
        fontSize: 10.5,
        marginTop: 10,
    },
    titleText: {
        color: '#3f3f3f',
        fontWeight: 'bold',
        fontSize: 15,
    },
    viewBody: {
        flex: 1,
        padding: 10
    },
    viewImage: {
        flex: 1,
    },
    imageView: {
        flex: 1,
       // width: deviceWidth,
    //    height: deviceHeight,
    },

});


export default withNavigation(Cover);