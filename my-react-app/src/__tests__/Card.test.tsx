import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Card from '../components/Card/Card';
import { Pokemon } from '../types/index';
import { selectItem, unselectItem } from '../redux/slices/itemsSlice';

const mockStore = configureStore([]);

describe('Card Component', () => {
  const mockItem: Pokemon = {
    name: 'Bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    description: 'A grass type Pokémon.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  };

  const renderComponent = (
    store: MockStoreEnhanced,
    item: Pokemon,
    onClick: () => void,
  ) => {
    return render(
      <Provider store={store}>
        <Card item={item} onClick={onClick} />
      </Provider>,
    );
  };

  it('renders the card with correct data', () => {
    const store = mockStore({ items: { selectedItems: [] } });
    renderComponent(store, mockItem, () => {});
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('A grass type Pokémon.')).toBeInTheDocument();
    expect(screen.getByAltText('Bulbasaur')).toBeInTheDocument();
  });

  it('handles checkbox change correctly', () => {
    const store = mockStore({ items: { selectedItems: [] } });
    const { getByRole } = renderComponent(store, mockItem, () => {});
    const checkbox = getByRole('checkbox') as HTMLInputElement;

    // Simulate checking the checkbox
    fireEvent.click(checkbox);
    expect(store.getActions()).toContainEqual(selectItem(mockItem));

    // Simulate unchecking the checkbox
    fireEvent.click(checkbox);
    expect(store.getActions()).toContainEqual(unselectItem(mockItem.name));
  });

  it('handles onClick event', () => {
    const store = mockStore({ items: { selectedItems: [] } });
    const handleClick = jest.fn();
    renderComponent(store, mockItem, handleClick);

    // Simulate clicking the card
    fireEvent.click(screen.getByText('Bulbasaur'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('checkbox reflects selection state', () => {
    const store = mockStore({ items: { selectedItems: [mockItem] } });
    const { getByRole } = renderComponent(store, mockItem, () => {});
    const checkbox = getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });
});
