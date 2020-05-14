import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faStoreAlt, faShoppingBag, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';

import '../Misc.css';

export default function NotFound(props) {
  const { type } = props;
  return (
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
              }[type]
            }
            className="fa-6x my-2"
          />
          <p className="mb-2 lead">No {type}s found</p>
          {
            {
              product: window.location.href.includes('user') ? (
                <span className="pointer text-primary" data-toggle="modal" data-target="#productModal">
                  Upload one
                </span>
              ) : (
                <Link to={`/${type}s`} className="btn rounded-pill btn-primary text-white text-capitalize">
                  Shop All {type}s
                </Link>
              ),
              store: (
                <Link to={`/${type}s`} className="btn rounded-pill btn-primary text-white text-capitalize">
                  Shop All {type}s
                </Link>
              )
            }[type]
          }
        </div>
      )}
    </ContainerDimensions>
  );
}
