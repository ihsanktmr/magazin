import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';

import Maincontainer from './maincontainer/Maincontainer'


export default class Homepage extends Component<Props> {



    render() {
        return (

            <View style={styles.container}>


                <Maincontainer/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
