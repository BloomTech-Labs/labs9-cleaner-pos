import { Request, Response, NextFunction } from 'express';
import { stripe } from '../util/stripe.setup';

const get = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'Payment gateway up and running!' });
};

const post = async (req: Request, res: Response, next: NextFunction) => {
  const { plan, customer } = req.body;
  try {
    await stripe.subscriptions.create({
      customer,
      items: [
        {
          plan,
        },
      ],
    });
  } catch (e) {
    console.log('Error posting to payment gateway');
    next(e);
  }
};
export { get };
