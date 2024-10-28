// FoodDisplay.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FoodDisplay from '../components/FoodDisplay/FoodDisplay'; 
import { StoreContext } from '../context/StoreContext'

const mockFoodList = [
  { _id: '1', name: 'Pizza', description: 'Cheesy goodness', price: '10.00', image: 'pizza.jpg', category: 'Italian' },
  { _id: '2', name: 'Burger', description: 'Juicy burger', price: '8.00', image: 'burger.jpg', category: 'American' },
  { _id: '3', name: 'Sushi', description: 'Fresh sushi', price: '15.00', image: 'sushi.jpg', category: 'Japanese' },
];

const mockCartItems = {
  '1': { quantity: 1, item: mockFoodList[0] },
  '2': { quantity: 2, item: mockFoodList[1] }
};

const renderComponent = (category) => {
  return render(
    <StoreContext.Provider value={{ food_list: mockFoodList, cartItems: mockCartItems, addToCart: jest.fn(), removeFromCart: jest.fn() }}>
      <FoodDisplay category={category} />
    </StoreContext.Provider>
  );
};

test('renders "Top Dishes Near You" heading', () => {
  renderComponent("All");
  expect(screen.getByText('Top Dishes Near You')).toBeInTheDocument();
});

test('renders all food items when category is "All"', () => {
  renderComponent("All");
  expect(screen.getByText('Pizza')).toBeInTheDocument();
  expect(screen.getByText('Burger')).toBeInTheDocument();
  expect(screen.getByText('Sushi')).toBeInTheDocument();
});

test('renders only food items of the specified category', () => {
  renderComponent("Italian");
  expect(screen.getByText('Pizza')).toBeInTheDocument();
  expect(screen.queryByText('Burger')).not.toBeInTheDocument();
  expect(screen.queryByText('Sushi')).not.toBeInTheDocument();
});

test('renders no food items when category does not match any item', () => {
  renderComponent("Mexican");
  expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
  expect(screen.queryByText('Burger')).not.toBeInTheDocument();
  expect(screen.queryByText('Sushi')).not.toBeInTheDocument();
});
