// a library to wrap and simplify api calls
import Api from '@/constants/Api';
import Config from '@/config/AppConfig';
import numeral from 'numeral';
import base64 from 'react-native-base64';
import qs from 'qs';
import axios from 'axios';

const commonHeaders = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/x-www-form-urlencoded',
};

const instance = axios.create({
  baseURL: Config.apiEndPoint,
  headers: {'content-type': 'application/json'},
  timeout: 20000    // Timeout 20 seconds
});

export const logIn = (username, password) => {
  const url =
    Config.apiEndPoint + Api.logIn + '?' + qs.stringify({username, password});
  console.log(url);
  return fetch(url).then((resp) => resp.json());
};


export const getAvailableCarsForBid = () => {
  return axios.get('http://104.131.95.250/getAvailableCarsForBid').then(function (response) {
    return response.data;
  }).catch(function (ex) {
    console.log(ex);
    return false;
  })
};

export const sendNewBids = (param) => {
  return instance.post('http://104.131.95.250/sendNewBids', param)
      .then(function (response) {
        return response.data;
      });
};

// export const regBidder = (name, phoneNumber) => {
//   const url = 'http://104.131.95.250/regBidder' + '?' + qs.stringify({name, phoneNumber});
//   console.log(url);
//   return fetch(url).then((resp) => resp.json());
// }

// export const regBidder = async (bidder) => {
//   return axios.get('http://104.131.95.250/regBidder', {
//     params: bidder
//   }).then(function (response) {
//     return response;
//   }).catch(function (ex) {
//     console.log(ex);
//     return false;
//   })
// }

export const regBidder = (bidder) => {
  return instance.post('http://104.131.95.250/regBidder', bidder)
      .then(function (response) {
        return response;
      });
};