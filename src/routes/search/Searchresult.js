import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    Dimensions, StatusBar,
} from 'react-native';

import { Icon} from 'native-base';

import Spinner from 'react-native-spinkit';

/* this margintop 0 is needed because remove the line
   which is located upperside of list*/

import {List} from "react-native-elements";


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

let deviceWidth = Dimensions.get('window').width / 3.4;
let deviceHeight = Dimensions.get('window').height / 3;

class Searchresultpage extends Component {

    constructor(props) {

        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            text: "",
            searchResult: [],
            textSearchedState: "",
        };
    }

    componentDidMount() {
        this.searchBring();
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

    renderHeader = () => {
        return <View style={styles.renderHeader}>
            <TouchableOpacity
                style={styles.gridListButton}
                activeOpacity={.5}
                onPress={this.ChangeGridValueFunction}>

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                    <Icon name='list' style={this.state.GridColumnsValue ? styles.pressed : styles.normal}/>

                    <Icon name='grid' style={this.state.GridColumnsValue ? styles.normal : styles.pressed}/>


                </View>
            </TouchableOpacity>
            <View
                style={styles.renderSeparatorList}
            />
        </View>;

    };

    renderFooter = () => {

        if (!this.state.loading) return null;

        return (
            <Spinner isVisible={!this.state.loading} type={"Circle"} size={100} color={"#000"}/>
        );
    };

    ChangeGridValueFunction = () => {
        if (this.state.GridColumnsValue === true) {
            this.setState({
                GridColumnsValue: false,
            })
        }
        else {
            this.setState({
                GridColumnsValue: true,
            })
        }
    };

    searchBring = () => {
        const {textSearched} = this.props.navigation.state.params;
        const url = `https://www.neocrea.com.tr/magazin/json.php`;
        this.setState({loading: true});

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: this.serializeKey({
                islem: "dergi_bul",
                sayisi: textSearched
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    searchResult: res.dergiler,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
                console.log(error)
            });
    };

    handleOnChange = (text) => {
        this.setState({text: text});
        if (!text) this.setState({isSearched: false});
    };

    goToPayment = (item) => {
        this.props.navigation.navigate('Payment', item);
    };

    render() {

        return (

            // this.setState({textSearchedState: textSearched});
            //burayı daha sonra eklicem bordertopwidth kısmını
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <StatusBar
                    backgroundColor="transparent"
                    barStyle="dark-content"
                    translucent={true}
                />

              {/*  <View style={ this.state.searchResult && this.state.searchResult.length>0 ? styles.sonucBulunduStyle:styles.sonucBulunamadiStyle}>

                    <Text> Sonuç Bulunamadı</Text>

                </View>*/}

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

                <List containerStyle={{
                    marginTop: 0,
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}>
                    <FlatList
                        contentContainerStyle={styles.paddingStyleGrid}
                        data={this.state.searchResult}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback onPress={() => this.goToPayment(item)}>
                                <View
                                    style={styles.viewContainerGrid}>
                                    <Image style={styles.gridImage}
                                           source={{uri: item.image}}
                                    />
                                    <View style={{flex: 1}}>
                                        <View style={{flex: 2, justifyContent: 'center'}}>

                                            <Text
                                                style={styles.gridTextIsim}>
                                                {((item.isim).length > 35) ? (((item.isim).substring(0, 35 - 3)) + '...') : item.isim}
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
                        numColumns={this.state.GridColumnsValue ? 1 : 3}
                        key={(this.state.GridColumnsValue) ? 'ONE COLUMN' : 'THREE COLUMN'}
                        //     ItemSeparatorComponent={this.renderSeparator}
                        //     ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                        //     onRefresh={this.handleRefresh}
                        //     refreshing={this.state.refreshing}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.20}
                    />
                </List>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    gridListButton: {
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 5,
        height: 22,
    },
    normal: {
        color: '#3f3f3f',
        textAlign: 'center',
        width: 27,
        height: 27,
    },
    pressed: {
        color: 'green',
        textAlign: 'center',
        width: 30,
        height: 30,

    },
    gridImage: {
        width: '100%',
        height: '74%',
    },
    gridTextIsim: {
        fontSize: 11,
        color: 'black',
        marginLeft: 1.8,
    },
    gridTextSayi: {
        fontSize: 9.5,
        color: 'grey',
        justifyContent: 'center',
        marginLeft: 1.8,
        marginBottom: 2
    },
    viewContainerGrid: {
        height: deviceHeight/1.2,
        width: deviceWidth,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 0,
        shadowColor: '#000',
        elevation: 5,
        paddingBottom:7.5,
    },
    hepsiniGetirButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: windowWidth / 4,
        height: windowHeight / 25,
        borderWidth: 2.1,
        borderColor: '#3ba4ef',
        borderRadius: 10
    },
    getirButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: windowWidth / 6,
        height: windowHeight / 25,
        borderWidth: 2.1,
        borderColor: '#3ba4ef',
        borderRadius: 10,
        marginRight: 4
    },
    ButtonInsideText: {
        color: 'green',
        fontSize: 10,
    },
    renderFooter: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
    },
    renderHeader: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7
    },
    renderSeparator: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "5%"
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: windowHeight / 12.5,
        width: null,
    },
    searchBar: {
        height: deviceHeight / 5,
        width: deviceWidth * 2,
        borderColor: '#3f3f3f',
        borderRadius: 15,
        backgroundColor: 'white',
        borderWidth: 2.1,
        marginRight: 3,
    },
    renderSeparatorList: {
        height: 1.85,
        width: "25%",
        backgroundColor: "#3f3f3f",
        marginVertical: 15,
    },
    paddingStyleList: {     //  bu paddingler sağdakı scroll çubuğunu contentlerden uzaklaştırmak için...
        paddingHorizontal: 40,
    },
    paddingStyleGrid: {
        paddingHorizontal: 3
    },
    sonucBulunamadiStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9
    },
    sonucBulunduStyle: {
        height:0,width:0,
        opacity: 0
    }
});

export default Searchresultpage;
