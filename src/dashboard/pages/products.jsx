import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Sidebar";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import differenceBy from 'lodash/differenceBy';
import { allProducts } from "../../api/fetchData";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import toast from "react-hot-toast";
import axios from 'axios';
import { Link } from "react-router-dom";

const ProductTable = () => {
  const url = localStorage.getItem("API_URL");
  const token = localStorage.getItem("authToken");

  const { data, loading, error } = allProducts();
  const products = data ? Object.values(data.products) : [];
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [deletedData, setData] = useState(data);

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const action = (page) => (
    <IconButton color="primary" href="/dashboard/addproduct">
      <Add />
    </IconButton>
  );

  const contextActions = React.useMemo(() => {
    const handleDelete = async () => {
      const ids = selectedRows.map((r) => r.id);
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map((r) => r.id)}`
        )
      ) {
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            ids: ids,
          },
        };
        try {
          const response = await axios.delete(
            `${url}/v1/product/delete`,
            config
          );

          if (response.status === 200 || response.status === 201) {
            setToggleCleared(!toggleCleared);
            setData(differenceBy(deletedData, selectedRows, "id"));
            toast.success("Product(s) deleted successfully.");
          } else {
            console.log(response.response);
            toast.error("Error deleting product(s).");
          }
        } catch (error) {
          console.log(error);
          toast.error("Error deleting product(s).");
        }
      }
    };

    return (
      <IconButton color="error" key="delete" onClick={handleDelete}>
        <Delete />
      </IconButton>
    );
  }, [deletedData, selectedRows, toggleCleared]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(products);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [products]);

  const columns = [
    {
      name: "Image",
      grow: 0,
      cell: (row) => (
        <img height="84px" width="56px" alt={row.name} src={row.image} />
      ),
    },
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      selector: (row) => "$ " + row.price,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      cell: (row) => (
        <Link to={`/dashboard/update/${row.id}`}>
          <EditIcon />
        </Link>
      ),

    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="flex-grow p-6">
        <DataTable
          title="Products List"
          columns={columns}
          data={rows}
          progressPending={pending}
          pagination
          pointerOnHover
          highlightOnHover
          actions={action()}
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </div>
    </div>
  );
};

export default ProductTable;
