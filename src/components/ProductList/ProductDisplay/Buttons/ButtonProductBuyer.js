/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartAlt } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userUpdate } from '../../../../redux/actions/users.js';

const ButtonProductBuyer = (props) => {
  const ifWishlisted = (productID, saved) => saved.map(({ _id }) => _id).includes(productID);

  const INIT = ifWishlisted(props.product._id, (props.user && props.user.saved) || [])
    ? faHeart
    : faHeartAlt;

  const [saveIcon, setSaveIcon] = useState(INIT);

  const shouldWishlist = (id, product, saved, email) => {
    const newSaved = ifWishlisted(id, saved)
      ? saved.filter(({ _id }) => _id !== id)
      : [...saved, product];


    setSaveIcon(
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );

    props.userUpdate(email, { saved: newSaved })
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
          || (response && response.statusText)
          || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
          || (err
            && err.response
            && err.response.data
            && err.response.data.message
            && err.response.data.message.name)
          || (err && err.response && err.response.statusText)
          || 'Network error'
      ))
      .finally(() => setSaveIcon(INIT));
  };

  const ifInCart = (productID, cart) => cart.map(({ _id }) => _id).includes(productID);

  const shouldAddToCart = (id, product, cart, email) => {
    const newCart = ifInCart(id, cart) ? cart.filter(({ _id }) => _id !== id) : [...cart, product];

    setSaveIcon(
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );

    props
      .userUpdate(email, { cart: newCart })
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => setSaveIcon(INIT));
  };

  const { product, user, isSignedIn } = props;
  const saved = (user && user.saved) || [];
  const cart = (user && user.cart) || [];
  const email = user && user.email;

  const { _id } = product;
  const history = useHistory();

  return (
    <>
      {}
      <span
        className={'pointer'}
        onClick={() => (!isSignedIn ? history.push('/login') : shouldWishlist(_id, product, saved, email))
        }
      >
        {saveIcon === INIT ? <FontAwesomeIcon icon={saveIcon} /> : saveIcon}
      </span>

      <span
        className={`pointer ml-2 ${ifInCart(_id, cart) ? 'text-primary-benshada' : ''}`}
        onClick={() => (!isSignedIn ? history.push('/login') : shouldAddToCart(_id, product, cart, email))
        }
      >
        <FontAwesomeIcon icon={faShoppingBag} />
      </span>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({ isSignedIn: auth.isSignedIn });

ButtonProductBuyer.propTypes = {
  product: PropTypes.object,
  user: PropTypes.object,
  userUpdate: PropTypes.func,
  isSignedIn: PropTypes.bool
};

export default connect(mapStateToProps, { userUpdate })(ButtonProductBuyer);
