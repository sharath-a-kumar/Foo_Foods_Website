import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PlaceOrder from '../pages/PlaceOrder/PlaceOrder';
import { StoreContext } from '../context/StoreContext';

describe('PlaceOrder Component', () => {
  test('renders place order form correctly', () => {
    // Mock context values
    const contextValues = {
      getTotalCartAmount: jest.fn().mockReturnValue(10),
      token: 'mockToken',
      food_list: [
        { _id: '1', name: 'Pizza', price: 10 },
        { _id: '2', name: 'Burger', price: 5 }
      ],
      cartItems: { '1': 1, '2': 2 },
      url: 'http://localhost:4000',
    };

    // Render PlaceOrder component within the context provider and MemoryRouter
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <StoreContext.Provider value={contextValues}>
          <PlaceOrder />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    // Test if the place order button exists
    const placeOrderButton = getByText('PROCEED TO PAYMENT');
    expect(placeOrderButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(getByPlaceholderText('First name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByPlaceholderText('Street'), { target: { value: '123 Street' } });
    fireEvent.change(getByPlaceholderText('City'), { target: { value: 'New York' } });
    fireEvent.change(getByPlaceholderText('State'), { target: { value: 'NY' } });
    fireEvent.change(getByPlaceholderText('Zip-code'), { target: { value: '10001' } });
    fireEvent.change(getByPlaceholderText('Country'), { target: { value: 'USA' } });
    fireEvent.change(getByPlaceholderText('Phone'), { target: { value: '1234567890' } });

    // Simulate form submission
    fireEvent.click(placeOrderButton);

    // Add more assertions as needed
  });
});
