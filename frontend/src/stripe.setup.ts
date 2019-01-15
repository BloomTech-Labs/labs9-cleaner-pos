/* tslint:disable */
export const stripe = require('stripe');
async function setup() {
  await stripe(process.env.REACT_APP_stripe_API);
}

setup();
console.log(stripe);
