import React from 'react'
import { TouchableOpacity, FlatList, View, SafeAreaView } from 'react-native'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import { OptionList } from '../../constants/dummy'
import { IconButtons } from '../common/iconUtility'
import { Label } from '../common/label'
const ListItem = ({ item, index, action }) => <View style={[
    { paddingVertical: containerPadding / 2, paddingHorizontal: containerPadding },
    index == 0 && { paddingTop: containerPadding },
    index == 4 && { paddingBottom: containerPadding }
]}>
    <TouchableOpacity onPress={action} style={[styles.container,
    CommonStyles.row,
    CommonStyles.rounded]}>
        {item.icon && <IconButtons
            name={item.icon}
            size={20}
            color={Colors.dark}
        />}
        <Label
            label={item.label}
            size={14}
        />
    </TouchableOpacity>
</View>

const FeedOption = ({ data, onCancel, action }) => <SafeAreaView style={{ flex: 1 }}>
    <TouchableOpacity onPress={onCancel} style={{ flex: 1 }} />
    <View style={[CommonStyles.rounded, { backgroundColor: Colors.light }]}>
        {data.map((item, index) => <ListItem
            item={item}
            index={index}
            action={() => { onCancel(), action(index) }}
        />)}
    </View>
</SafeAreaView>


const styles = {
    container: {
        height: wide * 0.12,
        backgroundColor: Colors.lightbase,
        paddingHorizontal: containerPadding
    }
}


export {
    FeedOption,
    ListItem
}