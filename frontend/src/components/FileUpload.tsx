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

DashboardModal.prototype.componentWillUnmount = function componentWillUnmount() {
  // this is here to override node_modules/@uppy/react/lib/DashboardModal.js
};

interface UploadProps {
  type?: string;
  id?: number;
  text?: string;
}

const FileUpLoad = (props: UploadProps) => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  const uppy = Uppy({
    restrictions: {
      maxNumberOfFiles: 1,
      maxFileSize: 10485760,
      allowedFileTypes: ['image/*', '.pdf'],
      minNumberOfFiles: 1,
    },
    autoProceed: false,
    debug: false,
  });
  useEffect(() => {
    uppy
      .use(AwsS3, {
        serverUrl: 'https://cleaner-pos.herokuapp.com/',
        serverHeaders: { Authorization: token },
      })
      .on('complete', (result: any) => {
        const url = result.successful[0].response.uploadURL;
        // TODO: this is where we are going to want to make an axios post request

        // For some reason, the class that disables the scrollbar while
        // Uppy is open is not removed upon file upload.
        // For now, we will forcibly remove it.
        document.body.classList.remove('uppy-Dashboard-isFixed');
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

// FileUploadHOF is a higher order function. It accepts a CB and returns
// the FileUpload component. The difference from the above is that it will
// run whatever you specified in the CB after a file is successfully uploaded
// and the file URL is received.
export const FileUploadHOF = (cb?: (url: string, type?: string) => void) => {
  return (props: UploadProps) => {
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('token');
    const uppy = Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 10485760,
        allowedFileTypes: ['image/*', '.pdf'],
        minNumberOfFiles: 1,
      },
      autoProceed: false,
      debug: false,
    });
    useEffect(() => {
      uppy
        .use(AwsS3, {
          serverUrl: 'https://cleaner-pos.herokuapp.com/',
          serverHeaders: { Authorization: token },
        })
        .on('complete', (result: any) => {
          const url = result.successful[0].response.uploadURL;
          // Whatever you put in the CB is going to be called here
          if (cb) {
            cb(url, props.type);
          }
          // For some reason, the class that disables the scrollbar while
          // Uppy is open is not removed upon file upload.
          // For now, we will forcibly remove it.
          document.body.classList.remove('uppy-Dashboard-isFixed');
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
};

export default FileUpLoad;
