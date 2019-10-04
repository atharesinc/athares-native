import * as Permissions from 'expo-permissions';
// import { Location } from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants';

import { Alert, Linking } from 'react-native';

export default async function getPermissionAsync(permission) {
  const { status } = await Permissions.askAsync(permission);
  if (status !== 'granted') {
    const { name } = Constants.manifest;
    const permissionName = permission.toLowerCase().replace('_', ' ');
    Alert.alert(
      'Cannot be done 😞',
      `If you would like to use this feature, you'll need to enable the ${permissionName} permission in your phone settings.`,
      [
        {
          text: "Let's go!",
          onPress: () => Linking.openURL('app-settings:'),
        },
        { text: 'Nevermind', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true },
    );

    return false;
  }
  return true;
}

// export async function getLocationAsync(onSend) {
//   if (await getPermissionAsync(Permissions.LOCATION)) {
//     const location = await Location.getCurrentPositionAsync({});
//     if (location) {
//       onSend([{ location: location.coords }]);
//     }
//   }
// }

export async function pickImageAsync() {
  if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: 'All',
    });

    if (!result.cancelled) {
      return result;
    }
  }
}

export async function pickFileAsync() {
  if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });

    if (!result.cancelled) {
      return result;
    }
  }
}

export async function takePictureAsync() {
  if (await getPermissionAsync(Permissions.CAMERA)) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      // aspect: [4, 3]
    });

    if (!result.cancelled) {
      return result;
    }
  }
}

// Image Picker if we just want the image URI
export async function pickImageURIAsync() {
  if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      return result.uri;
    }
  }
}
