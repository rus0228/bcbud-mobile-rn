import React from 'react';
import styled from 'styled-components/native';
import Container from '@/components/Container';
import {Roboto, WhiteButtonText} from '@/components/Text';
import Sizes from '@/styles/Sizes';
import useViewModel from './methods';
import Button from '@/components/Button';
import {Text} from 'react-native';
import Space from '@/components/Space';

const Tracking = (props) => {
  const vm = useViewModel();
  return (
    <Screen>
      <ProfileButtonTitle>
        Logged in:<Text style={{fontWeight: 'bold'}}>{'\n' + vm.username}</Text>
      </ProfileButtonTitle>
      <Description>
        {!vm.isTracking ? (
          <>
            Click <Text style={{fontWeight: 'bold'}}>Start Tracking</Text>{' '}
            Button to start tracking your real-time location.
          </>
        ) : (
          <>
            Your location is being updated. {'\n'}
            Click <Text style={{fontWeight: 'bold'}}>Stop Tracking</Text> Button
            to stop tracking your real-time location.
          </>
        )}
      </Description>
      <BottomArea>
        <Button
          red={vm.isTracking}
          green={!vm.isTracking}
          onPress={vm.onPressToggleTracking}
          fill>
          <WhiteButtonText>
            {vm.isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </WhiteButtonText>
        </Button>
        <Space height={Sizes.scale(15)} />
        <Button red onPress={vm.onPressLogout} fill>
          <WhiteButtonText>Logout</WhiteButtonText>
        </Button>
      </BottomArea>
    </Screen>
  );
};

const Screen = styled(Container)`
  align-items: center;
  padding: ${Sizes.scale(16)}px;
  justify-content: center;
`;

const ProfileButtonTitle = styled(Roboto)`
  font-size: 12px;
  position: absolute;
  top: ${Sizes.scale(80)}px;
  right: ${Sizes.scale(35)}px;
  text-align: right;
`;

const Description = styled(Roboto)`
  color: black;
  font-size: ${Sizes.scale(20)}px;
  align-self: stretch;
  text-align: center;
`;

const BottomArea = styled.View`
  position: absolute;
  align-items: center;
  left: 0px;
  right: 0px;
  bottom: ${Sizes.scale(50)}px;
`;

export default Tracking;
