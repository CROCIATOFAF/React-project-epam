import { render, screen } from '@testing-library/react';
import DetailedCard from '../components/DetailedCard/DetailedCard';
import { PokemonDetails } from '../types/index';

describe('DetailedCard Component', () => {
  const mockItem: PokemonDetails = {
    name: 'Bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    description: 'A grass type Pokémon.',
    height: 7,
    weight: 69,
    abilities: ['overgrow', 'chlorophyll'],
  };

  it('renders the detailed card with correct data', () => {
    render(<DetailedCard item={mockItem} onClose={() => {}} />);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('A grass type Pokémon.')).toBeInTheDocument();
    expect(screen.getByAltText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText(/Weight:/)).toBeInTheDocument();
    expect(screen.getByText(/Abilities:/)).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('69')).toBeInTheDocument();
    expect(screen.getByText('overgrow, chlorophyll')).toBeInTheDocument();
  });
});
