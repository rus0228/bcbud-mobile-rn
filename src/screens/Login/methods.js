import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {object, string} from 'yup';
import {errorMessage} from '@/utils/Yup';
import {assignIn} from 'lodash';
import {useStores} from '@/hooks';
import {Screens} from '@/constants/Navigation';
import * as api from '@/services/Api';

const tag = 'LogIn::methods - ';

// define YupModel
const yup = object().shape({
  userName: string().required(errorMessage('userName', 'Please enter name')),
  phoneNumber: string()
    .required(errorMessage('phoneNumber', 'Please enter phone number'))
    .matches(
      /^\d{8}$/,
      errorMessage('phoneNumber', 'Enter 8 digits phone number'),
    ),
  confirmCode: string()
    .required(errorMessage('confirmCode', 'Enter confirm code'))
    .matches(
      /^\d{4}$/,
      errorMessage('confirmCode', 'Enter 4 digits confirmation code'),
    ),
});

function useViewModel(props) {
  const nav = useNavigation();
  const {user, notification, hud} = useStores();
  const [userName, setUserName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [confirmCode, setConfirmCode] = React.useState('');

  const smsButtonEnabled = phoneNumber && phoneNumber.length === 8;

  const onPressLogin = async () => {
    try {
      setErrors({});
      hud.show();
      const params = await yup.validate(
        {userName, phoneNumber, confirmCode},
        {abortEarly: false},
      );

      // Go to Main screen
      if (confirmCode === '0000'){
        nav.navigate(Screens.main);
      }else {
        return;
      }
    } catch (ex) {
      console.log(tag, 'Exception --- ', ex);
      const _errors = assignIn({}, ...ex.errors);
      // flat map errors
      setErrors(_errors);
    } finally {
      hud.hide();
    }
  };

  const onPressSendSMS = async () => {
    if (phoneNumber && phoneNumber.length !== 8) {
      return;
    }
    hud.show();

    const bidder = {
      userName: userName,
      phoneNumber: phoneNumber
    };
    await api.regBidder(bidder);

    setTimeout(() => {
      hud.hide();
    }, 1000);

    user.bidderSave(userName, phoneNumber);
  };
  // Login Method
  /*
  const onPressLogin = async () => {
    try {
      const params = await yup.validate(
        {username, password},
        {abortEarly: false},
      );
      hud.show();
      const loginResult = await user.logIn(params.username, params.password);

      // When user became valid, then it means login succeed
      if (user.isValid) {
        nav.reset({
          index: 0,
          routes: [{name: Screens.tracking}],
        });
      } else {
        // Login Failed, Display Some Error Message
        notification.showWarn(loginResult?.info ?? 'Login Failed');
      }
    } catch (ex) {
      console.log('Exception --- ', ex);
      const _errors = assignIn({}, ...ex.errors);
      // flat map errors
      setErrors(_errors);
    } finally {
      hud.hide();
    }
  };
  */

  return {
    onPressLogin,
    onPressSendSMS,
    userName,
    setUserName,
    phoneNumber,
    setPhoneNumber,
    smsButtonEnabled,
    confirmCode,
    setConfirmCode,
    errors,
  };
}

export default useViewModel;
