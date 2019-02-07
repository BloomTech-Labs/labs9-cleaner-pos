import styled from '@emotion/styled';
import house from '../../assets/house_alt.jpg';

const LoginDiv = styled('div')`
  /* Sizing and Box Model */
  margin: auto;
  width: 100%;
  height: 800px;

  /* Grid */
  display: grid;
  gap: ${36 / 16}rem;
  grid-gap: ${36 / 16}rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: '. . login';
  align-items: center;

  /* Background */
  background-image: url(${house});
  background-repeat: no-repeat;
  background-attachment: fixed;

  .login-container {
    /* Grid */
    grid-area: login;

    /* Flexbox */
    display: flex;
    align-items: center;
    flex-direction: column;

    /* Sizing and Box Model */
    min-width: 240px;
    height: 100%;
    margin: auto;

    /* Background */
    /* Thanks https://stackoverflow.com/a/35177384 */
    background-color: rgba(22, 21, 20, 0.5);
    background-blend-mode: multiply;
  }
`;

export default LoginDiv;
