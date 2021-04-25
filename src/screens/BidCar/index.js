import React from 'react';
import {View, Platform, TouchableWithoutFeedback, Keyboard, Text} from 'react-native';
import styled from 'styled-components/native';
import {Roboto, RobotoBold} from '@/components/Text';
import Sizes, {FontSizes} from '@/styles/Sizes';
import StyledInput from '@/components/Input';
import Colors from '@/styles/Colors';
import useViewModel from './methods';
import Button from '@/components/Button';
import {WhiteButtonText} from '@/components/Text';

const BidCar = (props) => {
  const vm = useViewModel(props);
  return (
    <Container behavior={Platform.OS === 'iOS' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Title style={{marginBottom: 20}}>Bid on car</Title>
          <InputContainer>
            <Label>Car number:</Label>
            <Input value={vm.carNumber} onChangeText={vm.handleCarNumber} />
          </InputContainer>
          <InputContainer>
            <Label>Num of tickets:</Label>
            <Input
              keyboardType="number-pad"
              value={vm.tickets}
              onChangeText={vm.handleTickets}
            />
          </InputContainer>
          <BiddingTitle>These cars are available for bidding:</BiddingTitle>
          <Cars>
            {
              vm.availableCarsForBid.map((car) => {
                return (
                    <Text>{car['start_number']}, </Text>
                )
              })
            }
          </Cars>
          <ButtonsContainer>
            <Button green fill style={{width: '35%'}} onPress={vm.onSave} disabled={vm.disableSave}>
              <WhiteButtonText>Save</WhiteButtonText>
            </Button>
            <Button red fill style={{width: '35%'}} onPress={vm.onCancel}>
              <WhiteButtonText>Cancel</WhiteButtonText>
            </Button>
          </ButtonsContainer>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const Label = styled(Roboto)`
  font-size: ${FontSizes.label}px;
  color: black;
  width: 150px;
`;

const Input = styled(StyledInput)`
  background-color: ${Colors.cellBackground};
  flex: 1;
  height: 30px;
  padding-left: 3px;
`;

const BiddingTitle = styled(Roboto)`
  font-size: ${FontSizes.label}px;
  color: black;
  background-color: ${Colors.yellow};
  align-self: stretch;
  padding-horizontal: 10px;
  padding-vertical: 5px;
`;

const Cars = styled(Roboto)`
  flex: 1;
  margin-top: 5px;
  align-self: stretch;
  background-color: ${Colors.yellow};
  padding-horizontal: 10px;
  padding-vertical: 5px;
  font-size: ${FontSizes.label}px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 30px;
  padding-bottom: 10px;
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: white;
  padding-horizontal: 16px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled(RobotoBold)`
  font-size: 20px;
  color: ${Colors.darkBlack};
  align-self: center;
`;

export default BidCar;
