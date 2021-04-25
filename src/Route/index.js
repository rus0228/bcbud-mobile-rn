import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '@/constants/Navigation';
import LogIn from '@/screens/Login';
import Main from '@/screens/Main';
import BidCar from '@/screens/BidCar';
import useViewModel from './methods';
import {SafeAreaView} from 'react-native';

const Stack = createStackNavigator();

const Route = () => {
  const vm = useViewModel();
  if (vm.isInitializing) {
    return null;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name={Screens.logIn} component={LogIn} />
          <Stack.Screen name={Screens.main} component={Main} />
          <Stack.Screen name={Screens.bidCar} component={BidCar} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Route;
