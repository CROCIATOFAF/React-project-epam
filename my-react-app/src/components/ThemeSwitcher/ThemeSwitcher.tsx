import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <div>Current theme: {theme}</div>
    </div>
  );
};

export default ThemeSwitcher;
