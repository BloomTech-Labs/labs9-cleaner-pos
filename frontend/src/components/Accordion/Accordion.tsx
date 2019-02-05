import React from 'react';
import {
  AccordionItemBody,
  AccordionItemHeader,
  AccordionContainer,
} from './Accordion.styles';

const Accordion = (props: any) => {
  const children = props.children;
  return (
    <AccordionContainer>
      {children.map((child: any, index: number) => {
        if (child.type === 'title') {
          return (
            <AccordionItemHeader
              id={child.props.children}
              key={index}
              aria-expanded='true'
              aria-level={3}
              onClick={() => props.setIndex(index + 1)}
            >
              <h3>{child.props.children}</h3>
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
    </AccordionContainer>
  );
};

export default Accordion;
