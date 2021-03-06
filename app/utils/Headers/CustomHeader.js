import React from 'react'
import { Text, View, Image } from 'react-native'
import { IconButtons } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import { Avatar } from '../../components/feed/comments'
const Header = ({ actions, reel }) => <View style={styles.container}>
  <View style={styles.primary}>
    <IconButtons
      name={Images.search}
      size={26}
      action={() => actions("Search")}
    />
  </View>
  <Image
    source={Images.logo}
    style={styles.secondary}
    resizeMode={'contain'}
  />
  <View style={styles.subcont}>
    {!reel && <IconButtons
      name={Images.videoCall}
      size={26}
      action={() => actions("Video")}
    />}
    <IconButtons
      name={Images.chat}
      size={26}
      action={() => actions("Chat")}
    />
  </View>
</View>


const AuthHeader = ({ label, avatar, primaryAction, secondaryAction, chat, icon, style, size, iconstyle, ...props }) => <View style={[styles.subcontainer, style]}>
  <IconButtons
    name={Images.back}
    action={primaryAction}
    style={styles.btn2}
  />
  <Avatar
    size={40}
    source={avatar}
    style={{ position: 'absolute', left: - wide * 0.32, bottom: -wide * 0.08 }}
  />
  <Label
    label={label}
    bold
    size={20}
    style={chat && { alignSelf: 'flex-start', marginLeft: wide * 0.27 }}
  />
  {icon &&
    <IconButtons
      name={icon}
      action={secondaryAction}
      style={[styles.btn3, iconstyle]}
      size={size}
    />}
  {props.children}
</View>

const ModalHeader = ({ label, onClose }) => <View style={styles.maincont}>
  <Label
    label={label}
    size={18}
    bold
  />
  <IconButtons
    name={Images.close}
    style={styles.buttun}
    action={onClose}
  />
</View>


const styles = {
  container: [
    CommonStyles.header,
    CommonStyles.row,
    CommonStyles.btmborder,
    { justifyContent: 'space-between', marginBottom: 0 },
  ],
  subcontainer: [
    CommonStyles.header,
    CommonStyles.btmborder,
    CommonStyles.horizontalCenter,
    {
      paddingBottom: containerPadding,
      justifyContent: 'flex-end',
      marginBottom: 0
    }
  ],
  maincont: [
    {
      height: wide * 0.15,
      position: 'relative'
    },
    CommonStyles.btmborder,
    CommonStyles.center
  ],
  subcont: [
    CommonStyles.row,
    {
      width: wide * 0.25,
      paddingRight: 6,
      justifyContent: 'flex-end'
    }],
  buttun: {
    position: 'absolute',
    right: containerPadding
  },
  btn2: {
    position: 'absolute',
    left: 10,
    top: 0
  },
  btn3: {
    position: 'absolute',
    right: 10,
    top: 0
  },
  primary: {
    width: wide * 0.25,
    paddingLeft: 6
  },
  secondary: {
    height: wide * 0.1,
    width: wide * 0.3
  }
}

export {
  Header,
  AuthHeader,
  ModalHeader
}