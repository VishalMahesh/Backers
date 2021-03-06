import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from '../utils/navigation';

const AddPostStack = createStackNavigator(
    {
        AddPost: {
            getScreen: () => require('../containers/addPost').default,
        },
        NewPost: {
            getScreen: () => require('../containers/addPost/newPost').default,
        }
    },
    {
        headerMode: 'none',
        defaultNavigationOptions,
        // initialRouteName: "NewPost"
    },
);

AddPostStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName;
    if (
        routeName == 'AddPost' ||
        routeName == 'ConfirmPost' ||
        routeName == "NewPost"
    ) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};


export default AddPostStack


