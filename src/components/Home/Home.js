// Module imports
import React from 'react';

// Component imports
import Header from '../Header/Header.js';
import Jumbotron from './Jumbotron/Jumbotron.js';
import GenderList from './GenderList/GenderList.js';

// Start Component
const Home = () => (
  <>
    <Header />
    <Jumbotron />
    <GenderList />
  </>
);
// End Component

// Export component as React-functional-Component
export default Home;
