import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDelay, useStores} from '@/hooks';
import * as api from '@/services/Api';


const getAvailableCarsForBid = async () => {
  return api.getAvailableCarsForBid();
};

function useViewModel(props) {
  const nav = useNavigation();
  const {notification, user} = useStores();
  const [availableCarsForBid, setAvailableCarsForBid] = React.useState([]);
  const [carNumber, setCarNumber] = React.useState('');
  const [tickets, setTickets] = React.useState('');

  const [disableSave, setDisableSave] = React.useState(false);
  // bid is the editing object, can be undefined
  const {onSaveHandler, bid} = props.route.params || {};

  // Whenever the bid object is changed, just update the car number and tickets
  React.useEffect(() => {

    setCarNumber(bid?.carNumber ?? '');
    setTickets(bid?.tickets ?? '');


    // After navigation, get all available cars
    getAvailableCarsForBid().then((response) => {
      setAvailableCarsForBid(response.data);
    });

  }, [bid]);

  const handleCarNumber = useDelay((value) => {
    console.log(value);
    setCarNumber(value);

    //Check this value with available cars
    const temp = [];
    availableCarsForBid.map((car) => {
      temp.push(car['start_number']);
    });

    if (temp.includes(value)){
      setDisableSave(false);
    }else {
      setDisableSave(true);
      notification.showWarn('Car number is not correct.');
    }
  }, 100);

  const handleTickets = useDelay((value) => {
    console.log(value);
    setTickets(value);
    if (value > 0 && value < 21){
      setDisableSave(false);
    }else {
      setDisableSave(true);
      notification.showWarn('Number of tickets is not correct.');
    }
  }, 100);
  
  const onSave = () => {
    // Check.
    if (!carNumber || !tickets) {
      notification.showWarn('Please enter details correctly.');
      return;
    }
    if (onSaveHandler) {
      onSaveHandler({carNumber, tickets});
    }
    nav.goBack();
  };

  const onCancel = () => {
    nav.goBack();
  };

  return {
    availableCarsForBid,
    carNumber,
    handleCarNumber,
    tickets,
    handleTickets,
    onSave,
    onCancel,
    disableSave
  };
}

export default useViewModel;
