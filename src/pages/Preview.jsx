import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { findProduct } from '../api/fetchData';
import PreviewCard from "../components/PreviewCard";

const Preview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await findProduct(id);
        setProduct({ ...data, qty: 1 });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product data</div>;

  return (
    <div className="">
      {product && <PreviewCard product={product} />}
    </div>
  );
};

export default Preview;
