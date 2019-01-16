import { Request, Response, NextFunction } from 'express';
import { stripe } from '../util/stripe.setup';

const get = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'Payment gateway up and running!' });
};

const post = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  try {
    const customer = await stripe.customers.create({
      source: id,
    });
    const sub = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: '1',
        },
      ],
    });
    res.send({ customer: customer.id, message: 'hooooorrayyyyy' });
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
};
export { get, post };
