import React, { ComponentClass } from 'react';
import styled from '@emotion/styled';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// Components
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiInput: {
      // Name of the rule
      underline: {
        // Some CSS
        '&:after': { borderBottom: '2px solid var(--color-accent)' },
      },
    },
  },
  typography: { useNextVariants: true },
});

// const StyledNativeSelect = styled(NativeSelect as ComponentClass<any>)``;

const Wrapper = styled.div`
  border: var(--border);
  padding: 1rem;
  border-radius: 5px;
  /* Flex */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Color */
  background-color: var(--color-bg-tertiary);
  label {
    margin-bottom: 0.5rem;
    /* Text */
    font-family: 'Roboto Medium', 'Helvetica', 'Arial', sans-serif;
    font-weight: normal;
    color: var(--color-text-accent);
  }
`;

const DropDown = ({
  className,
  label,
  value,
  onChange,
  children,
  testId,
}: {
  className?: string;
  label?: string;
  value?: any;
  onChange: (event: any) => void;
  children: any;
  testId?: string;
}) => {
  const appliedTestId = testId || 'dropdown';
  const appliedValue = value !== undefined ? { value } : {};

  return (
    <MuiThemeProvider theme={theme}>
      <Wrapper className={className}>
        {label ? <InputLabel htmlFor='dropdown'>{label}</InputLabel> : null}
        <NativeSelect
          // tslint:disable-next-line
          inputProps={{ 'data-testid': appliedTestId, id: 'dropdown' }}
          onChange={onChange}
          {...appliedValue}
        >
          {children}
        </NativeSelect>
      </Wrapper>
    </MuiThemeProvider>
  );
};

export default DropDown;
