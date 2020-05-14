import React, { Component } from 'react';
import fedex from '../assets/img/fedex_logo.png';
import dhl from '../assets/img/dhl_logo.png';
import MultiSelect from '../MultiSelect/MultiSelect';

export default class DeliveryOptions extends Component {
  render() {
    return (
      <>
        <MultiSelect
          title="delivery_options"
          availableOptions={[
            { name: 'fedex', src: fedex },
            { name: 'dhl', src: dhl }
          ]}
          selectedOptions={[
            { name: 'fedex', src: fedex },
            { name: 'dhl', src: dhl }
          ]}
        />
      </>
    );
  }
}
