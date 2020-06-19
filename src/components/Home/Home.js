// Module imports
import React from 'react';

// Component imports
import Header from '../Header/Header.js';
import Jumbotron from './Jumbotron/Jumbotron.js';
import GenderList from './GenderList/GenderList.js';
import ProductSpec from '../ProductSpec/ProductSpec.js';

// Asset imports
import categories from '../../assets/js/categories.js';
import { randNum } from '../../assets/js/prototypes.js';
import genders from '../../assets/js/genders.js';

// Start Component
class Home extends React.Component {
 render = () => {
   const categoriesRandomNumber = randNum(3);
   const genderRandomNumber = randNum(2);
   return (
  <>
    <Header />
    <Jumbotron />
    <GenderList />
    <ProductSpec title={categories[categoriesRandomNumber] && categories[categoriesRandomNumber].name} type={{ name: 'category', value: categories[categoriesRandomNumber] && categories[categoriesRandomNumber].name }} icon={categories[categoriesRandomNumber] && categories[categoriesRandomNumber].icon} />
    <ProductSpec title={genders[genderRandomNumber] && genders[genderRandomNumber].name} type={{ name: 'gender', value: genders[genderRandomNumber] && genders[genderRandomNumber].name }} icon={genders[genderRandomNumber] && genders[genderRandomNumber].icon} />
  </>
   );
 }
}
// End Component

// Export component as React-functional-Component
export default Home;
