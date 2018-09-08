import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';

import Maincontainer from './maincontainer/Maincontainer'


export default class Homepage extends Component<Props> {



    render() {

        let keyParameter = this.props.screenProps.keys;

        return (

            <View style={styles.container}>

                <Maincontainer keys={this.props.screenProps.keys}/>

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
