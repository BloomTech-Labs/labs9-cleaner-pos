import React, { ComponentClass } from 'react';
import styled from '@emotion/styled';
// Components
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Types
import { FieldProps } from 'formik';
import { ManagerHouse } from './types';

const StyledSelect = styled(Select as ComponentClass<any>)`
  width: 100%;
  margin-top: 0.5rem;
  .select {
    color: var(--color-accent);
  }
`;

const Wrapper = styled.div`
  width: 100%;

  .menu-item {
    width: 100%;
    /* Flex */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: cover;
    margin-right: 2rem;
  }
`;

const DropDown = (houses: ManagerHouse[]) => ({ field, form }: FieldProps) => {
  return (
    <Wrapper>
      <StyledSelect {...field}>
        <MenuItem value={-1}>
          <em>Choose a property</em>
        </MenuItem>
        {houses.map((house) => (
          <MenuItem
            style={{ margin: '1rem 0' }}
            className='menu-item'
            key={house.id}
            value={house.id}
          >
            <img
              // Inline styles needed as when the dropbox is open
              // The img's are in another div, taking it out of reach
              // of our CSS
              style={{
                width: '6rem',
                height: '3.375rem',
                objectFit: 'cover',
                marginRight: '2rem',
              }}
              className='house-photo'
              src={house.photo_url}
              alt={house.name}
            />
            {house.name}
          </MenuItem>
        ))}
      </StyledSelect>
    </Wrapper>
  );
};

export default DropDown;
