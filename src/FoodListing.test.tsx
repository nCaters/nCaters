import { render, screen, waitFor } from '@testing-library/react';
import FoodListing from '../src/pages/FoodListing';
import { BrowserRouter } from 'react-router-dom';

describe('FoodListing', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            data: {
                food: [
                    {
                        id: 1,
                        name: 'Pizza',
                        cuisine: 'Italian',
                        meal: 'Lunch',
                        cost: 10.99,
                    },
                    {
                        id: 2,
                        name: 'Sushi',
                        cuisine: 'Japanese',
                        meal: 'Dinner',
                        cost: 20.99,
                    },
                ],
            },
        }),
    })) as unknown as jest.MockedFunction<typeof global.fetch>;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render a list of restaurants', async () => {
    render(
        <BrowserRouter>
          <FoodListing />
        </BrowserRouter>
      );
    await waitFor(() => screen.getByText('Pizza'));

    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();

    expect(screen.getByText('Sushi')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();
    expect(screen.getByText('$20.99')).toBeInTheDocument();
  });
});
