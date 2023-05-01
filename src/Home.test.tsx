import { render, screen } from '@testing-library/react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import Home from '../src/pages/Home';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('Home', () => {
  const mockedNavigate = jest.fn() as jest.MockedFunction<NavigateFunction>;

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Home page', async () => {
    render(<Home />);

    expect(screen.getByText(/welcome to ncaterS/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

    screen.getByRole('button', { name: /login/i }).click();
    expect(mockedNavigate).toHaveBeenCalledWith('/login');

    screen.getByRole('button', { name: /register/i }).click();
    expect(mockedNavigate).toHaveBeenCalledWith('/register');
  });
});
