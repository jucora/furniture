import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skill from '../components/Skill';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(<Skill />);
  expect(asFragment()).toMatchSnapshot();
});
