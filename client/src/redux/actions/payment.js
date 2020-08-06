/* eslint-disable import/no-cycle */
import flutter from '../api/flutter.js';

export default ({
  _id, email, name, phone
}, amount, txRef) => (dispatch) => {
  const payload = {
    tx_ref: txRef,
    amount,
    currency: 'NGN',
    redirect_url: 'http://localhost:3000/webhook',
    payment_options: 'card',
    meta: {
      consumer_id: _id,
      consumer_mac: ''
    },
    customer: {
      email,
      phonenumber: phone,
      name
    },
    customizations: {
      title: 'Benshada Payments',
      description: 'Pay for your African designs',
      logo: ''
    }
  };

  // const dummyResponse = {
  //   status: 'success',
  //   message: 'Hosted Link',
  //   data: {
  //     link: 'https://checkout-testing.herokuapp.com/v3/hosted/pay/b09c4cd73f73523bd3ce'
  //   }
  // };

  const response = dispatch({
    type: 'PAYMENT_INITIATE',
    payload: flutter.post('/payments', payload)
  });

  return response;
};
