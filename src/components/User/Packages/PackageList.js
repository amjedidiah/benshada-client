// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import PackageDisplay from './PackageDisplay/PackageDisplay.js';
import NotFound from '../../NotFound/NotFound.js';

// Start Component
export default class PackageList extends Component {
  static propTypes = {
    packages: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), count: PropTypes.number
  };

  renderPackageList = (packages) => (packages.length > 0 ? (
      <>
        <div className="cards packages">
          {packages.slice(0, this.props.count).map((deliveryPackage, key) => (
            <PackageDisplay
              key={`packageList${key}`}
              deliveryPackage={deliveryPackage}
            />
          ))}
        </div>
      </>
  ) : (
      <NotFound type="package" />
  ));

  render() {
    const { packages } = this.props;

    return (
      <>
        {this.renderPackageList(packages)}
      </>
    );
  }
}
// End Component
