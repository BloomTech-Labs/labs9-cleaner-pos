import * as Yup from 'yup';

export const NewPropertySchema = Yup.object().shape({
  propertyName: Yup.string().required('Property name is required'),
  address1: Yup.string().required('Address is required'),
  address2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('Region is required'),
  country: Yup.string().required('Country is required'),
  postCode: Yup.string().required('Post Code is required'),
  pricePerNight: Yup.number()
    .required('Price per night is required')
    .positive()
    .integer(),
  feePerGuest: Yup.number()
    .required('Fee per guest is required')
    .positive()
    .integer(),
  cleaningFee: Yup.number()
    .required('Cleaning fee is required')
    .positive()
    .integer(),
  defaultAst: Yup.number(),
  astGuide: Yup.string().url(),
  guestGuide: Yup.string().url(),
});

export interface NewPropertyInitialValues {
  propertyName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  pricePerNight: number;
  feePerGuest: number;
  cleaningFee: number;
  defaultAst: number;
  astGuide: string;
  guestGuide: string;
}
