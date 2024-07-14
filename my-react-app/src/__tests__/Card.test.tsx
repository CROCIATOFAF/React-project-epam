import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card/Card';
import { Pokemon } from '../types/index';

describe('Card Component', () => {
  const mockItem: Pokemon = {
    name: 'Bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    description: 'A grass type Pokémon.',
  };

  it('renders the relevant card data', () => {
    render(<Card item={mockItem} onClick={() => {}} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('A grass type Pokémon.')).toBeInTheDocument();
  });

  it('triggers onClick when the card is clicked', () => {
    const handleClick = jest.fn();
    render(<Card item={mockItem} onClick={handleClick} />);

    fireEvent.click(screen.getByText('Bulbasaur'));
    expect(handleClick).toHaveBeenCalled();
  });
});
