import { Request, Response, NextFunction } from 'express';
import { stripe } from '../util/stripe.setup';
import { updateUserById, findUser } from '../models/users';
import axios, { AxiosRequestConfig } from 'axios';

const deleteL = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'connection removed' });
};

const post = async (req: Request, res: Response, next: NextFunction) => {
  const { authorizationCode } = req.body;
  const { id } = req.token;
  if (!authorizationCode) {
    res.status(400).send({ message: 'Please include a valid token!' });
    return;
  }
  try {
    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: `BEARER ${process.env.stripe_secret}`,
      },
    };
    const response = await axios.post(
      `https://connect.stripe.com/oauth/token?`,
      { grant_type: 'authorization_code', code: authorizationCode },
      headers,
    );
    if (response !== undefined) {
      // hardcoded UID until we have logic implemented that allows us to pass this
      const updatedUser = await updateUserById(id, {
        stripeUID: response.data.stripe_user_id,
      });
      const user = await findUser(id);
    }

    res.status(201).send({ message: 'Account succesfully connected!' });
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
};

const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { amount } = req.body;
    const stripeToken = req.body.token;
    const { id } = req.token;

    const user = await findUser(id);
    if (user.stripeUID === '') {
      next({
        ...new Error(
          'Please connect to stripe first, before processing payments',
        ),
        statusCode: 400,
      });
      return;
    }

    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      destination: {
        account: user.stripeUID,
      },
      source: stripeToken,
    });
    res.status(200).send({ msg: 'Payment succeeded!' });
  } catch (e) {
    if (e.param === 'destination[account]') {
      e.statusCode = 401;
      next(e);
    }
    e.statusCode = 500;
    next(e);
  }
};

export { post, deleteL, createPayment };
