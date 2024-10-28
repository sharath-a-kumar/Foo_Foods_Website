import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPopup from '../components/LoginPopup/LoginPopUp';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

const mockContextValue = {
    url: 'http://localhost:5000',
    setToken: jest.fn(),
};

const mockSetShowLogin = jest.fn();

const renderComponent = (contextValue = mockContextValue) => {
    return render(
        <StoreContext.Provider value={contextValue}>
            <LoginPopup setShowLogin={mockSetShowLogin} />
        </StoreContext.Provider>
    );
};

describe('LoginPopup Component', () => {
    beforeEach(() => {
        mockAxios.reset();
        jest.clearAllMocks();
    });

    test('renders login form by default', () => {
        renderComponent();

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('switches to Sign Up form', () => {
        renderComponent();

        fireEvent.click(screen.getByText(/click here/i));
        expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    test('handles login successfully', async () => {
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

        mockAxios.onPost('http://localhost:5000/api/user/login').reply(200, {
            success: true,
            token: 'fake-token'
        });

        fireEvent.submit(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(mockContextValue.setToken).toHaveBeenCalledWith('fake-token');
            expect(localStorage.getItem('token')).toBe('fake-token');
            expect(mockSetShowLogin).toHaveBeenCalledWith(false);
        });
    });

    test('handles login failure', async () => {
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

        mockAxios.onPost('http://localhost:5000/api/user/login').reply(200, {
            success: false,
            message: 'Login failed'
        });

        fireEvent.submit(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.queryByText('Login failed')).toBeInTheDocument();
        });
    });
});
