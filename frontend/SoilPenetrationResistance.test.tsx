/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {describe, expect, test, jest} from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SoilPenetrationResistanceCapture from './src/components/Soil-Penetration-Capture'; // adjust path if needed
import SoilPenetrationResistanceCompare from './src/components/Soil-Penetration-Compare';
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


describe('SoilPenetrationResistanceCapture', () => {
    
  test('renders the component with initial 8 entries', () => {
    render(
      <MemoryRouter>
        <SoilPenetrationResistanceCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );
    // Should render 8 rows initially
    const rows = screen.getAllByText(/Plot \d/);
    expect(rows.length).toBe(8);

    // Should render the submit button
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('adds a new plot when "Add Plot" is clicked', () => {
    render(
      <MemoryRouter>
        <SoilPenetrationResistanceCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add Plot'));

    // Should now have 9 plots
    const rows = screen.getAllByText(/Plot \d/);
    expect(rows.length).toBe(9);
  });

  test('minus a plot when "x" is clicked', () => {
    render(
      <MemoryRouter>
        <SoilPenetrationResistanceCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText('Remove Spot 1'));

    // Should now have 7 plots
    const rows = screen.getAllByText(/Plot \d/);
    expect(rows.length).toBe(7);
  });


  test('shows alert if any field is missing on submit', () => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <SoilPenetrationResistanceCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Submit'));
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Please make sure all values have been filled out'));
  });

  test('checking fetch call is correct', async () => {
    render(
      <MemoryRouter>
        <SoilPenetrationResistanceCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    // Fill all selects
    const selects = screen.getAllByRole('combobox');
    selects.forEach(select => {
      fireEvent.change(select, { target: { value: 'Some' } });
    });

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the fetch to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/add-soil-penetration-report',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.any(String),
        })
      );
    });
  });

  test('checking if form properly resets after submit click', async () => {
    render(
      <MemoryRouter>
        <SoilPenetrationResistanceCapture handleLogoutClick={mockHandleLogoutClick} />
      </MemoryRouter>
    );

    // Fill all selects
    const selects = screen.getAllByRole('combobox');
    selects.forEach(select => {
      fireEvent.change(select, { target: { value: 'Some' } });
    });

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

     // Wait for the thank-you message (modal opens)
    await waitFor(() => {
      expect(screen.getByText('Your form has been submitted. Thank you.')).toBeInTheDocument();
    });

    // Close the modal-
    const closeButton = screen.getByLabelText('Dismiss');
    fireEvent.click(closeButton);

    // Check if form was reset
    const updatedSelects = screen.getAllByRole('combobox');
    updatedSelects.forEach(select => {
      expect((select as HTMLSelectElement).value).toBe('');
    });
  });
});

describe('SoilPenetrationResistanceCompare Snapshot', () => {
  test('matches the snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <SoilPenetrationResistanceCompare handleLogoutClick={mockHandleLogoutClick} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});