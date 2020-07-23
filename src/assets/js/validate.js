// Module imports
import luhn from 'luhn';

// Asset imports
import states from '../data/states.json';
import types from '../data/types.json';
import sizes from '../data/sizes.json';
import categories from './categories.js';
import genders from './genders.js';

export const productValidate = (productData) => {
  const errors = {};
  const {
    name,
    shortDescription,
    longDescription,
    price,
    discountPercentage,
    quantity,
    color,
    mainMaterial,
    category,
    gender,
    productionCountry,
    guarantee
  } = productData;

  if (!name) {
    errors.name = 'What is the name of your product?';
  }

  if (!shortDescription) {
    errors.shortDescription = 'Give your product a short but catchy description';
  }

  if (!longDescription) {
    errors.longDescription = 'Tell us more about your product';
  }

  if (!price || price < 1) {
    errors.price = 'How much is your product?';
  }

  if (!discountPercentage) {
    errors.discountPercentage = 'Your discount could be 0';
  }

  if (!quantity || quantity < 1) {
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

  if (!gender) {
    errors.gender = 'What is your gender?';
  } else if (!genders.map((gend) => gend.name).includes(gender)) {
    errors.gender = 'Do select one of our genders';
  }

  if (!mainMaterial) {
    errors.mainMaterial = 'What main material is your product made of?';
  }

  if (!productionCountry) {
    errors.productionCountry = 'What country was your product made in?';
  }

  if (!guarantee || guarantee < 1) {
    errors.guarantee = 'What is the number of days you can guarantee that your product will last for?';
  }

  if (!productData.sizes) {
    errors.sizes = 'What sizes does your product exist in?';
  } else if (
    !productData.sizes
      .map(({ value }) => value)
      .every((val) => sizes.map(({ value }) => value).includes(val))
  ) {
    errors.categories = 'Do select at least one of our categories';
  }

  return errors;
};

export const loginValidate = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = 'What is your email address?';
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(email)) {
    errors.email = 'The email provided is not valid';
  }

  if (!password) {
    errors.password = 'What is your password';
  }

  return errors;
};

export const registerValidate = ({
  firstName,
  familyName,
  email,
  phone,
  password,
  confirmPassword,
  type
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
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(email)) {
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

  return errors;
};

export const passwordValidate = ({ password, oldPassword }) => {
  const errors = {};

  if (!password) {
    errors.password = 'What is your new password';
  } else if (!/\d/.test(password)) {
    errors.password = 'To be secure enough, your new password must contain a number';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'To be secure enough, your new password must contain an upperCase letter';
  } else if (password.length < 6) {
    errors.password = 'To be secure enough, your new password must be at least 6 characters long';
  }

  if (!oldPassword) {
    errors.oldPassword = 'What is your old password';
  }

  return errors;
};

export const typeValidate = ({ type }) => {
  const errors = {};

  if (!type) {
    errors.type = 'What is your user type?';
  } else if (!types.includes(type)) {
    errors.type = 'Do select one of our user types';
  }

  return errors;
};

export const storeValidate = ({
  name, description, address, state, phone
}) => {
  const errors = {};

  if (!name) {
    errors.name = 'What is the name of your store?';
  }

  if (!description) {
    errors.description = 'Give your store a catchy description';
  }

  if (!address) {
    errors.address = 'Where is your store located?';
  }

  if (!state) {
    errors.state = 'In what state is your store located?';
  } else if (!states.map((store) => store.name).includes(state)) {
    errors.state = 'Please select a Nigerian state';
  }

  if (!phone) {
    errors.phone = 'What is the contact number for your store?';
  } else if (!/^[234]\d{12}$/i.test(phone)) {
    errors.phone = 'A valid Nigerian contact number starting with 234 is required';
  }

  return errors;
};

export const profileValidate = (profileData) => {
  const errors = {};
  const {
    firstName, familyName, address, phone, state
  } = profileData;

  if (!firstName) {
    errors.firstName = 'What is your first name?';
  }

  if (!familyName) {
    errors.familyName = 'What is your family name?';
  }

  if (!phone) {
    errors.phone = 'What is your phone number?';
  } else if (!/^[234]\d{12}$/i.test(phone)) {
    errors.phone = 'A valid Nigerian phone number starting with 234 is required';
  }

  if (!address) {
    errors.address = 'Where do you live?';
  }

  if (!state) {
    errors.state = 'In what state do you live in?';
  } else if (!states.map((store) => store.name).includes(state)) {
    errors.state = 'Please select a Nigerian state';
  }

  if (!profileData.categories) {
    errors.categories = 'What categories are you interested in?';
  } else if (
    !profileData.categories
      .map(({ value }) => value)
      .every((val) => categories.map(({ name }) => name).includes(val))
  ) {
    errors.categories = 'Do select at least one of our categories';
  }

  return errors;
};

export const addressValidate = ({
  firstName, familyName, address, phone, state
}) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = 'What is your first name?';
  }

  if (!familyName) {
    errors.familyName = 'What is your family name?';
  }

  if (!phone) {
    errors.phone = 'What is your phone number?';
  } else if (!/^[234]\d{12}$/i.test(phone)) {
    errors.phone = 'A valid Nigerian phone number starting with 234 is required';
  }

  if (!address) {
    errors.address = 'Where do you live?';
  }

  if (!state) {
    errors.state = 'In what state do you live in?';
  } else if (!states.map((store) => store.name).includes(state)) {
    errors.state = 'Please select a Nigerian state';
  }

  return errors;
};

