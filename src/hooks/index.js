import React from 'react';
import {Alert} from 'react-native';
import {StoreContext} from '@/mst/StoreProvider';
import {AppName, ConfirmAlertResult} from '@/constants';

/**
 * useStores
 * @return {[type]} [description]
 */
export const useStores = () => React.useContext(StoreContext);

const _scheduleCall = (timeoutRef, call, timeout, ...args) => {
  clearTimeout(timeoutRef.current);
  if (timeout === 0) {
    call(...args);
  } else {
    timeoutRef.current = setTimeout(() => {
      call(...args);
    }, timeout);
  }
};

/**
 * Use Delay with fixed timeout configured in parameter
 * @param call
 * @param timeout
 * @returns {function(...[*]): void}
 */
export function useDelay(call, timeout) {
  const timeoutRef = React.useRef();
  React.useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (...args) => _scheduleCall(timeoutRef, call, timeout ?? 300, ...args);
}

/**
 * UseConfirmAlert hook
 * The reason that use hook is for localization
 */
export function useConfirmAlert() {
  // const {t} = useTranslation();
  return React.useCallback(
    (message, title, btn1, btn2) => {
      return new Promise((resolve, reject) => {
        Alert.alert(
          AppName || title,
          message,
          [
            {
              text: btn1 || 'OK' /*t('alerts.OK')*/,
              onPress: () => resolve(ConfirmAlertResult.OK),
              style: 'default',
            },
            {
              text: btn2 || 'CANCEL' /*t('alerts.CANCEL')*/,
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
    },
    [
      /*t*/
    ],
  );
}
