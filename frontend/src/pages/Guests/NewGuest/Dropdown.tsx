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
  /* Flex */
  display: flex;
  align-items: center;

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
`;

const MenuImage = styled.img`
  width: 10.67rem;
  height: 6rem;
  object-fit: cover;
  margin-right: 2rem;
`;

const MenuIcon = styled.i`
  font-size: 3rem;
  width: 10.67rem;
  margin-right: 2rem;
`;

const MenuItemStyled = styled(MenuItem as ComponentClass<any>)`
  margin: 1rem 0;
`;

const DropDown = (houses: ManagerHouse[]) => ({ field, form }: FieldProps) => {
  return (
    <Wrapper>
      <StyledSelect {...field}>
        <MenuItem value={-1}>
          <em>Choose a property</em>
        </MenuItem>
        {houses.map((house) => (
          <MenuItemStyled
            style={{ margin: '1rem 0' }}
            className='menu-item'
            key={house.id}
            value={house.id}
          >
            {house.photo_url ? (
              <MenuImage
                className='house-photo'
                src={house.photo_url}
                alt={house.name}
              />
            ) : (
              <MenuIcon className='fas fa-home' />
            )}
            {house.name}
          </MenuItemStyled>
        ))}
      </StyledSelect>
    </Wrapper>
  );
};

export default DropDown;
