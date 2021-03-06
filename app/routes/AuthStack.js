import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const AuthStack = createStackNavigator(
    {
        Auth: {
            getScreen: () => require('../containers/auth/auth').default,
        },
        Forgot: {
            getScreen: () => require('../containers/auth/forgot').default,
        },
        WalkThrough: {
            getScreen: () => require('../containers/auth/walkthrough').default,
        }
    },
    {
        headerMode: 'none',
        defaultNavigationOptions,
    },
);

export default AuthStack


