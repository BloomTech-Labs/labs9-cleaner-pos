import styled from '@emotion/styled';

const SubBox = styled('div')`
  border: 1px solid black;
  background: white;
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

const AccUL = styled('ul')`
  list-style-type: none;
  text-decoration: none;
`;

const Confirmation = styled('div')`
  display: flex;
  flex-direction: column;
  float: left;
  padding-left: 1rem;
  border: var(--border);
  background: white;
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

export { SubBox, AccUL, Confirmation, ConfUL, Header };
