import sgMail from '@sendgrid/mail';
import { Request, Response, NextFunction } from 'express';
const sgKey: any = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sgKey);

/*
This is just the basic setup a post request to http://localhost:3000/email with
{
  "ast_name": "James",
  "manager_name": "Steve",
  "subject":"This is the subject",
  "link_address": "https://{ourFrontEndAddress}.com/{someComponent}?managerId={managerId}",
	"from": "william.thing@gmail.com",
	"to": "william.some@gmail.com"
}
We can prob grap the 'from' address off the managers decoded token when the post is submitted.
Will need a to address.
output email is formatted
```
Hello James,

You have been invited to clean for Steve

Please visit this link to signup and accept Cleaner POS
```
*/
export const send = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      ast_name,
      manager_name,
      subject,
      link_address,
      from,
      to,
    } = req.body;
    const msg = {
      dynamic_template_data: {
        astName: ast_name,
        linkAddress: link_address,
        managerName: manager_name,
        subject,
      },
      from,
      templateId: 'd-5eb00ba7abad4637bf24a96ec83281d8',
      to,
    };
    await sgMail.send(msg);
    res.status(200).json({ status: 'success' });
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
