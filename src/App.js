import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load CSV data
    Papa.parse('/Electric_Vehicle_Population_Data.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  // Data transformation for chart (example: counting vehicle types)
  const vehicleTypeCount = data.reduce((acc, vehicle) => {
    const type = vehicle['Electric Vehicle Type'];
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(vehicleTypeCount).map(([key, value]) => ({
    name: key,
    count: value,
  }));

  return (
    <div className="App">
      <h1>Electric Vehicle Population Dashboard</h1>
      <BarChart width={600} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default App;
