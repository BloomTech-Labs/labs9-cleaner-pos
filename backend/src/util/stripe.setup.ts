const { stripe_secret } = process.env;

// tslint:disable-next-line:no-var-requires
export const stripe = require('stripe')(stripe_secret);
