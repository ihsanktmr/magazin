import React, { Component } from 'react';
import { Tabs } from '../config/navigator'
import SplashScreen from 'react-native-splash-screen'
import {sayiDondur} from "./payment/Buycontainer";

class Main extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
                keys: [],
                oldKeys: []
            };
    }

    componentDidMount(){
        SplashScreen.hide();
    }
    onNavigationChange = (prevState, currentState) => {
        this.setState({
            keys: currentState.routes[2].routes[0].key,
            oldKeys: prevState.routes[2].routes[0].key,
        });
    };

    render() {

        return (

            <Tabs onNavigationStateChange={this.onNavigationChange}
                  screenProps={{keys: this.state.keys,
                                oldKeys:this.state.oldKeys}}

             />
        );
    }
}

export default Main;


