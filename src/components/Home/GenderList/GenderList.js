// Module imports
import React, { Component } from 'react';
import { faMars, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons';

// Asset imports
import '../../../assets/css/gender.css';
import GenderDisplay from './GenderDisplay.js';

export default class GenderList extends Component {
  renderGenderList = () => [
    { name: 'male', icon: faMars },
    { name: 'female', icon: faVenus },
    { name: 'unisex', icon: faVenusMars }
  ].map(({ name, icon }, i) => <GenderDisplay key={`GenderDisplay${i}`} icon={icon} name={name} />);

  render = () => (
    <div className="container">
      <div className="row justify-content-between text-center bg-white bg-lg-light">{this.renderGenderList()}</div>
    </div>
  );
}
