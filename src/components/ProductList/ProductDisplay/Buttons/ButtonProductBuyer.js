import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userUpdate } from '../../../../redux/actions/user.js';

const ButtonProductBuyer = (props) => {
  const ifWishlisted = (productID, saved) => saved.map(({ _id }) => _id).includes(productID);

  const shouldWishlist = (id, product, saved, email) => {
    const newSaved = ifWishlisted(id, saved)
      ? saved.filter(({ _id }) => _id !== id)
      : [...saved, product];

    props.userUpdate(email, { saved: newSaved });
  };

  const ifInCart = (productID, cart) => cart.map(({ _id }) => _id).includes(productID);

  const shouldAddToCart = (id, product, cart, email) => {
    const newCart = ifInCart(id, cart)
      ? cart.filter(({ _id }) => _id !== id)
      : [...cart, product];

    props.userUpdate(email, { cart: newCart });
  };

  const { product, user, isSignedIn } = props;
  const saved = (user && user.saved) || [];
  const cart = (user && user.cart) || [];
  const email = user && user.email;

  const { _id } = product;
  const history = useHistory();

  return (
    <>
      <span
        className={`pointer ${ifWishlisted(_id, saved) ? 'text-primary-benshada' : ''}`}
        onClick={() => (!isSignedIn
          ? history.push('/login')
          : shouldWishlist(_id, product, saved, email))
        }
      >
        <FontAwesomeIcon icon={faSave} />
      </span>

      <span
        className={`pointer ml-2 ${ifInCart(_id, cart) ? 'text-primary-benshada' : ''}`}
        onClick={() => (!isSignedIn
          ? history.push('/login')
          : shouldAddToCart(_id, product, cart, email))
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
