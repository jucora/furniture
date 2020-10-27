import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Registration from '../components/auth/Registration';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(
    <Registration handleSuccessfulAuth={() => ''} />,
  );
  expect(asFragment()).toMatchSnapshot();
});
