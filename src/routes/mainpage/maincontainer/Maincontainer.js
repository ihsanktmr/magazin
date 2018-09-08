import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList, Image, Dimensions, StatusBar
} from 'react-native';

import Header from "../../../header/Header";
import Cover from './containers/Covercontainer'
import Suggest from "./containers/Suggestcontainer";
import Past from "./containers/Pastcontainer";

type Props = {};

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class Maincontainer extends Component<Props> {

    render() {
        let keys =this.props.keys;
        return (

            <View style={{flex: 1}}>
                <ScrollView style={styles.container}
                            contentContainerStyle={styles.contentContainer}>
                    <View style={{flex: 1}}>
                        <StatusBar
                            backgroundColor="transparent"
                            barStyle="dark-content"
                            translucent={true}
                        />
                        <View style={{flex: 0.40}}>
                            <Header/>
                        </View>
                        <View style={{flex: 0.85, paddingHorizontal: 7.5, marginTop: 5}}>
                            <Cover />
                        </View>
                        <View style={{flex: 1, marginBottom: -20, marginTop: 10}}>
                            <Suggest keys={keys}/>
                        </View>
                        <View style={{flex: 1, paddingHorizontal: 7.5}}>
                            <Past keys={keys}/>
                        </View>
                    </View>


                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    contentContainer: {
        width: deviceWidth,
        height: deviceHeight * 1.4,
        backgroundColor: 'white',
    }
});

