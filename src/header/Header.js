import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

class Header extends Component {

    render() {

        return (
                <Image
                  
                    style={{position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        opacity:0.55}}
                    source={{uri: 'http://files.smashingmagazine.com/wallpapers/june-16/join-the-wave/cal/june-16-join-the-wave-cal-1680x1050.jpg'}}
                />
        )
    }
}

export default Header;