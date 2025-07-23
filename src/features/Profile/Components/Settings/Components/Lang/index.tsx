import React from 'react';
import './index.scss';
import { Lang } from '@/types';

type LangToggleProps = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

const LangToggle: React.FC<LangToggleProps> = ({ lang, onChange }) => {
  const isEnglish = lang === 'en';

  const toggleLang = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? 'en' : 'ua');
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isEnglish} onChange={toggleLang} />
      <span className="slider"></span>
      <span className="labels">
        <span className="label-left">UA</span>
        <span className="label-right">EN</span>
      </span>
    </label>
  );
};

export default LangToggle;
