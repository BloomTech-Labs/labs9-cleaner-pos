import React, { useState } from 'react';
import styled from '@emotion/styled';

const Accordion = (props: any) => {
  const children = props.children;
  return (
    <dl>
      {children.map((child: any, index: number) => {
        if (child.type === 'title') {
          return (
            <AccordionItemHeader
              id={child.props.children}
              key={index}
              aria-expanded='true'
              aria-level={3}
              onClick={() => props.setIndex(index)}
            >
              {child.props.children}
            </AccordionItemHeader>
          );
        } else {
          return (
            <AccordionItemBody
              key={index}
              aria-hidden={index !== props.index}
              aria-labelledby={child.title}
              className={
                index !== props.index
                  ? 'accordion__item hidden'
                  : 'accordion__item box'
              }
            >
              {child.props.children}
            </AccordionItemBody>
          );
        }
      })}
    </dl>
  );
};

const AccordionItemHeader = styled('dt')`
  background: var(--color-bg-main);
`;
const AccordionItemBody = styled('dd')``;

export default Accordion;
