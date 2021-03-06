import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const NotificationStack = createStackNavigator(
    {
        Notification: {
            getScreen: () => require('../containers/notification/index').default
        },
    },
    {
        defaultNavigationOptions,
        headerMode: "none",
    },
);



export default NotificationStack;
