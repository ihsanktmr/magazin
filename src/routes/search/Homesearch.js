import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Picker,
    TouchableWithoutFeedback,
    Dimensions, StatusBar, Navigator
} from 'react-native';

import {Content, Icon} from 'native-base';

import Spinner from 'react-native-spinkit';

/* this margintop 0 is needed because remove the line
   which is located upperside of list*/

import {List} from "react-native-elements";

import ModalDropdown from 'react-native-modal-dropdown';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

let deviceWidth = Dimensions.get('window').width / 3.4;
let deviceHeight = Dimensions.get('window').height / 3.2;

class Searchpage extends Component {

    constructor(props) {

        super(props);
        this.state = {
            loading: false,
            data: [],
            dataForPicker: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            GridColumnsValue: true,
            ButtonDefaultText: 'CHANGE TO GRIDVIEW',
            text: "",
            sayisi: 0,
            fullData: [],
            searchResult: [],
            isSearched: false,
            pageload: 6,
            whichStyle: false,
            isText: false
        };
        this.makeRemoteRequestForPicker();
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

    componentDidMount() {
        if (this.state.isSearched === true) this.searchBring(this.state.sayisi);
        else this.makeRemoteRequest();
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
                limit: this.state.pageload
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.dergiler,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
                console.log(error)
            });
    };

    makeRemoteRequestForPicker = () => {
        const url = `https://www.neocrea.com.tr/magazin/json.php`;

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: this.serializeKey({
                islem: "dergiler",
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    dataForPicker: res.dergiler,
                });
            })
            .catch(error = () => console.log(error));
    };

    handleRefresh = () => {
        this.setState(
            {
                pageload: this.state.pageload,
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                pageload: this.state.pageload + 2,
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={styles.renderSeparator}
            />
        );
    };

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
                style={this.state.GridColumnsValue ? styles.renderSeparatorList : styles.renderSeparatorGrid}
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

        const url = `https://www.neocrea.com.tr/magazin/json.php`;
        this.setState({isSearched: true, loading: true});

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: this.serializeKey({
                islem: "dergi_bul",
                //   isim: this.state.text,
                sayisi: this.state.sayisi
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    searchResult: res.dergiler,
                    loading: false
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

    bringAll = () => {
        this.setState({isSearched: false})
    };


    goToPayment = (item) => {
        this.props.navigation.navigate('Payment', item);
    };

    onTagSelect = (idx, data) => {  //search functionı için

        this.props.navigation.navigate('Payment', data);

        // this.setState({sayisi: data.sayisi}) // buna falan gerek yokmuş ama ilerde olabilir dursun zararsız
    };

    render() {

        //burayı daha sonra eklicem bordertopwidth kısmını
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
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

                <List containerStyle={{
                    marginTop: 0,
                    alignItems: 'center',
                    paddingBottom: deviceHeight / 3.3,
                }}>

                    <View style={styles.headerView}>
                        <View style={styles.pickerView}>


                            <ModalDropdown options={this.state.dataForPicker}
                                           onSelect={(idx, data) => {
                                               this.onTagSelect(idx, data)
                                           }}
                                           renderRow={({sayisi}) => <Text style={{
                                               marginRight: 35,
                                               marginBottom: 6,
                                               color: 'black',
                                               fontSize: 12
                                           }}>{sayisi}.Sayı</Text>}
                                           renderButtonText={({sayisi}) => sayisi}
                                           dropdownStyle={{padding: 6}}
                                           animated={true}
                                           textStyle={{color: 'green', fontSize: 10}}
                                           style={{paddingHorizontal: 2}}
                                           defaultValue={"Getirmek istediğiniz dergi için tıklayınız"}
                                           showsVerticalScrollIndicator={true}
                                           dropdownTextStyle={{fontSize: 9, paddingHorizontal: 25}}
                                           enableEmptySections/>

                            {/* <Picker
                                note
                                selectedValue={this.state.sayisi}
                                style={styles.picker}
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) => this.setState({sayisi: itemValue})}>
                                <Picker.Item label='Dergi seçiniz'
                                             value={-1}
                                             color={'green'}
                                />
                                {
                                    this.state.dataForPicker && this.state.dataForPicker.map((item, index) =>

                                        <Picker.Item label={item.sayisi + ".Sayı"} value={item.sayisi}
                                                     key={index}/>
                                    )}
                            </Picker>*/}
                        </View>

                    </View>


                    <FlatList
                        contentContainerStyle={this.state.GridColumnsValue ? styles.paddingStyleList : styles.paddingStyleGrid}
                        data={this.state.isSearched ? this.state.searchResult : this.state.data}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback onPress={() => this.goToPayment(item)}>
                                <View
                                    style={this.state.GridColumnsValue ? styles.viewContainerList : styles.viewContainerGrid}>
                                    <Image style={this.state.GridColumnsValue ? styles.listImage : styles.gridImage}
                                           source={{uri: item.image}}
                                    />
                                    <View style={{flex: 1}}>
                                        <View style={{flex: 2, justifyContent: 'center'}}>

                                            <Text
                                                style={this.state.GridColumnsValue ? styles.listTextIsim : styles.gridTextIsim}>

                                                {this.state.GridColumnsValue ? ((item.isim).length > 36) ?
                                                    (((item.isim).substring(0, 36 - 3)) + '...') : item.isim
                                                    : ((item.isim).length > 31) ? (((item.isim).substring(0, 31 - 3)) + '...') : item.isim}
                                            </Text>
                                        </View>
                                        <View style={{flex: 1, justifyContent: 'center'}}>
                                            <Text
                                                style={this.state.GridColumnsValue ? styles.listTextSayi : styles.gridTextSayi}>
                                                {item.tarih + " " + item.sayisi + ".Sayı"}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={item => item.sayisi}
                        numColumns={this.state.GridColumnsValue ? 1 : 3}
                        key={(this.state.GridColumnsValue) ? 'ONE COLUMN' : 'THREE COLUMN'}
                        //     ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                        //    onRefresh={this.handleRefresh}
                        //   refreshing={this.state.refreshing}
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
    listImage: {
        width: '100%',
        height: '90%',
    },
    gridImage: {
        width: '100%',
        height: '74%',
    },
    listTextIsim: {
        fontSize: 15,
        color: '#3f3f3f',
        marginLeft: 6,
    },
    listTextSayi: {
        fontSize: 13,
        color: 'grey',
        justifyContent: 'center',
        marginLeft: 6,
        marginBottom: 9
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
    paddingStyleList: {     //  bu paddingler sağdakı scroll çubuğunu contentlerden uzaklaştırmak için...
        paddingHorizontal: 40
    },
    paddingStyleGrid: {
        paddingHorizontal: 3
    },
    viewContainerList: {
        height: deviceHeight * 2.2,
        width: deviceWidth * 2.5,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginBottom: 35,
        borderWidth: 0,
        shadowColor: '#000',
        elevation: 5,

    },
    viewContainerGrid: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginBottom: 10,
        borderWidth: 0,
        shadowColor: '#000',
        elevation: 5,
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
        marginTop: 15,
    },
    picker: {
        height: '100%',
        width: '100%',
    },
    pickerView: {
        borderWidth: 2.1,
        borderColor: '#3f3f3f',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight / 25,
        width: windowWidth * 0.48,
        marginRight: 4
    },
    renderSeparatorList: {
        height: 1.85,
        width: "35%",
        backgroundColor: "#3f3f3f",
        marginVertical: 15,
    },
    renderSeparatorGrid: {
        height: 1.85,
        width: "27.335%",
        backgroundColor: "#3f3f3f",
        marginVertical: 15,
    },
});

export default Searchpage;
