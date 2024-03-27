// ChatGPT Implement firebase testing login callback handle testing-library jest NextJS typescript 

// Login.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import firebase from 'firebase';
import { Header as login } from '../src/components/Header';
import { Header } from 'next/dist/lib/load-custom-routes';

jest.mock('firebase', () => ({
  auth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
  })),
}));

describe('Login Component', () => {
  test('Login success', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    // Mocking Firebase signInWithEmailAndPassword function
    (firebase.auth as jest.Mocked<any>).signInWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        email,
      },
    });

    render(<Header />);

    userEvent.type(screen.getByLabelText(/email/i), email);
    userEvent.type(screen.getByLabelText(/password/i), password);

    userEvent.click(screen.getByText(/login/i));

    // Wait for the login process to complete
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument(); // Assuming your app displays a welcome message after successful login
    });
  });
});
