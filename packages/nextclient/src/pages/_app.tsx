import React from 'react';
import { AppProps } from 'next/app';
import '../../styles/tailwind.css';

import i18n, { initialI18nSettings, Language } from '../lib/i18n';

i18n.init({
  ...initialI18nSettings,
  /**
   * Current language
   */
  lng: Language.EN,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
