/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {describe, expect, test, jest} from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SoilCoverageCapture from './src/components/Soil-Coverage-Capture'; // adjust path if needed
import SoilCoverageCompare from './src/components/Soil-Coverage-Compare';
import * as renderer from 'react-test-renderer';

const mockHandleLogoutClick = jest.fn();
const mockNavigate = jest.fn();

jest.mock('typography');

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response)
) as jest.MockedFunction<typeof fetch>; 


// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => {
    const actual = jest.requireActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ state: { id: 'test-user' } }),
    };
});


describe('SoilCoverageCapture', () => {
    
  test('slider changes when moved', async () => {
    render(
      <MemoryRouter>
        <SoilCoverageCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );
    // Locate slider
    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '3' } }); // Set the new value

    expect(slider.value).toBe('3');
  });

  test('save button does not save when no image is imported', () => {
    render(
      <MemoryRouter>
        <SoilCoverageCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Save'));

  });

});



//   test('shows alert if any field is missing on submit', () => {
//     window.alert = jest.fn();
//     render(
//       <MemoryRouter>
//         <SoilPenetrationResistanceCapture handleLogoutClick={mockHandleLogoutClick} />
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByText('Submit'));
//     expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Please make sure all values have been filled out'));
//   });

//   test('checking fetch call is correct', async () => {
//     render(
//       <MemoryRouter>
//         <SoilPenetrationResistanceCapture handleLogoutClick={mockHandleLogoutClick} />
//       </MemoryRouter>
//     );

//     // Fill all selects
//     const selects = screen.getAllByRole('combobox');
//     selects.forEach(select => {
//       fireEvent.change(select, { target: { value: 'Some' } });
//     });

//     // Submit the form
//     fireEvent.click(screen.getByText('Submit'));

//     // Wait for the fetch to be called
//     await waitFor(() => {
//       expect(global.fetch).toHaveBeenCalledWith(
//         'http://localhost:3000/api/add-soil-penetration-report',
//         expect.objectContaining({
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: expect.any(String),
//         })
//       );
//     });
//   });

//   test('checking if form properly resets after submit click', async () => {
//     render(
//       <MemoryRouter>
//         <SoilPenetrationResistanceCapture handleLogoutClick={mockHandleLogoutClick} />
//       </MemoryRouter>
//     );

//     // Fill all selects
//     const selects = screen.getAllByRole('combobox');
//     selects.forEach(select => {
//       fireEvent.change(select, { target: { value: 'Some' } });
//     });

//     // Submit the form
//     fireEvent.click(screen.getByText('Submit'));

//      // Wait for the thank-you message (modal opens)
//     await waitFor(() => {
//       expect(screen.getByText('Your form has been submitted. Thank you.')).toBeInTheDocument();
//     });

//     // Close the modal-
//     const closeButton = screen.getByLabelText('Dismiss');
//     fireEvent.click(closeButton);

//     // Check if form was reset
//     const updatedSelects = screen.getAllByRole('combobox');
//     updatedSelects.forEach(select => {
//       expect((select as HTMLSelectElement).value).toBe('');
//     });
//   });
// });

// describe('SoilPenetrationResistanceCompare Snapshot', () => {
//   test('matches the snapshot', () => {
//     const tree = renderer
//       .create(
//         <MemoryRouter>
//           <SoilPenetrationResistanceCompare handleLogoutClick={mockHandleLogoutClick} />
//         </MemoryRouter>
//       )
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });