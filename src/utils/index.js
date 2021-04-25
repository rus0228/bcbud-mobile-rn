import AppConfig from '@/config/AppConfig';
import {Alert} from 'react-native';
import {AppName, ConfirmAlertResult} from '@/constants';

export function obtainGameCode(qrCode) {
  const linkPrefix = AppConfig.shareLinkPrefix;
  if (!qrCode || !qrCode.length || qrCode.length < linkPrefix.length + 1) {
    return undefined;
  }
  if (!qrCode.startsWith(linkPrefix)) {
    return undefined;
  }
  return qrCode.substring(linkPrefix.length);
}

export function confirmAlert(message, title, btn1='OK', btn2='Cancel') {
  return new Promise((resolve, reject) => {
    Alert.alert(
      AppName || title,
      message,
      [
        {
          text: btn1,
          onPress: () => resolve(ConfirmAlertResult.OK),
          style: 'default',
        },
        {
          text: btn2,
          onPress: () => resolve(ConfirmAlertResult.Cancel),
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
        onDismiss: () => resolve(ConfirmAlertResult.Dismiss),
      },
    );
  });
}

export function showAlert(message, title) {
  return new Promise((resolve) => {
    Alert.alert(
      AppName || title,
      message,
      [
        {
          text: 'OK',
          onPress: () => resolve(),
          style: 'default',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => resolve(),
      },
    );
  });
}
