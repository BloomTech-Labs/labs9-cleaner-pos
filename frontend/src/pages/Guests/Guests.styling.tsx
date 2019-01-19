// Components
import Container from '../../components/Container';
import { GuestCard } from './GuestCard';
// Styles
import styled from '@emotion/styled';

const height = 216 / 16;
// In design file, image was 216px high
// For responsiveness, we want to use rems.
// Convert px to rem by dividing it by 16.
// ASSUMPTION: A rem is set to 16px in high level css.

export const StyledGuestCard = styled(GuestCard)`
  /* Sizing and Box Model */
  width: 100%;
  height: ${height}rem;

  /* Grid */
  display: grid;
  grid-gap: 36px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, ${height / 2});

  .user-image {
    /* Grid */
    grid-column: span 1;
    grid-row: span 2;

    /* Sizing and Box Model*/
    width: auto;
    height: ${height}rem;
    object-fit: cover;
  }

  .text-content {
    grid-column: 2 / 3;
    grid-row: 1;
    text-align: left;
  }

  .info-check-in {
    grid-column: 2;
    grid-row: 2;
  }

  .info-check-out {
    grid-column: 3;
    grid-row: 2;
  }

  .info-progress {
    grid-column: 4;
    grid-row: span 2;
  }
`;

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

export const MainText = styled.div`
  display: block;
  text-align: left;
  font-family: 'Roboto Bold', Arial, sans-serif;
  font-size: ${30 / 16}rem;
`;

export const SecondaryText = styled.div`
  display: inline-block;
  text-align: left;
  font-family: 'Roboto Light', Arial, sans-serif;
  font-size: 1rem;
`;
