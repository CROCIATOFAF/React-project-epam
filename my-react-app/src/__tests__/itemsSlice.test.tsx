// import configureMockStore from 'redux-mock-store';
// import thunk, { ThunkDispatch } from 'redux-thunk';
// import { AnyAction } from 'redux';
// import { RootState } from '../redux/store';
// import itemsReducer, {
//   fetchItems,
//   fetchItemDetails,
//   initialState,
//   setItems,
//   selectItem,
//   unselectItem,
//   setCurrentPage,
//   setSelectedCard,
//   unselectAll,
//   setSearchTerm,
// } from '../redux/slices/itemsSlice';
// import { Pokemon, PokemonDetails } from '../types';

// const middlewares = [thunk];
// const mockStore = configureMockStore<
//   RootState,
//   ThunkDispatch<RootState, unknown, AnyAction>
// >(middlewares);

// describe('itemsSlice', () => {
//   let store = mockStore({ items: initialState } as RootState);

//   beforeEach(() => {
//     store = mockStore({ items: initialState } as RootState);
//   });

//   test('should handle initial state', () => {
//     expect(itemsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
//   });

//   test('should handle setItems', () => {
//     const newItems: Pokemon[] = [
//       {
//         name: 'Bulbasaur',
//         url: 'url',
//         image: 'image',
//         description: 'description',
//       },
//     ];
//     const action = setItems(newItems);
//     const state = itemsReducer(initialState, action);
//     expect(state.items).toEqual(newItems);
//   });

//   test('should handle selectItem', () => {
//     const newItem: Pokemon = {
//       name: 'Bulbasaur',
//       url: 'url',
//       image: 'image',
//       description: 'description',
//     };
//     const action = selectItem(newItem);
//     const state = itemsReducer(initialState, action);
//     expect(state.selectedItems).toContain(newItem);
//   });

//   test('should handle unselectItem', () => {
//     const newItem: Pokemon = {
//       name: 'Bulbasaur',
//       url: 'url',
//       image: 'image',
//       description: 'description',
//     };
//     const startState = { ...initialState, selectedItems: [newItem] };
//     const action = unselectItem(newItem.name);
//     const state = itemsReducer(startState, action);
//     expect(state.selectedItems).not.toContain(newItem);
//   });

//   test('should handle setCurrentPage', () => {
//     const action = setCurrentPage(2);
//     const state = itemsReducer(initialState, action);
//     expect(state.currentPage).toBe(2);
//   });

//   test('should handle setSelectedCard', () => {
//     const newDetails: PokemonDetails = {
//       name: 'Bulbasaur',
//       image: 'image',
//       description: 'description',
//       height: 7,
//       weight: 69,
//       abilities: ['overgrow'],
//     };
//     const action = setSelectedCard(newDetails);
//     const state = itemsReducer(initialState, action);
//     expect(state.selectedCard).toEqual(newDetails);
//   });

//   test('should handle unselectAll', () => {
//     const startState = {
//       ...initialState,
//       selectedItems: [
//         {
//           name: 'Bulbasaur',
//           url: 'url',
//           image: 'image',
//           description: 'description',
//         },
//       ],
//     };
//     const action = unselectAll();
//     const state = itemsReducer(startState, action);
//     expect(state.selectedItems).toEqual([]);
//   });

//   test('should handle setSearchTerm', () => {
//     const action = setSearchTerm('Pikachu');
//     const state = itemsReducer(initialState, action);
//     expect(state.searchTerm).toBe('Pikachu');
//   });

//   test('should handle fetchItems thunk', async () => {
//     const newItems: Pokemon[] = [
//       {
//         name: 'Bulbasaur',
//         url: 'url',
//         image: 'image',
//         description: 'description',
//       },
//     ];
//     const response = { results: newItems, count: 1 };
//     global.fetch = jest.fn(() =>
//       Promise.resolve({ json: () => Promise.resolve(response) }),
//     ) as jest.Mock;

//     await store.dispatch(
//       fetchItems({ term: '', offset: 0, limit: 9 }) as unknown as AnyAction,
//     );
//     const actions = store.getActions();
//     expect(actions[0].type).toBe(fetchItems.pending.type);
//     expect(actions[1].type).toBe(fetchItems.fulfilled.type);
//     expect(actions[1].payload).toEqual(response);
//   });

//   test('should handle fetchItemDetails thunk', async () => {
//     const newDetails: PokemonDetails = {
//       name: 'Bulbasaur',
//       image: 'image',
//       description: 'description',
//       height: 7,
//       weight: 69,
//       abilities: ['overgrow'],
//     };
//     global.fetch = jest.fn(() =>
//       Promise.resolve({ json: () => Promise.resolve(newDetails) }),
//     ) as jest.Mock;

//     await store.dispatch(fetchItemDetails('bulbasaur') as unknown as AnyAction);
//     const actions = store.getActions();
//     expect(actions[0].type).toBe(fetchItemDetails.pending.type);
//     expect(actions[1].type).toBe(fetchItemDetails.fulfilled.type);
//     expect(actions[1].payload).toEqual(newDetails);
//   });
// });
