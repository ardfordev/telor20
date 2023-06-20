"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '13:01:10',
    Rec_Balong: 19,
    P_Rejoyoso: 16,
  },
  {
    name: '13:01:15',
    Rec_Balong: 19,
    P_Rejoyoso: 16,
  },
  {
    name: '13:01:20',
    Rec_Balong: 19,
    P_Rejoyoso: 16,
  },
  {
    name: '13:01:25',
    Rec_Balong: 19,
    P_Rejoyoso: 16,
  },
  {
    name: '13:01:30',
    Rec_Balong: 19,
    P_Rejoyoso: 16,
  },
  {
    name: '13:01:35',
    Rec_Balong: 19,
    P_Rejoyoso: 16,
  },
  {
    name: '13:01:40',
    Rec_Balong: 19,
    P_Rejoyoso: 16,
  },
];

export function OverviewUnit() {
  return (
    <ResponsiveContainer width="100%" height={300}>
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
        <Line type="monotone" dataKey="Rec_Balong" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="P_Rejoyoso" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
