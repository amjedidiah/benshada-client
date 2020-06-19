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

// Start Component
class Home extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    isSignedIn: PropTypes.bool,
    products: PropTypes.array
  };

  render = () => {
    const { isSignedIn, user, products } = this.props;
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
        icon: genders.filter(
          ({ name }) => name.toLowerCase() === gender.title.toLowerCase()
        )[0].icon
      };
    }

    category = {
      title:
        categories[categoriesRandomNumber] && categories[categoriesRandomNumber].name,
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
            <div className="col flex-grow-1 bg-white py-4 px-0">
              <ProductList products={products || []} count={12} title="Recently Added" />
            </div>
          </div>
        </div>
      </>
    );
  };
}
// End Component

const mapStateToProps = ({ auth, user, product }) => ({
  isSignedIn: auth.isSignedIn,
  user: user.selected,
  products: product.all
});

// Export component as React-functional-Component
export default connect(mapStateToProps)(Home);
