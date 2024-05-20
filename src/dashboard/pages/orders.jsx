import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Sidebar";
import { allOrders } from "../../api/fetchData";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

const OrderTable = () => {


  const { data, loading, error } = allOrders();
  const orders = data ? Object.values(data) : [];
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(orders);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [orders]);

  const columns = [
    {
      name: "ID",
      selector: (row) => '#'+row.id,
    },
    {
      name: "customer name",
      selector: (row) => row.user.name,
    },
    {
      name: "total price",
      selector: (row) => row.total_price,
    },
    {
      name: "Created ",
      selector: (row) => row.created_at,
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="flex-grow p-6">
        <DataTable
          title="Orders List"
          columns={columns}
          data={rows}
          progressPending={pending}
          pagination
        />
      </div>
    </div>
  );
};

export default OrderTable;
