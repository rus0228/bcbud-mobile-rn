/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Platform, StatusBar, UIManager} from 'react-native';
import Route from '@/Route';
import '@/config';
import StoreProvider from '@/mst/StoreProvider';
import DropdownAlert from '@/components/DropDownAlert';
import DebugConfig from '@/config/DebugConfig';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import Hud from '@/components/hud';
import AppConfig from '@/config/AppConfig';
import * as Api from '@/services/Api';
import store from '@/mst/index';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaProvider>
        <ActionSheetProvider>
          <StoreProvider>
            <Route />
            <DropdownAlert />
            <Hud />
          </StoreProvider>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </>
  );
};

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App;
