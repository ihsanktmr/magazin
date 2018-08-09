import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    FlatList,
    Alert,
    Button,
    TextInput, Dimensions, StatusBar
} from 'react-native';

import Spinner from 'react-native-spinkit';

import {List, SearchBar} from "react-native-elements";

let deviceWidth = Dimensions.get('window').width / 3.4;
let deviceHeight = Dimensions.get('window').height / 3.2;

class Homemymagazine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
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
                limit: 11
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.dergiler,
                    loading: false
                });
            })
            .catch(error = () => console.log(error));
    };

    goPdfPage = (item) => {
        this.props.navigation.navigate('Openpdf', item);
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="dark-content"
                    translucent={true}
                />
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

                <List containerStyle={{marginTop: 0,
                    marginBottom: 60,
                    alignItems: 'center',
                    paddingBottom: deviceHeight/15}}>

                    <View style={{justifyContent: 'center', alignItems: 'center',marginTop:15,}}>
                        <Text style={styles.ButtonInsideText}> SATIN ALDIKLARIM </Text>
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
                    />
                </List>
            </View>
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
        marginBottom:2
    },

});

export default Homemymagazine;

