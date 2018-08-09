import React from 'react';

import {
    StackNavigator, TabNavigator, createBottomTabNavigator, createStackNavigator
} from 'react-navigation';

import Homepage from '../routes/mainpage/Homepage'
import Searchpage from '../routes/search/Homesearch'
import Mymagazinepage from "../routes/mymagazine/Homemymagazine";
import Pdfpage from "../routes/openpdf/Homepdf"
import Paymentpage from "../routes/payment/Homepayment";
import Trypayment from "../routes/payment/trypayment";
import {Icon} from 'react-native-elements';
import Searchresultpage from '../routes/search/Searchresult'
import Cover from '../routes/mainpage/maincontainer/containers/Covercontainer'



export const Gotopdf = createStackNavigator({



    Mymagazine: {

        screen: Mymagazinepage,
        navigationOptions: {
            header: null   //if we had not added this navigation between mainpage, search and other tabs cause some problem like
        },                     //when you try to navigate from profile or mymagazine to search header will not appear, but
        //if you try to open search when you are on homepage header will appear. so we set header null.
    },
    Openpdf: {
        screen: Pdfpage,
        navigationOptions: ({navigation}) => ({

            headerLeft: <Icon name={'keyboard-arrow-left'}
                 iconStyle={{color:'#3f3f3f', marginTop: 20}}
                              size={40}
                              onPress={() => {
                                  navigation.goBack()
                              }}/>,

        }),

    },
});

Gotopdf.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};


export const Gotopayment = createStackNavigator({

    Search: {
        screen: Searchpage,
        navigationOptions: {
            header: null   // if we had not added this navigation between mainpage, search and other tabs cause some problem like
        },                     // when you try to navigate from profile or mymagazine to search header will not appear, but
        // if you try to open search when you are on homepage header will appear. so we set header null.
    },
    Payment: {
        screen: Paymentpage,
        navigationOptions:

            ({navigation}) => ({

                headerLeft: <Icon name={'keyboard-arrow-left'}
                                  iconStyle={{color:'#3f3f3f', marginTop: 20}}
                                  size={40}
                                  onPress={() => {
                                      navigation.goBack()
                                  }}/>,
                headerTitle: 'bu dergi hakkında',
                headerTitleStyle: {
                    fontWeight: 'normal',
                    fontStyle: 'italic',
                    marginTop: 15,
                    fontSize:16
                },
                tabBarVisible: false
            }),
    },
    Searchresult: {
        screen: Searchresultpage,
        navigationOptions: ({navigation}) => ({

            headerLeft: <Icon name={'keyboard-arrow-left'}
                              iconStyle={{color:'#3f3f3f', marginTop: 20}}
                              size={40}
                              onPress={() => {
                                  navigation.goBack()
                              }}/>,
            headerTitle: 'Arama sonuçları',
            headerTitleStyle: {
                fontWeight: 'normal',
                fontStyle: 'italic',
                marginTop: 15,
                fontSize:16
            },

        }),
    },
});

Gotopayment.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};


export const goToPaymentFromHomepage = createStackNavigator({

    Homepage: {
        screen: Homepage,
        navigationOptions: {
            header: null
        },
    },

    Payment: {
        screen: Paymentpage,
        navigationOptions: ({navigation}) => ({
            headerLeft: <Icon name={'keyboard-arrow-left'}
                              size={40}
                              iconStyle={{color:'#3f3f3f', marginTop: 20}}
                              onPress={() => {
                                  navigation.goBack()
                              }}/>,

            headerTitle: 'bu dergi hakkında',
            headerTitleStyle: {
                fontWeight: 'normal',
                fontStyle: 'italic',
                marginTop: 15,
                fontSize:16
            },
            headerStyle: {backgroundColor: 'white'},
        }),
    },
});

export const tryPayment = createStackNavigator({

    Homepage: {
        screen: Homepage,
        navigationOptions: {
            header: null
        },
    },

    Trypayment: {
        screen: Trypayment,
        navigationOptions: ({navigation}) => ({
            headerLeft: <Icon name={'keyboard-arrow-left'}
                              size={40}
                              iconStyle={{color:'#3f3f3f', marginTop: 20}}
                              onPress={() => {
                                  navigation.goBack()
                              }}/>,
            headerTitle: 'Satın Al',
            headerTitleStyle: {
                fontWeight: 'normal',
                fontStyle: 'italic',
                marginTop: 15,
                fontSize:16
            },
            headerStyle: {backgroundColor: 'white'},
        }),
    },
    Payment: {
        screen: Paymentpage,
        navigationOptions: ({navigation}) => ({
            headerLeft: <Icon name={'keyboard-arrow-left'}
                              iconStyle={{color:'#3f3f3f', marginTop: 20}}
                              size={40}
                              onPress={() => {
                                  navigation.goBack()
                              }}/>,
            headerTitle: 'bu dergi hakkında',
            headerTitleStyle: {
                fontWeight: 'normal',
                fontStyle: 'italic',
                marginTop: 15,
                fontSize:16
            },
            headerStyle: {backgroundColor: 'white'},
        }),
    },
});

tryPayment.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};


export const Tabs = createBottomTabNavigator({
        Homepage: {
            screen: tryPayment,
            navigationOptions: {
                tabBarLabel: 'Anasayfa',
                tabBarIcon: ({tintColor}) => <Icon name='home' size={24} color={tintColor}/>
            },
        },
        Search: {
            screen: Gotopayment,
            navigationOptions: {
                backBehavior: 'none',
                animationEnabled: false,
                tabBarLabel: 'Ara',
                tabBarIcon: ({tintColor}) => <Icon name='search' size={24} color={tintColor}/>
            },
        },
        /* Profile: {
             screen: Profilepage,
             navigationOptions: {

                 tabBarLabel: 'Profile',
                 tabBarIcon: ({tintColor}) => <Icon name='person' size={24} color={tintColor}/>
             },
         },*/
        Mymagazine: {
            screen: Gotopdf,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Dergilerim',
                tabBarIcon: ({tintColor}) => <Icon name='bookmark' size={24} color={tintColor}/>,
            }),
        },
    },

    {
        tabBarOptions: {
            activeTintColor: 'green',
            inactiveTintColor: '#3f3f3f',
            style: {
                backgroundColor: '#ffffff',
            },
            showIcon: true,
            showLabel: false
        },
        tabBarPosition: 'bottom',
        animationEnabled: false,
        backBehavior: 'none',
    }
);

