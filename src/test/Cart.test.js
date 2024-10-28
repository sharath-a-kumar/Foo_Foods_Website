import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cart from '../pages/Cart/Cart'; // Adjust the import path as per your project structure
import { StoreContext } from '../context/StoreContext';
import { act } from 'react-dom/test-utils'; // Import act from react-dom/test-utils

// Mock context values
const mockContextValue = {
  cartItems: {
    'item_id_1': 2,
    'item_id_2': 1,
  },
  food_list: [
    { _id: 'item_id_1', name: 'Item 1', price: 10, image: 'image_url_1' },
    { _id: 'item_id_2', name: 'Item 2', price: 15, image: 'image_url_2' },
  ],
  removeFromCart: jest.fn(),
  getTotalCartAmount: jest.fn(() => 35), // Mocked total cart amount
};

// Mock useNavigate hook
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Cart Component', () => {
  beforeEach(() => {
    render(
      <StoreContext.Provider value={mockContextValue}>
        <Cart />
      </StoreContext.Provider>
    );
  });

  test('renders cart items', () => {
    // Assert that cart items are rendered
    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getAllByText('Total')[0]).toBeInTheDocument(); // First "Total"
    expect(screen.getAllByText('Total')[1]).toBeInTheDocument(); // Second "Total"
  });

  test('renders cart details', () => {
    // Assert that cart total and details are rendered
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('$35')).toBeInTheDocument();
    expect(screen.getByText('Delivery Fee')).toBeInTheDocument();
    expect(screen.getByText('$2')).toBeInTheDocument(); // Delivery fee
    expect(screen.getAllByText('Total')[0]).toBeInTheDocument();
    expect(screen.getByText('$37')).toBeInTheDocument(); // Total amount with delivery fee
  });

  test('removes item from cart when remove button is clicked', () => {
    // Click on remove button for the first item
    fireEvent.click(screen.getAllByText('x')[0]);
    // Expect that removeFromCart function is called with the correct item id
    expect(mockContextValue.removeFromCart).toHaveBeenCalledWith('item_id_1');
  });

  test('navigates to order page when "PROCEED TO CHECKOUT" button is clicked', () => {
    // Click on the "PROCEED TO CHECKOUT" button
    fireEvent.click(screen.getByText('PROCEED TO CHECKOUT'));
    // Expect that navigate function is called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/order');
  });
});
