import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import { AppContextProvider } from './context';

describe('Unit Tests', () => {
  it('test0', () => {});
});

describe('App Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <AppContextProvider>
        <App />
      </AppContextProvider>,
    );
    expect(getByText('QRCodie')).toBeInTheDocument();
  });
}, 10000); // Set a timeout for the test to allow for async operations
