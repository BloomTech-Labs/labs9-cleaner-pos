import * as Yup from 'yup';
// Types
import { FormikProps } from 'formik';

// For New User

// --Yup Validator
export const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2)
    .max(128)
    .required('Name is required'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  phone: Yup.string()
    .min(2)
    .max(15)
    .required('Phone number is required'),
  address1: Yup.string().required('Address is required'),
  address2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('Region is required'),
  country: Yup.string().required('Country is required'),
  postCode: Yup.string().required('Post Code is required'),
  houseId: Yup.number().required(),
  extraGuests: Yup.number(),
  checkIn: Yup.date().required('Check-In date is required'),
  checkOut: Yup.date().required('Check-Out date is required'),
});

// --InitialValueProps
export interface NewGuestInitialValues {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
  houseId: number;
  extraGuests: number;
  checkIn: Date;
  checkOut: Date;
  errorStatus?: string;
}

// Empty Values Object
export const emptyValues = {
  fullName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  postCode: '',
  houseId: 0,
  extraGuests: 0,
  checkIn: new Date(),
  checkOut: new Date(),
  errorStatus: '',
};

// GET houses in useEffect
export interface ManagerHouse {
  id: number;
  name: string;
  address: string;
  manager_id: number;
  photo_url: string;
}

export interface MyGuestProps extends FormikProps<NewGuestInitialValues> {
  houses: ManagerHouse[];
  goBack: () => void;
}
