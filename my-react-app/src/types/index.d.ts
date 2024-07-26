export interface SearchProps {
  onSearch: (term: string) => void;
}

export interface SearchState {
  searchTerm: string;
}

export interface Pokemon {
  name: string;
  url: string;
  image: string;
  description: string;
}

export interface PokemonDetails {
  name: string;
  image: string;
  description: string;
  height: number;
  weight: number;
  abilities: string[];
}

export interface ResultsProps {
  items: Pokemon[];
  loading: boolean;
}

export interface Props {
  children: React.ReactNode;
}

export interface State {
  hasError: boolean;
}

export interface AppState {
  searchTerm: string;
  results: Pokemon[];
  loading: boolean;
  hasError: boolean;
}
