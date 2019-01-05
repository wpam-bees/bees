import { createStackNavigator } from 'react-navigation';

import Login from './LoginScreen';
import Register from './RegisterScreen';
import Logout from './LogoutScreen';

import { honeyYellow } from '../../assets';

export default createStackNavigator(
    {
        Login,
        Register,
        Logout,
    },
    {
        navigationOptions: {
            headerTransparent: true,
            headerTintColor: honeyYellow,
        },
    },
);
