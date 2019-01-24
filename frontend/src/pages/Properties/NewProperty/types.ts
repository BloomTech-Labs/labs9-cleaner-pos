import * as Yup from 'yup';
import React from 'react';
import { FormikProps } from 'formik';

export const NewPropertySchema = Yup.object().shape({
  propertyName: Yup.string().required('Property name is required'),
  address1: Yup.string().required('Address is required'),
  address2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('Region is required'),
  country: Yup.string().required('Country is required'),
  postCode: Yup.string().required('Post Code is required'),
  photoUrl: Yup.string().url(),
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
  photoUrl: string;
  pricePerNight: number;
  feePerGuest: number;
  cleaningFee: number;
  defaultAst: number;
  astGuide: string;
  guestGuide: string;
  errorStatus?: string;
}

export const EmptyPropertyValues = {
  propertyName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postCode: '',
  country: '',
  photoUrl: '',
  pricePerNight: 0,
  feePerGuest: 0,
  cleaningFee: 0,
  defaultAst: 0,
  astGuide: '',
  guestGuide: '',
};

// URL related
export interface UrlObj {
  photo_url: string;
  ast_guide: string;
  guest_guide: string;
}

// From FileUpload.tsx
interface UploadProps {
  type?: string;
  id?: number;
  text?: string;
}

export interface MyFormProps extends FormikProps<NewPropertyInitialValues> {
  Uppy: (props: UploadProps) => JSX.Element;
}
