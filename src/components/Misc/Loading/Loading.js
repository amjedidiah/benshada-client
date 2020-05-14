import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import '../Misc.css';
import ContainerDimensions from 'react-container-dimensions';

export default class Loading extends Component {
  render() {
    return (
      <ContainerDimensions>
        {({ height, width }) => (
          <div className="v-align" style={{ height: height * 0.8, width }}>
            <FontAwesomeIcon icon={faSpinner} className="text-primary fa-2x fa-pulse load-icon" />
          </div>
        )}
      </ContainerDimensions>
    );
  }
}
