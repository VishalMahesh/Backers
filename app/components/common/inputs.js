import React, { Component, useState } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { CommonStyles, Layout, Colors, Fonts, containerPadding } from '../../constants';
import Images from '../../constants/Images';
import { IconButtons } from './iconUtility';
import { TitleLabel } from './label';

let wide = Layout.width;

class FormInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secured: props.secured,
      focused: false
    };
  }

  static defaultProps = {
    editable: true,
    keyboardType: 'default'
  };

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  }

  onSubmitEditing = () => {
    this.props.onSubmitEditing();
  };

  focus() {
    this.textInput.focus();
  }

  renderAuthInput() {
    const { label, placeholder, value, secondIcon, style, row, profileInp } = this.props;
    const { secured, focused } = this.state;
    return (

      <View style={[CommonStyles.submitBtn2, CommonStyles.btnRounded, { backgroundColor: Colors.light, borderWidth: 1, borderColor: focused ? Colors.shade : Colors.lightbase, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: containerPadding, backgroundColor: focused ? Colors.light : Colors.lightbase }, row && { width: '100%' }]}>
        <TextInput
          blurOnSubmit={this.props.returnKeyType == 'next' ? false : true}
          style={[{ width: '90%', height: '100%' }]}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
          ref={(input) => (this.textInput = input)}
          secureTextEntry={secured}
          placeholderTextColor={focused ? Colors.dark : Colors.shade}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.props.onChangeText}
          placeholder={placeholder}
          value={value}
          selectionColor={Colors.base}
          returnKeyType={this.props.returnKeyType}
        />
        {value !== "" && (
          <TouchableOpacity
            onPress={this.props.onClear}
            style={(CommonStyles.center, { paddingLeft: containerPadding, })}>
            <Image
              source={profileInp ? Images.check : Images.close}
              resizeMode={'contain'}
              style={{
                height: 16,
                width: 16,
                tintColor: secured ? Colors.shade : Colors.base
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  renderCommentInput = () => {
    const { Data, onChangeText, onSubmitEditing, placeholder, appreciation, onFocus } = this.props
    return <View style={[{ height: "100%", width: "88%", backgroundColor: Colors.lightbase }, CommonStyles.rounded]}>
      <TextInput
        style={{ flex: 1, paddingHorizontal: containerPadding }}
        placeholder={placeholder}
        value={Data}
        returnKeyType={'done'}
        onChangeText={onChangeText}
        blurOnSubmit={appreciation ? true : false}
        keyboardType={appreciation ? 'decimal-pad' : "default"}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        selectionColor={Colors.base}
      />
    </View>
  }

  renderSearchInput = () => {
    const { Data, onChangeText, onSubmitEditing, placeholder, appreciation } = this.props
    return <View style={[{
      backgroundColor: Colors.lightbase,
      position: 'relative',
      justifyContent: 'center'
    }, CommonStyles.rounded,
    CommonStyles.full
    ]}>
      <IconButtons
        name={Images.search}
        style={{ position: "absolute", left: 0, }}
      />
      <TextInput
        style={{ flex: 1, paddingHorizontal: containerPadding, paddingLeft: wide * 0.12 }}
        placeholder={placeholder}
        value={Data}
        returnKeyType={"search"}
        onChangeText={onChangeText}
        blurOnSubmit={true}
        onSubmitEditing={onSubmitEditing}
        selectionColor={Colors.base}
      />
    </View>
  }


  renderProfileInput() {
    const { label, placeholder, Data, large } = this.props;
    return (
      <View style={{ height: wide * 0.2 }}>
        <TitleLabel
          data={label}
          style={{ fontSize: 12 }}
        />
        <TextInput
          placeholderTextColor={Colors.shade}
          placeholder={placeholder}
          blurOnSubmit={this.props.returnKeyType == 'next' ? false : true}
          ref={(input) => (this.textInput = input)}
          onSubmitEditing={this.onSubmitEditing}
          returnKeyType={this.props.returnKeyType}
          editable={this.props.editable}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
          value={Data}
          style={{
            maxHeight: wide * 0.1,
            height: '100%',
            fontSize: large ? 16 : 14,
            fontFamily: Fonts.Regular,
            color: !this.props.editable ? Colors.shade : Colors.dark,
            borderBottomWidth: 0.5,
            padding: 0,
            borderColor: Colors.grey,
            marginBottom: 10,
            borderRadius: 5
          }}
          selectionColor={Colors.base}
        />
      </View>
    );
  }

  render() {
    const { type } = this.props;
    return type == 'profile'
      ? this.renderProfileInput() :
      type == "comment" ? this.renderCommentInput() :
        type == "search" ? this.renderSearchInput()
          : this.renderAuthInput()
  }
}


const MultilineInput = ({ placeholder, light, onChangeText, value, customStyles, selectTextOnFocus }) => (
  <TextInput
    placeholderTextColor={Colors.shade}
    selectTextOnFocus={selectTextOnFocus}
    style={[
      {
        fontSize: 16,
        width: '100%',
        marginTop: 10,
        minHeight: wide * 0.3,
        backgroundColor: light ? Colors.light : Colors.lightshade,
        padding: wide * 0.02,
        textAlignVertical: 'top',
        fontFamily: Fonts.Regular,
        maxHeight: wide * 0.5,
      },
      light && { paddingHorizontal: 0 },
      { ...customStyles }
    ]}
    multiline
    value={value}
    placeholder={placeholder}
    returnKeyType={'done'}
    onChangeText={onChangeText}
    blurOnSubmit={true}
    selectionColor={Colors.base}
  />
);

MultilineInput.defaultProps = {
  selectTextOnFocus: true
}

export { FormInputs, MultilineInput };
