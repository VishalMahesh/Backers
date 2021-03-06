import React from 'react';
import { View, Alert } from 'react-native';

export const showErrorAlert = (message, title, onPress = () => { }) =>
  Alert.alert(title, message, [{ text: 'OK', onPress }], { cancelable: true });

export const showConfirmationAlert = (title, onPress = () => { }) =>
  Alert.alert(
    title,
    "",
    [
      {
        text: "Cancel",
        style: 'cancel',
      },
      {
        text: "Yes",
        style: 'destructive',
        onPress,
      },
    ],
    { cancelable: false },
  );
