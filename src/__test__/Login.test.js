import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/auth/Login';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(<Login handleSuccessfulAuth={() => ''} />);
  expect(asFragment()).toMatchSnapshot();
});
