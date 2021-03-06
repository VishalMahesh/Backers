import React from 'react'
import { View, TextInput } from 'react-native';
import { Colors, CommonStyles, containerPadding, wide } from '../../constants';
import Images from '../../constants/Images';
import { IconButtons } from '../common/iconUtility';
import { Label } from '../common/label';


const AddLocation = () => <View style={CommonStyles.row}>
    <IconButtons
        name={Images.search}
        size={18}
    />
    <TextInput
        style={{ height: 40, textAlignVertical: 'center', width: "80%" }}
        placeholder={"Add Location"}
        selectionColor={Colors.base}
    />
</View>

const CaptionInput = ({ onChangeText }) => {
    return <View style={[{ backgroundColor: Colors.lightbase, marginBottom: containerPadding, padding: 10 }, CommonStyles.rounded]}>
        <Label
            label={"Write a caption"}
            size={10}
            color={Colors.shade}
        />
        <TextInput
            style={{ flex: 1, minHeight: wide * 0.2, backgroundColor: Colors.lightbase, textAlignVertical: 'top' }}
            multiline={true}
            placeholder={"Your text here.."}
            selectionColor={Colors.base}
            onChangeText={onChangeText}
        />
        {/* <AddLocation /> */}
    </View>

}

export default CaptionInput