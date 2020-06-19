import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox, faStoreAlt, faShoppingBag, faUserEdit
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';

import PropTypes from 'prop-types';
import '../../assets/css/misc.css';

export default class NotFound extends React.Component {
  static propTypes = {
    type: PropTypes.string
  }

  render = () => (
    <ContainerDimensions>
      {({ height, width }) => (
        <div className="text-center pt-4 pb-4 v-align" style={{ height: height * 0.8, width }}>
          <FontAwesomeIcon
            icon={
              {
                product: faBox,
                store: faStoreAlt,
                order: faShoppingBag,
                review: faUserEdit
              }[this.props.type]
            }
            className="fa-6x my-2"
          />
          <p className="mb-2 lead">No {this.props.type}s found</p>
          {
            {
              product: window.location.href.includes('user') ? (
                <span className="pointer text-primary-benshada" data-toggle="modal" data-target="#productModal">
                  Upload one
                </span>
              ) : (
                <Link to={`/${this.props.type}s`} className="btn rounded-pill btn-primary text-white text-capitalize">
                  Shop All {this.props.type}s
                </Link>
              ),
              store: (
                <Link to={`/${this.props.type}s`} className="btn rounded-pill btn-primary text-white text-capitalize">
                  Shop All {this.props.type}s
                </Link>
              )
            }[this.props.type]
          }
        </div>
      )}
    </ContainerDimensions>
  )
}
