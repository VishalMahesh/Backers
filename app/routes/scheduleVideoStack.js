import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const ScheduleStack = createStackNavigator(
    {
        InfluencerScheduler: {
            getScreen: () => require('../containers/scheduler/influencer').default
        },
        AvailabilityEdit: {
            getScreen: () => require('../containers/scheduler/availability').default
        },
        EditDate: {
            getScreen: () => require('../containers/scheduler/dateavailability').default
        },
    },
    {
        defaultNavigationOptions,
        headerMode: "none",
    },
);



export default ScheduleStack;
