import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Dashboard from '../components/Dashboard/components/Dashboard';

const IndexPage: NextPage = () => {
  const [t] = useTranslation('common');

  return (
    <Dashboard />
  );
};

export default IndexPage;
