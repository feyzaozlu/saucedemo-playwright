export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'wrong_user',
    password: 'wrong_password',
  },
} as const;

export const PRODUCTS = {
  backpack: {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
  },
} as const;

export const CHECKOUT_DATA = {
  valid: {
    firstName: 'Feyza',
    lastName: 'Ozlu',
    postalCode: '12345',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Ozlu',
    postalCode: '12345',
  },
} as const;

export const ERROR_MESSAGES = {
  invalidCredentials: 'Username and password do not match any user in this service',
  lockedOut: 'Sorry, this user has been locked out',
  missingFirstName: 'Error: First Name is required',
} as const;

export const URLS = {
  home: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkoutStep1: '/checkout-step-one.html',
  checkoutStep2: '/checkout-step-two.html',
  checkoutComplete: '/checkout-complete.html',
} as const;
