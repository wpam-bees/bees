import { createStackNavigator } from 'react-navigation';

import ListScreen from './ListScreen';
import NewJob from './NewJob';
import LocationChooser from './LocationChooser';

export default createStackNavigator(
    {
        ListScreen,
        NewJob,
        LocationChooser,
    },
);
