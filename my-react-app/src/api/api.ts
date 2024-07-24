import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonDetails } from '../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemons: builder.query<
      { results: Pokemon[]; count: number },
      { term: string; offset: number; limit: number }
    >({
      query: ({ term, offset, limit }) =>
        term
          ? `pokemon/${term.toLowerCase()}`
          : `pokemon?limit=${limit}&offset=${offset}`,
      transformResponse: (response: {
        results?: { name: string; url: string }[];
        name?: string;
        id?: number;
        species?: { url: string };
        sprites?: { front_default: string };
        count: number;
      }) => {
        if (response.name) {
          return {
            results: [
              {
                name: response.name,
                url: `https://pokeapi.co/api/v2/pokemon/${response.id}/`,
                description: 'No description available',
                image: response.sprites?.front_default || '',
              },
            ],
            count: 1,
          };
        } else {
          return {
            results:
              response.results?.map(item => ({
                name: item.name,
                url: item.url,
                description: 'No description available',
                image: '',
              })) || [],
            count: response.count,
          };
        }
      },
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: name => `pokemon/${name.toLowerCase()}`,
      transformResponse: (response: {
        name: string;
        height: number;
        weight: number;
        sprites: { front_default: string };
        species: {
          flavor_text_entries: {
            flavor_text: string;
            language: { name: string };
          }[];
        };
        abilities: { ability: { name: string } }[];
      }) => ({
        name: response.name,
        image: response.sprites.front_default,
        description:
          response.species.flavor_text_entries.find(
            entry => entry.language.name === 'en',
          )?.flavor_text || 'No description available',
        height: response.height,
        weight: response.weight,
        abilities: response.abilities.map(ability => ability.ability.name),
      }),
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = api;
