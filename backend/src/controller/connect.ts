import { Request, Response, NextFunction } from 'express';
import { stripe } from '../util/stripe.setup';
import { updateUserById, findUser } from '../models/users';
import axios, { AxiosRequestConfig } from 'axios';
import { putStayData } from '../models/stays/';
import { House } from '../interface';

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
    const { amount, subscription, stay_id } = req.body;
    const stripeToken = req.body.token;
    const { id } = req.token;

    const user = await findUser(id);
    if (user.stripeUID === null) {
      next({
        ...new Error(
          'Please connect to stripe first, before processing payments',
        ),
        statusCode: 401,
      });
      return;
    }
    if (!subscription) {
      next({
        ...new Error('Please subscribe in order to use this feature!'),
        statusCode: 400,
      });
    }

    const fee =
      subscription === 1
        ? Math.floor(0.015 * (amount * 100))
        : Math.floor(0.01 * (amount * 100));

    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      description: `Payment for your stay with Lodgel`,
      destination: {
        account: user.stripeUID,
      },
      source: stripeToken,
      // tslint:disable-next-line
      application_fee: fee,
    });

    // @ts-ignore
    await putStayData(stay_id, { stripe_receipt: charge.receipt_url });
    res
      .status(200)
      .send({ msg: 'Payment succeeded!', receipt: charge.receipt_url });
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
};

export { post, deleteL, createPayment };
