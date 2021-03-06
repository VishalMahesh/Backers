import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const ReelsStack = createStackNavigator(
    {
        // ReelList: {
        //     getScreen: () => require('../containers/reels/list').default
        // },
        ReelVideo: {
            getScreen: () => require('../containers/reels/item').default
        }
    },
    {
        defaultNavigationOptions,
        headerMode: "none",
    },
);


// ReelsStack.navigationOptions = ({ navigation }) => {
//     let tabBarVisible = true;
//     let routeName = navigation.state.routes[navigation.state.index].routeName;
//     if (
//         routeName == 'ReelVideo'
//     ) {
//         tabBarVisible = false;
//     }
//     return {
//         tabBarVisible,
//     };
// };

export default ReelsStack;
