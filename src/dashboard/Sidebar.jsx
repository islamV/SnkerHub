import React from 'react';
import { Link } from "react-router-dom";
import { 
  BsCart3, 
  BsFillArchiveFill,  
  BsPeopleFill, 
  BsListCheck, 
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside className={`bg-white dark:bg-gray-800 shadow-lg ${openSidebarToggle ? 'block' : 'hidden'} lg:block h-full w-64`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <BsCart3 className="mr-2 text-2xl" />
          <span className="text-lg font-semibold">SHOP</span>
        </div>
        <button onClick={OpenSidebar} className="text-gray-700 dark:text-gray-200 lg:hidden">
          X
        </button>
      </div>
      <ul className="p-4">
        <li className="mb-4">
          <Link to="/dashboard" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-500">
            <BsCart3 className="mr-2 text-xl" /> Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="customers" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-500">
            <BsPeopleFill className="mr-2 text-xl" /> Customers
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/products" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-500">
            <BsFillArchiveFill className="mr-2 text-xl" /> Products
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/orders" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-500">
            <BsListCheck className="mr-2 text-xl" /> Orders
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
