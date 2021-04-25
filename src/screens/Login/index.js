import React from 'react';
import styled from 'styled-components/native';
import Container from '@/components/Container';
import {RobotoBold, WhiteButtonText} from '@/components/Text';
import Sizes from '@/styles/Sizes';
import Space from '@/components/Space';
import useViewModel from './methods';
import Images from '@/styles/Images';
import {KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import FormInput from '@/components/Input/FormInput';
import Button from '@/components/Button';
import {keyboardAvoiding} from '@/utils/hoc';
import Colors from '@/styles/Colors';

const LogIn = (props) => {
  const vm = useViewModel();
  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
      <Screen>
        <Title style={{marginBottom: 20}}>Login</Title>
        <LoginInput
          title={'Name'}
          inputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            value: vm.userName,
            onChangeText: vm.setUserName,
          }}
          error={vm.errors.userName}
          style={{marginBottom: 10}}
        />
        <LoginInput
          title={'Phone Number'}
          inputProps={{
            autoCapitalize: 'none',
            value: vm.phoneNumber,
            onChangeText: vm.setPhoneNumber,
            keyboardType: 'number-pad',
          }}
          error={vm.errors.phoneNumber}
          style={{marginBottom: 10}}
        />
        <Button
          green
          style={{alignSelf: 'stretch', marginBottom: 40}}
          fill
          disabled={!vm.smsButtonEnabled}
          onPress={vm.onPressSendSMS}>
          <WhiteButtonText>Send code by SMS</WhiteButtonText>
        </Button>
        <LoginInput
          title={'Confirmation Code'}
          inputProps={{
            autoCapitalize: 'none',
            value: vm.confirmCode,
            onChangeText: vm.setConfirmCode,
            keyboardType: 'number-pad',
            textContentType: 'oneTimeCode',
          }}
          error={vm.errors.confirmCode}
          style={{marginBottom: 10}}
        />
        <Button
          green
          style={{alignSelf: 'stretch'}}
          fill
          onPress={vm.onPressLogin}>
          <WhiteButtonText>Log In</WhiteButtonText>
        </Button>
      </Screen>
    </TouchableWithoutFeedback>
  );
};

const Screen = styled(Container)`
  align-items: center;
  padding: 16px;
  background-color: white;
`;

const LoginInput = styled(FormInput)`
  align-self: stretch;
`;

const Title = styled(RobotoBold)`
  font-size: ${Sizes.scale(30)}px;
  color: ${Colors.darkBlack};
`;

export default keyboardAvoiding(LogIn);
