import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';
import {useConfirmAlert, useStores} from '@/hooks';
import {ConfirmAlertResult} from '@/constants';
//import {logIn} from '@/services/Api';

import * as api from '@/services/Api';

const tag = 'MainScreen::useViewModel() - ';
function useViewModel() {
  const nav = useNavigation();
  const {notification, user} = useStores();
  const [newBids, setNewBids] = React.useState([]);
  const [currentBids, setCurrentBids] = React.useState([]);
  const [winnings, setWinnings] = React.useState([]);
  const confirmAlert = useConfirmAlert();

  const onPressBid = () => {
    nav.navigate(Screens.bidCar, {
      onSaveHandler: (newBid) => {
        console.log(tag, 'New Bid Added ', newBid);
        setNewBids([...newBids, newBid]);
      },
    });
  };

  const onEditNewBidAt = (index) => {
    nav.navigate(Screens.bidCar, {
      onSaveHandler: (bid) => {
        console.log(tag, 'Updated Bid', bid);
        const updated = [...newBids];
        updated[index] = bid;
        setNewBids(updated);
      },
      bid: newBids[index],
    });
  };

  const onRemoveNewBidAt = async (index) => {
    const result = await confirmAlert(
      'Are you sure you want to remove this bid?',
    );
    if (result !== ConfirmAlertResult.OK) {
      return;
    }
    const updated = [...newBids];
    updated.splice(index, 1);
    setNewBids(updated);
  };

  const onPressCommit = async () => {
    console.log('---', newBids);
    const commitResult = await api.sendNewBids({data: newBids, bidder: user.username});

    const tmp = [];
    commitResult.map((itm) => {
      tmp.push({
        carNo: itm['car_number'],
        numOfBids: itm['number_of_bids'],
        totalPrice: itm['total_price_lottery_tickets'],
        invoiceSent: itm['invoice_sent'],
        readyForDraw: itm['ready_for_draw']
      })
    });

    setCurrentBids(tmp);

    // Clear New Bids Item
    setNewBids([]);

    // Update Current Bids with random names and so on
    // setCurrentBids([
    //   ...currentBids,
    // ]);
  };

  const onPressLogout = async () => {
    const result = await confirmAlert(
      'Are you sure you want to logout?',
    );
    if (result !== ConfirmAlertResult.OK) {
      return;
    }
    nav.navigate(Screens.logIn);
  };

  return {
    newBids,
    currentBids,
    winnings,
    onPressBid,
    onPressCommit,
    onEditNewBidAt,
    onRemoveNewBidAt,
    onPressLogout,
  };
}

export default useViewModel;
