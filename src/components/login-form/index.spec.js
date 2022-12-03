import LoginForm from './index.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe.skip('Login form tests', () => {
  test('it renders login form component', async () => {
    // Assemble
    render(<LoginForm />);

    // Act
    const loginInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Assert
    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  })

  test('it accepts email and password', async () => {
    // Assemble
    const EMAIL = 'mytest@email.com'
    const PASSWORD = '$ecure_Password0$'

    const user = userEvent.setup();
    render(<LoginForm />);

    // Act
    const loginInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(loginInput, EMAIL)
    await user.type(passwordInput, PASSWORD)


    // Assert
    expect(loginInput).toHaveValue(EMAIL);
    expect(passwordInput).toHaveValue(PASSWORD);
    expect(loginButton).toBeEnabled();
  })

  test('it shows error on invalid  email', async () => {
    // Assemble
    const EMAIL = 'mytest@email';
    const EMAIL_INVALID_MESSAGE = 'invalid email';

    const user = userEvent.setup();
    render(<LoginForm />);

    // Act
    const loginInput = screen.getByRole('textbox', { name: /email/i });

    await user.type(loginInput, EMAIL)

    const emailError = screen.getByText(EMAIL_INVALID_MESSAGE)

    // Assert    
    expect(emailError).toBeInTheDocument();
    expect(emailError).toHaveValue(EMAIL_INVALID_MESSAGE);
  })

  test('it shows error on invalid  password', async () => {
    // Assemble
    const PASSWORD = '123'
    const PASSWORD_INVALID_MESSAGE = 'invalid password'

    const user = userEvent.setup();
    render(<LoginForm />);

    // Act
    const passwordInput = screen.getByRole('textbox', { name: /password/i });

    await user.type(passwordInput, PASSWORD)

    const passwordError = screen.getByText(PASSWORD_INVALID_MESSAGE)

    // Assert    
    expect(passwordError).toBeInTheDocument();
    expect(passwordError).toHaveValue(PASSWORD_INVALID_MESSAGE);
  })

  test('it logins when login button clicked', async () => {
    // Assemble
    const EMAIL = 'mytest@email.com'
    const PASSWORD = '$ecure_Password0$'
    const onSubmitStub = jest.fn();

    const user = userEvent.setup();
    render(<LoginForm onSubmit={onSubmitStub}/>);

    // Act
    const loginInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(loginInput, EMAIL)
    await user.type(passwordInput, PASSWORD)
    await user.click(loginButton)

    // Assert    
    expect(onSubmitStub).toHaveBeenCalledTimes(1);
  })


  test('it disable login button if invalid email', async () => {
    // Assemble
    const EMAIL = 'invalidEmail.com'

    const user = userEvent.setup();
    render(<LoginForm />);

    // Act
    const loginInput = screen.getByRole('textbox', { name: /email/i });
    const loginButton = screen.getByRole('button', { name: /login/i });  

    await user.type(loginInput, EMAIL)


    // Assert
    expect(loginButton).toBeDisabled();
  })

  test('it disable login button if invalid password', async () => {
    // Assemble
    const PASSWORD = '123'

    const user = userEvent.setup();
    render(<LoginForm />);

    // Act
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const loginButton = screen.getByRole('button', { name: /login/i });  

    await user.type(passwordInput, PASSWORD)

    // Assert    
    expect(loginButton).toBeDisabled();    
  })

})