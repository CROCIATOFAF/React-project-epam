import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from '../components/CardList/CardList';
import { Pokemon } from '../types/index';

describe('CardList Component', () => {
  const mockItems: Pokemon[] = [
    {
      name: 'Bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      description: 'A grass type Pokémon.',
    },
    {
      name: 'Charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
      description: 'A fire type Pokémon.',
    },
  ];

  it('renders the specified number of cards', () => {
    const handleCardClick = jest.fn();
    render(<CardList items={mockItems} onCardClick={handleCardClick} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('displays a message when no cards are available', () => {
    const handleCardClick = jest.fn();
    render(<CardList items={[]} onCardClick={handleCardClick} />);

    expect(screen.getByText('No cards available')).toBeInTheDocument();
  });

  it('triggers onCardClick when a card is clicked', () => {
    const handleCardClick = jest.fn();
    render(<CardList items={mockItems} onCardClick={handleCardClick} />);

    fireEvent.click(screen.getByText('Bulbasaur'));
    expect(handleCardClick).toHaveBeenCalledWith(mockItems[0]);

    fireEvent.click(screen.getByText('Charmander'));
    expect(handleCardClick).toHaveBeenCalledWith(mockItems[1]);
  });

  it('should not throw any errors with an empty array of items', () => {
    const handleCardClick = jest.fn();
    render(<CardList items={[]} onCardClick={handleCardClick} />);

    expect(screen.getByText('No cards available')).toBeInTheDocument();
  });
});
