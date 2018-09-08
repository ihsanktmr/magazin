import React, {Component} from 'react';
import {Button, StatusBar, View} from 'react-native';
import Buycontainer, {person} from "./Buycontainer";



class Paymentpage extends Component {
    constructor(props) {
        super(props);
        this.pdf = null;
    }


    render() {

        const { keyParameter,ID,PDF,isim,image,sayisi,tarih } = this.props.navigation.state.params;

        return (
            <View style={{flex: 1,flexDirection: 'row'}}>

                <Buycontainer isim={isim}
                              image={image}
                              sayisi={sayisi}
                              tarih={tarih}
                              ID={ID}
                              PDF={PDF}
                              keyParameter={keyParameter}
                              />
            </View>
        )
    }


}
export default Paymentpage;