import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(<Header />);
  expect(asFragment()).toMatchSnapshot();
});

it('should have a title', () => {
  const { getByTestId } = render(<Header text="Musician Tracking App" />);
  expect(getByTestId('headerTitle')).toHaveTextContent('Musician Tracking App');
});

it('should have a subtitle', () => {
  const { getByTestId } = render(
    <Header text="Keep track of your musical skills!" />,
  );
  expect(getByTestId('title-subtitle')).toHaveTextContent(
    'Keep track of your musical skills!',
  );
});

test('header div child should have a class title-subtitle', () => {
  const { getByText } = render(<Header />);
  expect(getByText('Keep track of your musical skills!')).toHaveClass(
    'title-subtitle',
  );
});
