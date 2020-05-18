import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp from '../components/App.js';

const mockStore = configureStore([]);

describe('My Connected App Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      loader: {
        loading: false,
        bgColor: 'rgba(239, 147, 46, 0.7)',
        spinnerColor: '#fff',
        message: null,
        show: false
      },
      auth: { user: { name: 'Amaraegbu Jedidiah' } },
      cart: [{ name: 'Slippers' }]
    });
  });

  it('renders app component without crashing', () => {
    shallow(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
    );
  });
});
