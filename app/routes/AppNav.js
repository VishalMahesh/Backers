import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Images from '../constants/Images';
import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native'
import { Colors, Layout, CommonStyles, Fonts, containerPadding, wide } from '../constants';
import HomeStack from './HomeStack';
import { AppIcon } from '../components/common/iconUtility'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Label } from '../components/common/label';
import ProfileStack from './ProfileStack';
import ReelsStack from './ReelsStack';
import NotificationStack from './NotificationStack';
import AddPostStack from './AddPostStack';
const S = StyleSheet.create({
    container: { flexDirection: "row", height: wide * 0.15, elevation: 2, backgroundColor: Colors.light, borderRadius: 30 },
    tabButton: { flex: 1, justifyContent: "center", alignItems: "center" },
    tabButton2: { flex: 1, position: 'relative', alignItems: "center" }
});
const AppTabBar = (props) => {
    const {
        renderIcon,
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation
    } = props;
    const { routes, index: activeRouteIndex } = navigation.state;
    const context = useSafeAreaInsets();
    return (
        <SafeAreaView style={[{
            borderTopWidth: 0,
            position: 'absolute',
            left: containerPadding,
            right: containerPadding,
            bottom: context.bottom + 10,
            //  height: wide * 0.1,
            alignItems: 'center',
            // paddingTop: containerPadding * 2,
            borderRadius: 60,
            zIndex: 1
        }, CommonStyles.shadow]}>
            <View style={[S.container, {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: -12,
                },
                shadowOpacity: 0.25,
                shadowRadius: 6.00,
                backgroundColor: Colors.light,
                elevation: 20,
            }]}>
                {routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex;
                    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
                    return (
                        <TouchableOpacity
                            key={routeIndex}
                            style={S.tabButton}
                            onPress={() => {
                                onTabPress({ route });
                            }}
                            onLongPress={() => {
                                onTabLongPress({ route });
                            }}
                            accessibilityLabel={getAccessibilityLabel({ route })}
                        >
                            {renderIcon({ route, focused: isRouteActive, tintColor })}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

function renderTabBarIcon(focused, iconSource, active, large) {
    return (
        <View style={CommonStyles.tabBarItemContainer}>
            <AppIcon
                size={large ? 35 : 25}
                // color={focused ? Colors.dark : Colors.shade}
                name={focused ? active : iconSource}
            />
        </View>
    );
}



const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Stories: ReelsStack,
        AddPost: AddPostStack,
        //   Notification: NotificationStack,
        Profile: ProfileStack,
    },
    {
        defaultNavigationOptions: ({ navigation, screenProps }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                    case 'Home':
                        icon = renderTabBarIcon(focused, Images.home, Images.homefill);
                        break;
                    case 'Stories':
                        icon = renderTabBarIcon(focused, Images.play, Images.playfill);
                        break;
                    case 'AddPost':
                        icon = renderTabBarIcon(focused, Images.plus, Images.plus);
                        break;
                    // case 'Notification':
                    //     icon = renderTabBarIcon(focused, Images.bell, Images.bellfill);
                    //     break;
                    case 'Profile':
                        icon = renderTabBarIcon(focused, Images.profile, Images.profilefill);
                        break;
                    default:
                        icon = renderTabBarIcon(focused);
                }
                return icon;
            },
        }),
        tabBarOptions: {
            activeTintColor: Colors.dark,
            inactiveTintColor: Colors.darkshade,
            showLabel: false,
            showIcon: true,
            lazyLoad: true,
        },
        tabBarComponent: (props) => <AppTabBar
            inactiveTintColor={Colors.shade}
            {...props} />,
    },
);

export default TabNavigator;
