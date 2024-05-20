import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Home() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className="w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">DASHBOARD</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center mb-4">
            <BsFillArchiveFill className="mr-4 text-3xl text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">PRODUCTS</h3>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">300</h1>
        </div>
        <div className="flex flex-col items-center w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center mb-4">
            <BsFillGrid3X3GapFill className="mr-4 text-3xl text-green-500" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">ORDERS</h3>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">12</h1>
        </div>
        <div className="flex flex-col items-center w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center mb-4">
            <BsPeopleFill className="mr-4 text-3xl text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">CUSTOMERS</h3>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">33</h1>
        </div>
        <div className="flex flex-col items-center w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center mb-4">
            <BsFillBellFill className="mr-4 text-3xl text-red-500" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">ALERTS</h3>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">42</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Home;
