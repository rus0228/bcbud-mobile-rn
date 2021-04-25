import React from 'react';
import {View, FlatList} from 'react-native';
import {Roboto, WhiteButtonText} from '@/components/Text';
import styled from 'styled-components/native';
import Button from '@/components/Button';
import useViewModel from './methods';
import BidItem from './components/BidItem';
import CurrentBids from '@/screens/Main/components/CurrentBids';
import Winnings from '@/screens/Main/components/Winnings';
import NavButton from '@/components/Button/NavButton';
import Images from '@/styles/Images';
import Colors from '@/styles/Colors';

const Main = () => {
  const vm = useViewModel();
  return (
    <Container>
      <NavButton
        right
        icon={Images.icon.logout}
        title="Logout"
        style={{marginTop: -10}}
        onPress={vm.onPressLogout}
      />
      <BidCloseContainer>
        <View style={{flex: 1, paddingRight: 10, justifyContent: 'center'}}>
          <Label style={{alignSelf: 'flex-end'}}>Bidding closes in</Label>
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 10,
            backgroundColor: Colors.cellBackground,
            height: 35,
            justifyContent: 'center',
          }}>
          <Label>hh:mm</Label>
        </View>
      </BidCloseContainer>
      <Button
        green
        style={{alignSelf: 'stretch', marginHorizontal: 30}}
        onPress={vm.onPressBid}
        fill>
        <WhiteButtonText>Bid on Car</WhiteButtonText>
      </Button>
      <Label style={{marginTop: 20, marginBottom: 5}}>Your new bids:</Label>
      <NewBids
        style={{flex: 1}}
        data={vm.newBids}
        keyExtractor={(item) => item.no}
        renderItem={({item, index}) => (
          <BidItem
            item={item}
            onEdit={() => vm.onEditNewBidAt(index)}
            onRemove={() => vm.onRemoveNewBidAt(index)}
          />
        )}
      />
      <Button green style={{alignSelf: 'stretch'}} onPress={vm.onPressCommit} fill>
        <WhiteButtonText>Commit to bid/update status</WhiteButtonText>
      </Button>
      <Label style={{marginTop: 20, marginBottom: 5}}>Current bids:</Label>
      <CurrentBids items={vm.currentBids} style={{flex: 1}} />
      <Label style={{marginTop: 20, marginBottom: 5}}>Your winnings:</Label>
      <Winnings items={vm.winnings} style={{flex: 1}} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-horizontal: 16px;
  background-color: white;
`;

const Label = styled(Roboto)`
  font-size: 17px;
`;

const BidCloseContainer = styled.View`
  margin-top: 50px;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 20px;
  margin-bottom: 10px;
`;

const NewBids = styled(FlatList)`
  flex: 1;
  background-color: ${Colors.cellBackground};
  padding: 5px;
  margin-bottom: 10px;
`;

export default Main;
