import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const HomeStack = createStackNavigator(
    {
        Home: {
            getScreen: () => require('../containers/home/home').default,
        },
        Suggestion: {
            getScreen: () => require('../containers/home/suggestions').default
        },
        Chats: {
            getScreen: () => require('../containers/messages/chatlist').default
        },
        ChatRoom: {
            getScreen: () => require('../containers/messages/room').default
        },
        Story: {
            getScreen: () => require('../containers/stories').default
        },
        UserScheduler: {
            getScreen: () => require('../containers/scheduler/user').default
        },
        AvailabilityEdit: {
            getScreen: () => require('../containers/scheduler/availability').default
        },
        EditDate: {
            getScreen: () => require('../containers/scheduler/dateavailability').default
        },
        Details: {
            getScreen: () => require('../containers/home/details').default
        },
        Profile: {
            getScreen: () => require('../containers/profile/userProfile').default
        },
        SearchUser: {
            getScreen: () => require('../containers/home/searchUsers').default
        },
        InfluencerScheduler: {
            getScreen: () => require('../containers/scheduler/influencer').default
        },
    },
    {
        defaultNavigationOptions,
        headerMode: "none",
    },
);

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName;
    if (
        routeName == 'Suggestion' ||
        routeName == "Chats" ||
        routeName == "Story" ||
        routeName == "UserScheduler" ||
        routeName == "InfluencerScheduler" ||
        routeName == "AvailabilityEdit" ||
        routeName == "EditDate" ||
        routeName == "ChatRoom" ||
        routeName == "SearchUser"
    ) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};

export default HomeStack;
