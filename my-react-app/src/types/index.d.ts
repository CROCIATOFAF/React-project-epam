interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

interface Pokemon {
  name: string;
  url: string;
  description: string;
}

interface ResultsProps {
  items: Pokemon[];
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

interface AppState {
  searchTerm: string;
  results: Pokemon[];
  loading: boolean;
}
