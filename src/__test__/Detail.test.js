import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Detail from '../components/Detail';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(
    <Detail
      location={{ state: 'value' }}
      history={{ push: () => {} }}
      loggedInStatus="LOGGED_IN"
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
