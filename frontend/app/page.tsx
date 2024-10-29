import React from 'react';
import ListDisplay from './components/ListDisplay';

const Page: React.FC = async () => {
  const response = await fetch('http://localhost:8000/api/v1/lists');
  if (!response.ok) {
      throw new Error('Failed to fetch data');
  }
  const lists = await response.json();

  return <ListDisplay lists={lists} />;
};

export default Page;