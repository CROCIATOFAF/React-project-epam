import { render } from '@testing-library/react';
import Results from '../components/Results/Results';
import { Pokemon } from '../types/index';

describe('Results Component', () => {
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
    const { getByText } = render(<Results items={mockItems} loading={false} />);
    expect(getByText('Bulbasaur')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('displays loading message when loading', () => {
    const { getByText } = render(<Results items={[]} loading={true} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('displays no data message when there are no items', () => {
    const { getByText } = render(<Results items={[]} loading={false} />);
    expect(getByText('No Pokémon found')).toBeInTheDocument();
  });
});
