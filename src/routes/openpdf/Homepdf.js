import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet, Dimensions} from 'react-native';

import Pdf from 'react-native-pdf';

class Pdfpage extends Component {
    constructor(props) {
        super(props);
        this.pdf = null;
        this.state = {
            page: 0,
            numberOfPages: 0,
        }
    }

    render() {
        const {sayisi, isim, PDF} = this.props.navigation.state.params;
        const source = {uri: PDF, cache: true};


        return (
            <View style={{flex: 1}}>

                <Pdf
                    ref={(pdf) => {
                        this.props.PDF = pdf
                    }}
                    source={source}
                    style={styles.pdf}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(page + "/" + numberOfPages);
                        this.setState({page:page,numberOfPages:numberOfPages})
                    }}
                    fitWidth={true}
                />

                <Text style={styles.text}> {this.state.page}/{this.state.numberOfPages} </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    pdf: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
    },
    text: {
        marginTop:'130%',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:22
    }
});
export default Pdfpage;