// MyComponent.js

import React from 'react';
import { useFetchData } from '../assets/data2';

const Test = () => {
  const { data, loading, error } = useFetchData();
console.log(data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Render your component using the 'data' variable
  return (
    <div>
      {/* Render your data here */}
    </div>
  );
};

export default Test;
