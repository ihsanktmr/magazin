import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    FlatList,
    Dimensions
} from 'react-native';

import Spinner from 'react-native-spinkit';
import {List, SearchBar} from "react-native-elements";
import {withNavigation} from 'react-navigation';

/* border color white in List Componenet is needed because remove the line
   which is located upperside of list*/


let deviceWidth = Dimensions.get('window').width / 3.4;
let deviceHeight = Dimensions.get('window').height / 3.2;

class Past extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageload: 5,
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

    handleLoadMore = () => {
        this.setState(
            {
                pageload: this.state.pageload + 3
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

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
                limit: this.state.pageload

            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.dergiler
                });
            })
            .catch(error = () => console.log(error));
    };

    goToPayment = (item) => {
        this.props.navigation.navigate('Payment', item);
    };

    render() {
        return (
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

                <View style={styles.textAndButtonView}>

                    <Text style={styles.suggestions}>GEÇMİŞ SAYILAR</Text>


                    <TouchableOpacity

                        style={styles.suggestButton}
                        onPress={() => this.props.navigation.navigate('Search')}
                    >
                        <Text style={{color: 'blue', fontSize: 12}}> Hepsini gör > </Text>
                    </TouchableOpacity>

                </View>
                <View style={{flex: 8}}>
                    <List containerStyle={styles.list}>
                        <FlatList

                            data={this.state.data}
                            renderItem={({item}) => (

                                <TouchableWithoutFeedback onPress={() => this.goToPayment(item)}>
                                    <View style={styles.container}>
                                        <Image style={styles.image}
                                               source={{uri: item.image}}
                                        />
                                        <View style={{ flex: 1}}>
                                            <Text style={{fontSize: 12, color: '#3f3f3f',marginTop:1.75}}>
                                                {((item.isim).length > 18) ?
                                                    (((item.isim).substring(0, 18 - 3)) + '...') :
                                                    item.isim}
                                            </Text>
                                            <Text style={{fontSize: 10, color: 'grey',marginTop:2.5}}>
                                                {item.tarih + " " + item.sayisi + ".Sayı"}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                            horizontal={true}
                            //  ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor={item => item.ID}
                            ListHeaderComponent={this.renderHeader}
                            ListFooterComponent={this.renderFooter}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={0.20}
                            numColumns={1}
                            key={'THREE COLUMN'}
                        />
                    </List>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    ButtonInsideText: {
        color: 'blue',
        width: '80%',
        height: 22,
    },
    image: {
        width: '100%',
        height: '74%',//burası 80 idi
    },
    container: {
        flex:1,
      //  width: deviceWidth/1.075,   // bu kısım cıkarılıp üstteki flex:1 eklendi
     //   height: deviceHeight,
        marginHorizontal: 5,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 0,
        elevation: 5,
        backgroundColor: 'white',
    },
    suggestions: {
        color: '#3f3f3f',
        fontWeight: 'bold',
        fontSize: 15,
        backgroundColor: 'white',

    },
    list: {
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAndButtonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 7.5,
        alignItems: 'center',
        marginBottom: -8
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    suggestButton: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    }

});

export default withNavigation(Past);

