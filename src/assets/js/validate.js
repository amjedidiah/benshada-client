import states from '../data/states.json';
import types from '../data/types.json';
import categories from './categories.js';

export const productValidate = ({
  name,
  shortDescription,
  longDescription,
  price,
  discountPercentage,
  quantity,
  color,
  mainMaterial,
  category,
  productionCountry,
  warranty,
  sizes
}) => {
  const errors = {};

  if (!name) {
    errors.name = 'What is the name of your product?';
  }

  if (!shortDescription) {
    errors.shortDescription = 'Give your product a short but catchy description';
  }

  if (!longDescription) {
    errors.longDescription = 'Tell us more about your product';
  }

  if (!price || price < 0) {
    errors.price = 'How much is your product?';
  }

  if (!discountPercentage) {
    errors.discountPercentage = 'Your discount could be 0';
  }

  if (!quantity || quantity < 0) {
    errors.quantity = 'How many products are you putting up for sale';
  }

  if (!color) {
    errors.color = 'What is the color of your product?';
  }

  if (!category) {
    errors.category = 'What category does your product belong to?';
  } else if (!categories.map((cat) => cat.name).includes(category)) {
    errors.category = 'Do select one of our categories';
  }

  if (!mainMaterial) {
    errors.mainMaterial = 'What main material is your product made of?';
  }

  if (!productionCountry) {
    errors.productionCountry = 'What country was your product made in?';
  }

  if (!warranty || warranty < 0) {
    errors.warranty = 'What is the number of days you can guarantee that your product will last for?';
  }

  if (!sizes) {
    errors.sizes = 'What sizes does your product exist in?';
  }

  return errors;
};

export const userValidate = ({
  firstName, familyName, email, phone, password, confirmPassword, type, address, state, age, gender
}) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = 'What is your first name?';
  }

  if (!familyName) {
    errors.familyName = 'What is your family name?';
  }

  if (!email) {
    errors.email = 'What is your email address?';
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
      email
    )
  ) {
    errors.email = 'The email provided is not valid';
  }

  if (!phone) {
    errors.phone = 'What is your phone number?';
  } else if (!/^[234]\d{12}$/i.test(phone)) {
    errors.phone = 'A valid Nigerian phone number starting with 234 is required';
  }

  if (!password) {
    errors.password = 'Create a new password';
  } else if (!/\d/.test(password)) {
    errors.password = 'To be secure enough, your new password must contain a number';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'To be secure enough, your new password must contain an upperCase letter';
  } else if (password.length < 6) {
    errors.password = 'To be secure enough, your new password must be at least 6 characters long';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Do confirm your new password to make it easier to remember';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Your confirmation did not match the password';
  }

  if (!type) {
    errors.type = 'What is your user type?';
  } else if (!types.includes(type)) {
    errors.type = 'Do select one of our user types';
  }

  if (!address) {
    errors.address = 'What is your address of residence?';
  }

  if (!state) {
    errors.state = 'What is your state of residence?';
  } else if (!states.map(({ name }) => name).includes(state)) {
    errors.state = 'Please select a Nigerian state';
  }

  if (!age) {
    errors.age = 'What is your age?';
  } else if (age < 18 || age > 65) {
    errors.age = 'This service is not for your age group';
  }

  if (!gender) {
    errors.gender = 'What is your gender';
  } else if (!['unisex', 'female', 'male'].includes(gender)) {
    errors.gender = 'Do select one of our genders';
  }

  return errors;
};
