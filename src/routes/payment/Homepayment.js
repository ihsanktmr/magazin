import React, {Component} from 'react';
import {View} from 'react-native';
import Buycontainer from "./Buycontainer";

class Paymentpage extends Component {
    constructor(props) {
        super(props);
        this.pdf = null;
    }


    render() {
        const { isim,image,sayisi,tarih } = this.props.navigation.state.params;
        return (
            <View style={{flex: 1,flexDirection: 'row'}}>
                <Buycontainer isim={isim}
                              image={image}
                              sayisi={sayisi}
                              tarih={tarih}
                              />
            </View>
        )
    }


}
export default Paymentpage;