import { Request, Response, NextFunction } from 'express';
import { stripe } from '../util/stripe.setup';
import { updateUser, findUser } from '../models/users';
import axios, { AxiosRequestConfig } from 'axios';

const deleteL = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'connection removed' });
};

const post = async (req: Request, res: Response, next: NextFunction) => {
  const { authorizationCode, id } = req.body;
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
      await updateUser(id, {
        stripeUID: response.data.stripe_user_id,
      });
    }

    res.status(201).send({ message: 'Account succesfully connected!' });
  } catch (e) {
    console.log(e);
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
    const { id, amount, stripe_token } = req.body;

    const user = await findUser(id);

    if (!user.stripeUID) {
      next({
        ...new Error(
          'Please connect to stripe first, before processing payments',
        ),
        statusCode: 400,
      });
    }

    const charge = await stripe.charges
      .create({
        amount,
        currency: 'usd',
        destination: {
          account: user.stripeUID,
        },
        source: stripe_token,
      })
      .catch((error: Error) => console.log('Creating charge failed', error));
    if (charge.id) {
      const result = await stripe.charges.capture(charge.id);

      res.status(200).send({
        msg: 'Sucessfully processed payments',
        receipt: result.receipt_url,
      });
      return;
    }
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
};

export { post, deleteL, createPayment };
