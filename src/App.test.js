import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';
import MealByIngredients from './MealByIngredients';
import CategorySelection from './CategorySelection';

test('Renders SearchForm component', () => {
  const mockOnSearch = jest.fn();
  const mockOnClose = jest.fn();

  render(<SearchForm onSearch={mockOnSearch} onClose={mockOnClose} />);

  const inputElement = screen.getByPlaceholderText('Search by meal name');
  const submitButton = screen.getByRole('button', { name: 'Search' });

  fireEvent.change(inputElement, { target: { value: 'Arrabiata' } });
  fireEvent.click(submitButton);

  expect(mockOnSearch).toHaveBeenCalledWith('Arrabiata');
});


test('renders MealByIngredients component', () => {
  const mockOnSearch = jest.fn();
  const mockOnClose = jest.fn();

  render(<MealByIngredients onSearch={mockOnSearch} onClose={mockOnClose} />);

  const inputElement = screen.getByPlaceholderText('Type ingredient');
  const submitButton = screen.getByRole('button', { name: 'Search by ingredient' });

  fireEvent.change(inputElement, { target: { value: 'chicken' } });
  fireEvent.click(submitButton);

  expect(mockOnSearch).toHaveBeenCalledWith('chicken');
});

test('renders CategorySelection component', async () => {
  const mockOnCategorySelect = jest.fn();
  const mockOnClose = jest.fn();

  render(<CategorySelection onCategorySelect={mockOnCategorySelect} onClose={mockOnClose} />);

  const selectElement = screen.getByRole('combobox');
  // Wait for the categories to be loaded
  await screen.findByText('Pasta');
  // Simulate selecting an option
  fireEvent.change(selectElement, { target: { value: 'Pasta' } });
  // Add assertions based on the expected behavior of your component
});
