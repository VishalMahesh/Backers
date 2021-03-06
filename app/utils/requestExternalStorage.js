import React from 'react';
import { PermissionsAndroid } from 'react-native';

async function requestExternalStoreageRead() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Backers App ...',
        message: 'App needs access to external storage',
      },
    );

    return granted == PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    //Handle this error
    return false;
  }
}

export default requestExternalStoreageRead;
