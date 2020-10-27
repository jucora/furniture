import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Track from '../components/Track';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(
    <Track user={{}} loggedInStatus="LOGGED_IN" history={{ push: () => {} }} />,
  );
  expect(asFragment()).toMatchSnapshot();
});
