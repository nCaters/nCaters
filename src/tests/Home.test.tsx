import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

test('renders react router', () => {
    const homeRoute = '/';

    render(
        <MemoryRouter initialEntries={[homeRoute]}>
            <Home />
        </MemoryRouter>
    )

    expect(screen.getByText(/Welcome to nCaterS/i)).toBeInTheDocument()

});