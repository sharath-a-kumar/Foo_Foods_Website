import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FoodItem from '../components/FoodItem/FoodItem'; // Import the component to test
import { StoreContext } from '../context/StoreContext'; // Import the context

describe('FoodItem Component', () => {
  test('renders food item correctly and handles remove from cart', () => {
    // Mock food item data
    const food = {
      id: '1',
      name: 'Pizza',
      price: 10,
      description: 'Delicious pizza',
      image: 'pizza.jpg',
    };

    // Mock context values
    const contextValues = {
      cartItems: { '1': 1 }, // Mock cart items with one item in the cart
      addToCart: jest.fn(), // Mock addToCart function
      removeFromCart: jest.fn(), // Mock removeFromCart function
      url: 'http://localhost:4000', // Mock URL
    };

    // Render FoodItem component within the context provider
    const { getByAltText } = render(
      <StoreContext.Provider value={contextValues}>
        <FoodItem {...food} />
      </StoreContext.Provider>
    );

    // Test if the remove button exists
    const removeButton = getByAltText('Remove from cart');
    expect(removeButton).toBeInTheDocument();

    // Simulate click event on remove button
    fireEvent.click(removeButton);

    // Assert that the removeFromCart function was called with the correct id
    expect(contextValues.removeFromCart).toHaveBeenCalledWith('1');
  });
});