export const userValidate = (userData) => {
  const errors = {};
  const { address, state, gender } = userData;

  if (!address) {
    errors.address = 'Where do you live?';
  }

  if (!state) {
    errors.state = 'In what state do you live in?';
  } else if (!states.map((store) => store.name).includes(state)) {
    errors.state = 'Please select a Nigerian state';
  }

  if (!gender) {
    errors.gender = 'What is your gender?';
  } else if (!genders.map(({ name }) => name).includes(gender)) {
    errors.gender = 'Do select one of our genders';
  }

  if (!userData.categories) {
    errors.categories = 'What categories are you interested in?';
  } else if (
    !userData.categories
      .map(({ value }) => value)
      .every((val) => categories.map(({ name }) => name).includes(val))
  ) {
    errors.categories = 'Do select at least one of our categories';
  }

  return errors;
};

export const packageValidate = (packageData) => {
  const errors = {};
  const { method, cost, maxDeliverySize } = packageData;

  if (!method) {
    errors.method = 'What is the delivery method for this package?';
  }

  if (!cost) {
    errors.cost = 'What is the cost of this package?';
  } else if (cost < 1) {
    errors.cost = 'Enter your cost in naira';
  }

  if (!maxDeliverySize) {
    errors.maxDeliverySize = 'What is the maximum size in kg that you can deliver on this package?';
  } else if (maxDeliverySize < 1) {
    errors.maxDeliverySize = 'Enter size in kg';
  }

  if (method === 'pickup') {
    const { pickupStationName, pickupStationAddress, pickupStationState } = packageData;

    if (!pickupStationName) {
      errors.pickupStationName = 'What is the name for the pickup station or a place nearby for this package?';
    }

    if (!pickupStationAddress) {
      errors.pickupStationAddress = 'What is the address for the pickup station for this package?';
    }

    if (!pickupStationState) {
      errors.pickupStationState = 'Required';
    } else if (!states.map((store) => store.name).includes(pickupStationState)) {
      errors.pickupStationState = 'Please select a Nigerian state';
    }
  }

  if (method === 'delivery') {
    const { from, to, duration } = packageData;

    if (!from) {
      errors.from = 'Required';
    } else if (!states.map((store) => store.name).includes(from)) {
      errors.from = 'Please select a Nigerian state';
    }

    if (!to) {
      errors.to = 'Required';
    } else if (!states.map((store) => store.name).includes(to)) {
      errors.to = 'Please select a Nigerian state';
    }

    if (!duration) {
      errors.duration = 'How long will it take to deliver?';
    } else if (maxDeliverySize < 1) {
      errors.maxDeliverySize = 'Enter size in kg';
    }
  }

  return errors;
};

export const ifVisa = (inputtxt) => {
  const cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

  return !!inputtxt.match(cardno);
};

export const ifMaster = (inputtxt) => {
  const cardno = /^(?:5[1-5][0-9]{14})$/;
  return !!inputtxt.match(cardno);
};

export const cardValidate = ({
  cvv, expiry, name, number
}) => {
  const errors = {};

  if (!cvv) {
    errors.cvv = 'What is the 3 digit pin at the back of your card?';
  } else if (cvv.length !== 3) {
    errors.cvv = `The 3 digit pin is ${3 - cvv.length} ${cvv.length > 3 ? 'more' : 'less'}`;
  }

  if (!expiry) {
    errors.expiry = 'What is the expiry date of your card?';
  } else if (expiry.length !== 7) {
    errors.expiry = 'The format is MM/YYYY';
  } else if ((expiry || []).includes('/')) {
    const expiryArr = expiry.split('/');
    const mm = Number(expiryArr[0]);
    const yyyy = Number(expiryArr[1]);
    const d = new Date();
    const y = d.getFullYear();
    const m = d.getMonth() + 1;

    if (mm > 12 || mm < 1) {
      errors.expiry = 'Please enter a valid month';
    }

    if (yyyy < y || (yyyy === y && mm <= m)) {
      errors.expiry = 'Date entered shows that card has expired';
    }
  }

  if (!name) {
    errors.name = 'What is the name on your card?';
  }

  const num = (number || '').replace(/\s/g, '');

  if (!num) {
    errors.number = 'What is the number on your card?';
  } else if (!luhn.validate(num)) {
    errors.number = 'Invalid card number';
  } else if (luhn.validate(num)) {
    if (!ifVisa(num) && !ifMaster(num)) errors.number = 'Please use either a visa or master card';
  }

  return errors;
};

export const deliveryCompanyValidate = ({
  name, email, phone, headOffice
}) => {
  const errors = {};

  if (!name) {
    errors.name = "Where is your company's name?";
  }

  if (!email) {
    errors.email = "What is your company's email address?";
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(email)) {
    errors.email = 'The email provided is not valid';
  }

  if (!phone) {
    errors.phone = "What is your company's contact phone number?";
  } else if (!/^[234]\d{12}$/i.test(phone)) {
    errors.phone = 'A valid Nigerian phone number starting with 234 is required';
  }

  if (!headOffice) {
    errors.headOffice = "Where is your company's head office?";
  }

  return errors;
};

export const testimonialValidate = ({ testimony }) => {
  const errors = {};

  if (!testimony) {
    errors.testimony = 'What do you have to say about Benshada?';
  }

  return errors;
};
