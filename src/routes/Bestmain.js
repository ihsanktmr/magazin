import React, { Component } from 'react';
import { Tabs } from '../config/navigator'
import { Gotopdf } from '../config/navigator'
import SplashScreen from 'react-native-splash-screen'
class Main extends Component<Props> {

    componentDidMount(){
        SplashScreen.hide();
    }

    render() {
        return (

            <Tabs/>

        );
    }
}

export default Main;


