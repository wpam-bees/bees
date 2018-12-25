import { createStackNavigator } from 'react-navigation';

import ListScreen from './ListScreen';
import NewJob from './NewJob';

export default createStackNavigator(
    {
        ListScreen,
        NewJob,
    },
);
