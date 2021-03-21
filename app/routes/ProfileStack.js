import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const ProfileStack = createStackNavigator(
    {
        Profile: {
            getScreen: () => require('../containers/profile/userProfile').default
        },
        UserScheduler: {
            getScreen: () => require('../containers/scheduler/user').default
        },
        InfluencerScheduler: {
            getScreen: () => require('../containers/scheduler/influencer').default
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
        AllSetting: {
            getScreen: () => require('../containers/profile/settings').default
        },
        MyBooking: {
            getScreen: () => require('../containers/myBookings').default
        },
        ScheduledCalls: {
            getScreen: () => require('../containers/scheduler/scheduledCalls').default
        },
        Settlements: {
            getScreen: () => require('../containers/payment/settlement').default
        },
        Payments: {
            getScreen: () => require('../containers/payment/payment').default
        },
        EditSubscription: {
            getScreen: () => require('../containers/subscriptions/editSubscription').default
        },
        TierSettings: {
            getScreen: () => require('../containers/subscriptions/tierSettings').default
        },
        ReelVideo: {
            getScreen: () => require('../containers/reels/item').default
        }
    },
    {
        defaultNavigationOptions,
        headerMode: "none",
    },
);


ProfileStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName;
    if (
        routeName == "InfluencerScheduler" ||
        routeName == "UserScheduler" ||
        routeName == "ScheduledCalls" ||
        routeName == "Settlements" ||
        routeName == "Payments" ||
        routeName == "EditSubscription" ||
        routeName == "FreeTier" ||
        routeName == "MyBooking"
    ) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};


export default ProfileStack;
