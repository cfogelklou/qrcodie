import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('Unit Tests', () => {
  it('sup', () => {
  });
});

describe('App Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <App />
    );
  });

}, 10000); // Set a timeout for the test to allow for async operations
