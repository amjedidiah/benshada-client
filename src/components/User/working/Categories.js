import React, { Component } from 'react';
import MultiSelect from '../MultiSelect/MultiSelect.js';

export default class Categories extends Component {
  render = () => (
      <>
        <MultiSelect
          title="categories"
          availableOptions={[{ name: 'ankara' }, { name: 'adire' }, { name: 'agbada' }, { name: 'bags' }]}
          selectedOptions={[{ name: 'ankara' }, { name: 'adire' }, { name: 'agbada' }]}
        />
      </>
  )
}
