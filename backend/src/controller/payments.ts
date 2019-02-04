import { Request, Response, NextFunction } from 'express';
import { stripe } from '../util/stripe.setup';
import { addSub } from '../models/manager';

const get = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'Payment gateway up and running!' });
};

const post = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).send({ message: 'Please include a valid token!' });
    return;
  }
  const plan = req.body.plan_id || '1';
  try {
    const customer = await stripe.customers.create({
      source: token,
    });
    const sub = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan,
        },
      ],
    });
    const subData = {
      stripe_cust: sub.customer,
      stripe_sub_id: sub.id,
      stripe_sub_plan: sub.plan.id,
    };
    await addSub(req.token.id, subData);
    res.status(201).send({ customer: customer.id, plan: sub.plan.id });
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
};
export { get, post };
