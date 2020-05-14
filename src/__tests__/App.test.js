import React from 'react';
import { mount, shallow } from 'enzyme';
import { render } from '@testing-library/react';
import App from '../components/App.js';

it('renders app component without crashing', () => {
  shallow(<App />);
});

it('renders entire app without crashing', () => {
  mount(<App />);
});
