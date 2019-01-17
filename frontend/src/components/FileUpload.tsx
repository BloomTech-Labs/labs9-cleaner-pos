import React, {
  useEffect,
  useState,
  useRef,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import { Button } from '../components/index';
import axios from 'axios';
import AwsS3 from '@uppy/aws-s3';
import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';
import '@uppy/dashboard/dist/style.css';

interface UploadProps {
  type?: string;
  id?: number;
  text?: string;
}
const FileUpLoad = (props: UploadProps) => {
  const [open, setOpen] = useState(false);

  const uppy = Uppy({
    restrictions: {
      maxNumberOfFiles: 1,
      maxFileSize: 10485760,
      allowedFileTypes: ['image/*', '.pdf'],
      minNumberOfFiles: 1,
    },
    autoProceed: false,
    debug: true,
  });
  useEffect(() => {
    uppy
      .use(AwsS3, { serverUrl: process.env.REACT_APP_Backend })
      .on('complete', (result: any) => {
        const url = result.successful[0].response.uploadURL;
        // TODO: this is where we are going to want to make an axios post request
        console.log(url, props.type, props.id);
      });
    return () => {
      uppy.close();
    };
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        text={props.text}
        datatestid='open-button'
      />
      <DashboardModal
        uppy={uppy}
        open={open}
        target={document.body}
        onRequestClose={() => setOpen(false)}
        closeModalOnClickOutside
      />
    </>
  );
};

export default FileUpLoad;
