import React from 'react';
import {useDelay, useStores} from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import AppConfig from '@/config/AppConfig';
import {showAlert, confirmAlert} from '@/utils';
import {ConfirmAlertResult} from '@/constants';
import {Screens} from '@/constants/Navigation';

const isLocationTracking = async () => {
  return TaskManager.isTaskRegisteredAsync(AppConfig.locationTaskName);
};

function useViewModel(props) {
  const {user, hud} = useStores();
  const nav = useNavigation();
  const [isTracking, setTracking] = React.useState(false);

  // On Component Did Mount, Check for tracking.
  React.useEffect(() => {
    isLocationTracking().then((isRegistered) => {
      setTracking(isRegistered);
    });
  });

  // Delayed toggle tracking to disable fast click button.
  const onPressToggleTracking = useDelay(async () => {
    try {
      const {status} = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        // Just show confirm alert
        await showAlert(
          'Can not update your real-time location because access to location was denied',
        );
        return;
      }
      hud.show();
      const _isTracking = await isLocationTracking();
      if (!_isTracking) {
        try {
          await Location.startLocationUpdatesAsync(AppConfig.locationTaskName, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: AppConfig.locationUpdateInterval,
          });
        } catch (ex) {
          console.log('Exception - failed to start', ex);
        }
      } else {
        // Just stop location updates
        try {
          await Location.stopLocationUpdatesAsync(AppConfig.locationTaskName);
        } catch (exception) {
          console.log('Failed to stop - ', exception);
        }
      }
      // Set tracking flag again.
      const _isTracking1 = await isLocationTracking();
      console.log('Is now tracking ', _isTracking1);
      setTracking(_isTracking1);
    } catch (exception) {
      console.log('Exception cocrued ---', exception);
    } finally {
      hud.hide();
    }
  }, 300);

  const onPressLogOut = useDelay(async () => {
    const result = await confirmAlert(
      'Are you sure you want to log out?\n Your Location will not be reported anymore',
    );
    if (result !== ConfirmAlertResult.OK) {
      return;
    }
    try {
      // Try to Stop the location updates
      await Location.stopLocationUpdatesAsync(AppConfig.locationTaskName);
    } catch (exception) {
      console.log(
        'Exception occurred while trying to stop location update on logout',
      );
    }
    // Log out user
    user.logOut();
    nav.reset({
      index: 0,
      routes: [{name: Screens.logIn}],
    });
  }, 300);

  return {
    onPressLogout: onPressLogOut,
    onPressToggleTracking: onPressToggleTracking,
    username: user.username,
    isTracking,
  };
}
export default useViewModel;
