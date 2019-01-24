import React, { useState, Fragment, Children } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

const Label = styled('h3')`
	text-align: left
`;

interface MySettings {
  title?: string;
  onToggle?: (show: boolean) => void;
  onClick?: () => void;
  children?: any
//  content?: string;
}

const Accordion = ({ title, children, onToggle }: MySettings) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Label
        onClick={() => {
          setShow(!show);
          if (onToggle) {
            onToggle(!show);
          }
        }}
      >
        {title}
      </Label>
	  {show ? <Fragment>{children}</Fragment> : null}
{/* I think I'm going to have to use a map to get each individual child from the children and either show/hide. This means I'm probably going to have a key. Or else I can just scrap the whole children thing. Still thinking about this.*/}

    </div>
  );
};

Accordion.propTypes = {
  children: PropTypes.instanceOf(Object),
  onToggle: PropTypes.func,
  title: PropTypes.string,
//  child: PropTypes.any,
//  content: PropTypes.string
};

export default Accordion;
