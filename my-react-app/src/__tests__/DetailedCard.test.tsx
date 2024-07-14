import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailedCard from '../components/DetailedCard/DetailedCard';
import { Pokemon } from '../types/index';

describe('DetailedCard Component', () => {
  const mockItem: Pokemon = {
    name: 'Bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    description: 'A grass type Pokémon.',
  };

  it('correctly displays the detailed card data', () => {
    render(<DetailedCard item={mockItem} onClose={() => {}} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('A grass type Pokémon.')).toBeInTheDocument();
  });

  it('closes the component when the close button is clicked', () => {
    const handleClose = jest.fn();
    render(<DetailedCard item={mockItem} onClose={handleClose} />);

    fireEvent.click(screen.getByText('Close'));
    expect(handleClose).toHaveBeenCalled();
  });
});
