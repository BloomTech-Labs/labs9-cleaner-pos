import React, { useState, Fragment, Children } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

interface MySettings {
  title?: string;
  onToggle?: (show: boolean) => void;
  onClick?: () => void;
  children?: any;
}

const Accordion = ({ title, children, onToggle }: MySettings) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h2
        onClick={() => {
          setShow(!show);
          if (onToggle) {
            onToggle(!show);
          }
        }}
      >
        {title}
      </h2>
	  {show ? <Fragment>{children}</Fragment> : null}
{/* I think I'm going to have to use a map to get each individual child from the children and either show/hide. This means I'm probably going to have a key. Or else I can just scrap the whole children thing. Still thinking about this.*/}

    </div>
  );
};

Accordion.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  onToggle: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default Accordion;
