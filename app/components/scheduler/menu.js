import { Colors, CommonStyles, containerPadding, wide } from "../../constants";
import React from 'react'
import { View, FlatList } from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Images from "../../constants/Images";
import { Label } from "../common/label";
import { AppIcon } from "../common/iconUtility";

const MenuContainer = ({ Data, active, onChange, style, containerstyle, timeAvail, ...props }) => <Menu>
    <MenuTrigger style={[styles.menu, style]}>
        <View style={{ height: "100%", justifyContent: 'center' }}>
            <Label
                bold
                label={Data[active].name}
            />
            {props.children}
        </View>
        <AppIcon
            name={Images.down}
            size={20}
        />
    </MenuTrigger>
    <MenuOptions optionsContainerStyle={[styles.option, containerstyle]}>
        <FlatList
            data={Data}
            renderItem={({ item, index }) => <MenuOption onSelect={() => onChange(timeAvail ? item.name : index)}>
                <View style={[styles.item, CommonStyles.verticalCenter, active == index && { backgroundColor: Colors.lightbase }]}>
                    <Label
                        label={item.name}
                    />
                </View>
            </MenuOption>}
        />
    </MenuOptions>
</Menu>

export {
    MenuContainer
}

const styles = {
    menu: [{
        marginVertical: containerPadding,
        height: wide * 0.12,
        borderWidth: 1,
        width: wide * 0.4,
        justifyContent: "space-between",
        padding: containerPadding
    }, CommonStyles.rounded, CommonStyles.row],
    option: [
        {
            marginTop: wide * 0.16,
            paddingVertical: containerPadding,
            paddingHorizontal: 5
        },
        CommonStyles.rounded
    ],
    item: {
        height: 40,
        borderRadius: 5,
        paddingLeft: 10
    },
    optbtn: [
        {
            height: wide * 0.2,
            justifyContent: 'space-between'
        },
        CommonStyles.row
    ],
}