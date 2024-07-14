import { render, screen } from '@testing-library/react';
import Card from '../components/Card/Card';
import { Pokemon } from '../types/index';

describe('Card Component', () => {
  const mockItem: Pokemon = {
    name: 'Bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    description: 'A grass type Pokémon.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  };

  it('renders the card with correct data', () => {
    render(<Card item={mockItem} onClick={() => {}} />);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('A grass type Pokémon.')).toBeInTheDocument();
    expect(screen.getByAltText('Bulbasaur')).toBeInTheDocument();
  });
});
