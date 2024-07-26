import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Pokemon, PokemonDetails } from '../../types/index';
import { RootState } from '../store';

interface ItemState {
  items: Pokemon[];
  selectedItems: Pokemon[];
  currentPage: number;
  totalPages: number;
  selectedCard: PokemonDetails | null;
  loading: boolean;
  searchTerm: string;
}

const initialState: ItemState = {
  items: [],
  selectedItems: [],
  currentPage: 1,
  totalPages: 0,
  selectedCard: null,
  loading: false,
  searchTerm: '',
};

// for fetching items
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({
    term,
    offset,
    limit,
  }: {
    term: string;
    offset: number;
    limit: number;
  }): Promise<{ results: Pokemon[]; count: number }> => {
    const url = term
      ? `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`
      : `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    if (term) {
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      const description = speciesData.flavor_text_entries.find(
        (entry: { language: { name: string } }) => entry.language.name === 'en',
      )?.flavor_text;
      return {
        results: [
          { ...data, description: description || 'No description available' },
        ],
        count: 1,
      };
    }
    const results = await Promise.all(
      data.results.map(async (item: { url: string }) => {
        const pokeResponse = await fetch(item.url);
        const pokeData = await pokeResponse.json();
        const speciesResponse = await fetch(pokeData.species.url);
        const speciesData = await speciesResponse.json();
        const description = speciesData.flavor_text_entries.find(
          (entry: { language: { name: string } }) =>
            entry.language.name === 'en',
        )?.flavor_text;
        return {
          ...pokeData,
          description: description || 'No description available',
        };
      }),
    );
    return { results, count: data.count };
  },
);

// fetching item details
export const fetchItemDetails = createAsyncThunk(
  'items/fetchItemDetails',
  async (name: string): Promise<PokemonDetails> => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
    );
    const data = await response.json();
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();
    const description = speciesData.flavor_text_entries.find(
      (entry: { language: { name: string } }) => entry.language.name === 'en',
    )?.flavor_text;
    return {
      name: data.name,
      image: data.sprites.front_default,
      description: description || 'No description available',
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map(
        (ability: { ability: { name: string } }) => ability.ability.name,
      ),
    };
  },
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pokemon[]>) => {
      state.items = action.payload;
    },
    selectItem: (state, action: PayloadAction<Pokemon>) => {
      state.selectedItems.push(action.payload);
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter(
        item => item.name !== action.payload,
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedCard: (state, action: PayloadAction<PokemonDetails | null>) => {
      state.selectedCard = action.payload;
    },
    unselectAll: state => {
      state.selectedItems = [];
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchItems.fulfilled,
        (
          state,
          action: PayloadAction<{ results: Pokemon[]; count: number }>,
        ) => {
          state.loading = false;
          state.items = action.payload.results;
          state.totalPages = Math.ceil(action.payload.count / 9);
        },
      )
      .addCase(fetchItems.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchItemDetails.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchItemDetails.fulfilled,
        (state, action: PayloadAction<PokemonDetails>) => {
          state.loading = false;
          state.selectedCard = action.payload;
        },
      )
      .addCase(fetchItemDetails.rejected, state => {
        state.loading = false;
      });
  },
});

export const {
  setItems,
  selectItem,
  unselectItem,
  setCurrentPage,
  setSelectedCard,
  unselectAll,
  setSearchTerm,
} = itemsSlice.actions;

export const selectItems = (state: RootState) => state.items.items;
export const selectSelectedItems = (state: RootState) =>
  state.items.selectedItems;
export const selectCurrentPage = (state: RootState) => state.items.currentPage;
export const selectTotalPages = (state: RootState) => state.items.totalPages;
export const selectLoading = (state: RootState) => state.items.loading;
export const selectSelectedCard = (state: RootState) =>
  state.items.selectedCard;
export const selectSearchTerm = (state: RootState) => state.items.searchTerm;

export default itemsSlice.reducer;
