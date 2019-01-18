import styled from '@emotion/styled';
import Container from '../../components/Container';

export const GuestsDiv = styled(Container)`
  /* Flexbox */
  display: flex;
  flex-flow: row nowrap;

  h2 {
    display: inline;
  }

  .title {
    display: flex;
    text-align: left;
  }
`;
