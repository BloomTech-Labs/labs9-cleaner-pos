import styled from '@emotion/styled';

const SubBox = styled('div')`
  border: var(--border);
  padding: 20px;
  .box {
    transition: all 2s linear;
    display: block;
  }
  .hidden {
    display: none;
    opacity: 0;
  }
`;
const AccordionItemBody = styled('dd')`
  border: var(--border);
`;

const Confirmation = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
`;

const ConfUL = styled('ul')`
  list-style-type: none;
  text-decoration: none;
  text-align: left;
`;

const Header = styled('h2')`
  font-family: Roboto;
  font-weight: bold;
  font-size: 150%;
`;

export { SubBox, AccordionItemBody, Confirmation, ConfUL, Header };
