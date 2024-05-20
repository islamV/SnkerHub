import React, { useState } from 'react';
import Card from "../components/Card";
import { useFetchData } from '../api/fetchData';

const Explore = () => {
  const [currentPage, setCurrentPage] = useState(1); // Initialize current page to 1
  const { data, loading, error } = useFetchData(currentPage); 


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products = data.products? Object.values(data.products) : [];
  const totalPages = data ? data.total_pages : 15;

  const filteredItems = products.filter(
    (s) => s.price !== null  
  );

  const items = filteredItems.map((item) => {
    return { ...item, qty: 1 };
  });

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  console.log(products)

  return (
    <div className="">
      <div className="grid w-full grid-cols-1 p-10 mx-auto min-h-fit md:p-20 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10 ">
        {items.map((product, idx) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Explore;
