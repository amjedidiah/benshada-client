// Module imports
import React from 'react';

// Component imports
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header/Header.js';
import Jumbotron from './Jumbotron/Jumbotron.js';
import GenderList from './GenderList/GenderList.js';
import ProductSpec from '../ProductSpec/ProductSpec.js';

// Asset imports
import categories from '../../assets/js/categories.js';
import { randNum } from '../../assets/js/prototypes.js';
import genders from '../../assets/js/genders.js';
import ProductList from '../ProductList/ProductList.js';

// Action imports
import { productsAll } from '../../redux/actions/products.js';
import { shopsAll } from '../../redux/actions/stores.js';
import { testimonialsAll } from '../../redux/actions/testimonials.js';
import StoreList from '../StoreList/StoreList.js';
import TestimonialList from './TestimonialList/TestimonialList.js';

// Start Component
class Home extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    isSignedIn: PropTypes.bool,
    products: PropTypes.array,
    stores: PropTypes.array,
    testimonials: PropTypes.array,
    productsAll: PropTypes.func,
    shopsAll: PropTypes.func,
    testimonialsAll: PropTypes.func
  };

  componentDidMount = () => {
    this.props.productsAll();
    this.props.shopsAll();
    this.props.testimonialsAll();
  };

  render = () => {
    const {
      isSignedIn, user, products, stores, testimonials
    } = this.props;
    const categoriesRandomNumber = randNum(3);
    const genderRandomNumber = randNum(2);
    let category = null;
    let gender = null;

    if (isSignedIn) {
      category = {
        title: user && user.categories[0],
        icon: categories.filter(
          ({ name }) => name.toLowerCase() === category.title.toLowerCase()
        )[0].icon
      };

      gender = {
        title: user && user.gender,
        icon: genders.filter(({ name }) => name.toLowerCase() === gender.title.toLowerCase())[0]
          .icon
      };
    }

    category = {
      title: categories[categoriesRandomNumber] && categories[categoriesRandomNumber].name,
      icon: categories[categoriesRandomNumber] && categories[categoriesRandomNumber].icon
    };

    gender = {
      title: genders[genderRandomNumber] && genders[genderRandomNumber].name,
      icon: genders[genderRandomNumber] && genders[genderRandomNumber].icon
    };

    return (
      <>
        <Header />
        <Jumbotron />
        <GenderList />
        <ProductSpec
          title={category.title}
          type={{
            name: 'category',
            value: category.title
          }}
          icon={category.icon}
        />
        <ProductSpec
          title={gender.title}
          type={{
            name: 'gender',
            value: gender.title
          }}
          icon={gender.icon}
        />
        <div className="container">
          <div className="row">
            <div className="col-12 flex-grow-1 bg-white py-4 px-0">
              <ProductList products={products || []} count={12} title="Recently Added" />
            </div>
            <div className="col-12 flex-grow-1 bg-white py-4 px-0">
              {!isSignedIn ? (
                ''
              ) : (
                <StoreList
                  stores={stores || []}
                  type={{ name: 'state', value: user && user.state }}
                  count={12}
                  title="Stores Around You"
                />
              )}
            </div>
            <div className="col-12 flex-grow-1 bg-white py-4 px-0">
              <ProductList
                products={products || []}
                count={12}
                type={{ name: 'discountPercentage', value: 100 }}
                title="Discounted"
              />
            </div>
            <div className="col-12 flex-grow-1 bg-white py-4 px-0">
              <StoreList
                stores={stores || []}
                type={{ name: 'isRegisteredBusiness', value: true }}
                count={12}
                title="Registered Stores"
              />
            </div>
          </div>
        </div>
        <TestimonialList title="Customer Testimonies" count={3} testimonials={testimonials} />
      </>
    );
  };
}
// End Component

const mapStateToProps = ({
  auth, user, product, store, testimonial
}) => ({
  isSignedIn: auth.isSignedIn,
  user: user.selected,
  products: product.all,
  stores: store.all,
  testimonials: testimonial.all
});

// Export component as React-functional-Component
export default connect(mapStateToProps, { productsAll, shopsAll, testimonialsAll })(Home);
