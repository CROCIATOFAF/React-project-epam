import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value as 'light' | 'dark');
  };

  return (
    <div className="theme-switcher">
      <label>
        <input
          type="radio"
          value="light"
          checked={theme === 'light'}
          onChange={handleThemeChange}
        />
        Light
      </label>
      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={handleThemeChange}
        />
        Dark
      </label>
    </div>
  );
};

export default ThemeSwitcher;
