import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { cookieService } from './services/cookies/cookieService';
import { FormikForm } from './gui/components/formikForm/FormikForm';

describe('login form', () => {
    test('login form should be in the document and is accessible', () => {
        const component = render(<App />);

        //Username label and input
        const usernameLabel = component.getByText('Username')
        expect(usernameLabel).toBeInTheDocument()
        expect(usernameLabel.getAttribute('for')).toBe('username')

        //Password label and input
        const passwordLabel = component.getByText('Password')
        expect(passwordLabel).toBeInTheDocument()
        expect(passwordLabel.getAttribute('for')).toBe('password')

        //Login button
        const loginButton = component.getByTestId('loginButton')
        expect(loginButton).toBeInTheDocument()
        expect(loginButton.getAttribute('type')).toBe('submit')
    });

    test('login inputs should accept text', () => {
        const component = render(<App />);

        const usernameInput = component.getByTestId('usernameInput')
        expect(usernameInput.value).toMatch('')
        fireEvent.change(usernameInput, { target: { value: 'username text' } })
        expect(usernameInput.value).toMatch('username text')

        const passwordInput = component.getByTestId('passwordInput')
        expect(passwordInput.value).toMatch('')
        fireEvent.change(passwordInput, { target: { value: 'password text' } })
        expect(passwordInput.value).toMatch('password text')
    });

    test('should login successfully', async () => {
        const mockFn = jest.fn();
        const component = render(<FormikForm handleLogin={mockFn} errorMessage='' />, { wrapper: MemoryRouter });

        const usernameInput = component.getByTestId('usernameInput')
        fireEvent.change(usernameInput, { target: { value: 'admin' } })

        const passwordInput = component.getByTestId('passwordInput')
        fireEvent.change(passwordInput, { target: { value: 'password' } })

        const loginButton = component.getByTestId('loginButton')
        fireEvent.submit(loginButton)

        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledWith({
                username: 'admin',
                password: 'password'
            });
        })
    });
    test('should logout successfully', () => {
        cookieService.set('accessToken', 'token-value')
        const component = render(<App />, { wrapper: MemoryRouter });

        const welcomeToDashboard = component.getByText('Welcome to Dashboard')
        expect(welcomeToDashboard).toBeInTheDocument()

        const collapseButton = component.getByTestId('navCollapse')
        expect(collapseButton).toBeInTheDocument()
        fireEvent.click(collapseButton)

        const logOutLabel = component.getByText('Log out')
        expect(logOutLabel).toBeInTheDocument()
        fireEvent.click(logOutLabel)

        const usernameLabel = component.getByText('Username')
        expect(usernameLabel).toBeInTheDocument()
    });
})