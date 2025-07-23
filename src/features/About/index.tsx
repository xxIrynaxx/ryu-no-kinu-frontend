import React from 'react';
import TextBlock from './Components/TextBlock';
import './index.scss';
import Avatar from './Components/Avatar';
import { PreferencesContext } from '@/context/PreferencesContext';

const About = () => {
  return (
    <section className={`about about_dark`}>
      <TextBlock />
      <Avatar />
    </section>
  );
};

export default About;
