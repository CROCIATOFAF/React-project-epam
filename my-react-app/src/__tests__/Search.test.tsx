import { render, fireEvent } from '@testing-library/react';
import Search from '../components/Search/Search';

describe('Search Component', () => {
  it('saves the entered value to local storage when search button is clicked', () => {
    const onSearchMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Search onSearch={onSearchMock} />,
    );

    const input = getByPlaceholderText('Search Pokémon') as HTMLInputElement;
    const searchButton = getByText('Search');

    fireEvent.change(input, { target: { value: 'Charmander' } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe('Charmander');
    expect(onSearchMock).toHaveBeenCalledWith('Charmander');
  });

  it('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'Bulbasaur');
    const onSearchMock = jest.fn();
    const { getByPlaceholderText } = render(<Search onSearch={onSearchMock} />);

    const input = getByPlaceholderText('Search Pokémon') as HTMLInputElement;
    expect(input.value).toBe('Bulbasaur');
  });
});
