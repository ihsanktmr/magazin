//this is the splash screen

import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Alert, Dimensions} from 'react-native';
import {withNavigation} from "react-navigation";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

class Splash extends Component {


    render() {

        return (

            <View style={styles.mainContainer}>



            </View>
        )
    }


}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'orange',
    },
});


export default withNavigation(Splash);