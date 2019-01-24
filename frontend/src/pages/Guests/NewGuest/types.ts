import * as Yup from 'yup';

// For New User

// --Yup Validator
export const SignupSchema = Yup.object().shape({
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
});

// --InitialValueProps
export interface NewGuestInitialValues {
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  postCode?: string;
  full_name?: string;
  ext_it?: string;
  errorStatus?: string;
}

// Empty Values Object
export const emptyValues = {
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  postCode: '',
  errorStatus: '',
};
