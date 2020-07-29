/* eslint-disable import/no-cycle */
import flutter from '../api/flutter.js';

export default ({
  _id, email, name, phone
}, amount) => (dispatch) => {
  const response = dispatch({
    type: 'PAYMENT_INITIATE',
    payload: flutter.post('/payments', {
      tx_ref: 'hooli-tx-1920bbtytty',
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
    })
  });

  return response;
};
