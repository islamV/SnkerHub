import React, { useState, useEffect } from 'react';

import Card from "../components/Card";
// import { data} from "../assets/data";
// import { data } from "../assets/data";
import { useFetchData } from '../api/fetchData';


const Explore = () => {

  const { data } = useFetchData();

  const products =data ? Object.values(data) : [];

  const filteredItems = products.filter(
    (s) => s.price !== null  
  );

  const items = filteredItems.map((item) => {
    return { ...item, qty: 1 };
  });

  return (
    <div className="">
      <div className="grid w-full grid-cols-1 p-10 min-h-fit md:p-20 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10mx-auto ">
        {items.map((product, idx) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Explore;


