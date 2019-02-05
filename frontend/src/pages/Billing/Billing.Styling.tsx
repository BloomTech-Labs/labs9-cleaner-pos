import styled from '@emotion/styled';

const SubBox = styled('div')`
  border: var(--border);
  padding: 20px;
  display: flex;
  height: 60vh;
  .checkmark {
    color: var(--color-accent);
  }
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

const Header = styled('h2')`
  font-family: Roboto;
  font-weight: bold;
  font-size: 150%;
`;

export { SubBox, AccordionItemBody, Confirmation, Header };
