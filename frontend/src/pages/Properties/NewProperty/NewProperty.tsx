import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import loadingIndicator from '../../utils/loading.svg';

// Components
import { FileUploadHOF } from '../../../components/FileUpload';
import NewPropertyView from './NewPropertyView';
// Types
import {
  AstObj,
  NewPropertySchema,
  NewPropertyInitialValues,
  UrlObj,
} from './types';
import { AxiosRequestConfig } from 'axios';
import { FormikActions } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
// Utils
import { axiosErrorHandler } from '../../utils';
import { EmptyPropertyValues } from './types';

const NewProperty = (props: RouteComponentProps) => {
  const [urls, setUrls] = useState({} as UrlObj);
  const [assistants, setAssistants] = useState([] as AstObj[]);
  const [startValues, setStartValues] = useState(
    {} as NewPropertyInitialValues,
  );
  const [edit, setEdit] = useState(false);

  const [errors, setErrors] = useState({ msg: '', error: false });
  useEffect(() => {
    // Get list of assistants from backend
    const url =
      process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    if (props.location.state === undefined) {
      setStartValues(EmptyPropertyValues);
      axios
        .get(`${url}/assistants`, headers)
        .then((res) => {
          setAssistants(res.data);
        })
        .catch(axiosErrorHandler(setErrors));
    } else {
      const {
        address,
        cleaning_fee,
        default_ast,
        default_ast_name,
        extra_guest_fee,
        price,
        name,
        photo_url,
        ast_guide,
        guest_guide,
      }: {
        address: string;
        cleaning_fee: number;
        default_ast: number;
        extra_guest_fee: number;
        price: number;
        name: string;
        default_ast_name: string;
        photo_url: string;
        ast_guide: string;
        guest_guide: string;
      } = props.location.state;
      const addressSplit = address.split('\n');
      const [
        address1,
        address2,
        city,
        state,
        country,
        postCode,
      ]: string[] = addressSplit;
      const loadValues = {
        address1,
        address2,
        city,
        state,
        country,
        postCode,
        propertyName: name,
        cleaningFee: +cleaning_fee,
        feePerGuest: +extra_guest_fee,
        defaultAst: default_ast,
        pricePerNight: +price,
      };

      setAssistants(props.location.state.openAst);
      setStartValues(loadValues);
      setUrls({
        photo_url,
        ast_guide,
        guest_guide,
      });
      setEdit(true);
    }
  }, []);
  // Invoke FileUploadHOF, passing a callback function which will update
  // state with URLs of uploaded files
  const urlFileUpload = FileUploadHOF((url: string, type?: string) => {
    if (type) {
      setUrls((prev) => ({ ...prev, [type]: url }));
    }
  });

  // Function Formik will call. POSTs to houses
  const onSubmit = async (
    values: NewPropertyInitialValues,
    actions: FormikActions<NewPropertyInitialValues>,
  ) => {
    const {
      propertyName,
      address1,
      address2,
      city,
      state,
      country,
      postCode,
      pricePerNight,
      feePerGuest,
      cleaningFee,
      defaultAst,
    } = values;

    const { photo_url, ast_guide, guest_guide } = urls;

    try {
      const url =
        process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

      const headers: AxiosRequestConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };

      const houseData = {
        name: propertyName,
        address: `${address1}\n${
          address2 ? address2 + '\n' : '\n'
        }${city}\n${state}\n${country}\n${postCode}`,
        photo_url,
        price: pricePerNight,
        cleaning_fee: cleaningFee,
        extra_guest_fee: feePerGuest,
        default_ast: defaultAst,
        guest_guide,
        ast_guide,
      };
      if (props.location.state === undefined) {
        await axios.post(`${url}/houses?test=true`, houseData, headers);
      } else {
        await axios.put(
          `${url}/houses/${props.location.state.id}`,
          houseData,
          headers,
        );
      }
      await actions.setSubmitting(false);
      await actions.setStatus('Submission successful. Thank you!');
      props.history.push('/properties');
    } catch (error) {
      console.error(error);
      await actions.setSubmitting(false);
      if (error.response) {
        const { status, data } = error.response;
        await actions.setErrors({
          errorStatus: status,
        });
        await actions.setStatus({
          msg: `${status}: ${data.message}`,
        });
      } else if (error.request) {
        await actions.setStatus({
          msg: 'Could not connect. Please try again later.',
        });
      } else {
        await actions.setStatus({
          msg: `Request could not be processed. Please refresh the page.\n\nError:\n${
            error.message
          }`,
        });
      }
    }
  };

  const goBack = () => props.history.push('/properties');
  return startValues.address1 !== undefined ? (
    <Formik
      initialValues={startValues}
      validationSchema={NewPropertySchema}
      onSubmit={onSubmit}
      render={(formProps) => {
        return (
          <NewPropertyView
            Uppy={urlFileUpload}
            assistants={assistants}
            urls={urls}
            goBack={goBack}
            edit={edit}
            {...formProps}
          />
        );
      }}
    />
  ) : (
    <img src={loadingIndicator} alt='animated loading indicator' />
  );
};

export default NewProperty;
