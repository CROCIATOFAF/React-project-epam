import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonDetails } from '../types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemon: builder.query<Pokemon[], { offset: number; limit: number }>({
      query: ({ offset, limit }) => `pokemon?limit=${limit}&offset=${offset}`,
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: name => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonQuery, useGetPokemonDetailsQuery } = api;
export default api;
