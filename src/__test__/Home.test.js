import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/Home';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(
    <Home
      handleLogin={() => ''}
      handleLogout={() => ''}
      loggedInStatus="LOGGED_IN"
      history={{ push: () => {} }}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
