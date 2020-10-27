import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
