/// <reference types="@testing-library/jest-dom" />
import { MemoryRouter} from 'react-router-dom';
import {describe, expect, test, jest} from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SoilCoverageCapture from './src/components/Soil-Coverage-Capture'; // adjust path if needed

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
    
  test('slider changes when moved', () => {
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


  test('testing save button renders as disabled', () => {
    render(
      <MemoryRouter>
        <SoilCoverageCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    expect(screen.getByText('Save')).toHaveAttribute('disabled');

  });


  test('testing home button is shown to user', () => {
    render(
      <MemoryRouter>
        <SoilCoverageCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    const homeButton = screen.getByRole('button', { name: 'Home' });
    expect(homeButton).toBeInTheDocument();

  });


  test('testing logout button is shown to user', () => {
    render(
      <MemoryRouter>
        <SoilCoverageCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();

  });


  test('testing add image button brings up modal', async () => {
    render(
      <MemoryRouter>
        <SoilCoverageCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add Image'));
    
    // Wait for the thank-you message (modal opens)
    await waitFor(() => {
      expect(screen.getByText('In 10-15 randomly selected areas of the field, take a photo of an approximately 1 ft by 1 ft (30 by 30 cm) square of the soil surface.')).toBeInTheDocument();
    });

    // Close the modal-
    const closeButton = screen.getByLabelText('Dismiss');
    fireEvent.click(closeButton);
    

  });

});
