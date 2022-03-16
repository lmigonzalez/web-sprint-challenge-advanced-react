// Write your tests here

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AppFunctional from './AppFunctional'



test('sanity', () => {
  expect(true).toBe(true)
})



test('render on the screen', () =>{

  render(<AppFunctional/>)

  const header = screen.getByText(/Coordinates/i, {exact: false});
  expect(header).toBeVisible();
  
})
