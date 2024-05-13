
import React, { useState, useEffect } from 'react';

import PreviewCard from "../components/PreviewCard";
import { useParams } from "react-router-dom";
import { useFetchData } from '../api/fetchData';


const Preview = (props) => {
  const { id } = useParams();
  const productId = Number(id);

  const { data } = useFetchData();

  const products =data ? Object.values(data) : [];

  // const products=  data.products ;
  const filteredItems =products.filter(
    (s) => s.price !==  null 
  );

  const qtyUpdate = filteredItems.map((item) => {
    return { ...item, qty: 1 };
  });

  const items = qtyUpdate.filter((item) => item.id === productId);
  const product = items[0];

  return (
    <div className="">
      <PreviewCard product={product} />
    </div>
  );
};

export default Preview;
