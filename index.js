import { AppRegistry } from 'react-native';
import Homepage from './src/routes/mainpage/Homepage';
import navigator from './src/config/navigator'
import Main from "./src/routes/Bestmain";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


AppRegistry.registerComponent('magazine', () => Main);
