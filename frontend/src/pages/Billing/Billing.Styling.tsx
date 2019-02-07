import styled from '@emotion/styled';

const SubBox = styled('div')`
  background: var(--color-main-light);
  padding: 20px;
  display: flex;
  height: 100%;
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
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    border: 0;
    height: 100%;
    .root {
      border: var(--border);
    }
  }
`;

const DescriptionContainer = styled('div')`
  border: var(--border);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 800px) {
    border: 0;
  }
`;

const ListContainer = styled('div')`
  width: '100%';
  height: '50%';
  background: var(--color-main-light);
  margin-bottom: 1rem;
  @media only screen and (max-width: 800px) {
    height: 100%;
    border: var(--border);
  }
`;

const SVGContainer = styled('div')`
  display: flex;
  justify-content: center;
  .svg-success {
    margin: 0 auto;
    stroke-width: 2px;
    stroke: #8ec343;
    fill: none;
    & path {
      stroke-dasharray: 17px, 17px;
      stroke-dashoffset: 0px;
      -webkit-animation: checkmark 0.25s ease-in-out 0.7s backwards;
      animation: checkmark 0.25s ease-in-out 0.7s backwards;
    }
    & circle {
      stroke-dasharray: 76px, 76px;
      stroke-dashoffset: 0px;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      -webkit-animation: checkmark-circle 0.6s ease-in-out forwards;
      animation: checkmark-circle 0.6s ease-in-out forwards;
    }
  }

  @keyframes checkmark {
    0% {
      stroke-dashoffset: 17px;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes checkmark-circle {
    0% {
      stroke-dashoffset: 76px;
    }

    100% {
      stroke-dashoffset: 0px;
    }
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

export {
  AccordionItemBody,
  Confirmation,
  DescriptionContainer,
  Header,
  ListContainer,
  SubBox,
  SVGContainer,
};
