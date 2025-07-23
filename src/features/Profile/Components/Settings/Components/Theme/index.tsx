import React from 'react';
import './index.scss';
import { Theme } from '@/types';

type ThemeToggleProps = {
  theme: Theme;
  onChange: (theme: Theme) => void;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onChange }) => {
  const isLight = theme === 'LIGHT';

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? 'LIGHT' : 'DARK');
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isLight} onChange={toggleTheme} />
      <span className="slider"></span>
      <span className="labels-theme">
        <span className="label-left">D</span>
        <span className="label-right">L</span>
      </span>
    </label>
  );
};

export default ThemeToggle;
