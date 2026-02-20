import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

function Charts({ habits }) {
  // Last 7 entries
  const lastWeek = habits.slice(-7);

  const barData = lastWeek.map((h) => ({
    date: h.date,
    count:
      (h.reading ? 1 : 0) +
      (h.exercise ? 1 : 0) +
      (h.meditation ? 1 : 0),
  }));

  let reading = 0;
  let exercise = 0;
  let meditation = 0;

  habits.forEach((h) => {
    if (h.reading) reading++;
    if (h.exercise) exercise++;
    if (h.meditation) meditation++;
  });

  const pieData = [
    { name: "Reading", value: reading },
    { name: "Exercise", value: exercise },
    { name: "Meditation", value: meditation },
  ];

  const pieColors = ["#38bdf8", "#4ade80", "#f472b6"];

  return (
    <div className="charts">

      {/* Bar Chart */}
      <div>
        <h2>Top Habits (Last Week)</h2>

        <ResponsiveContainer width={300} height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              fill="url(#barGradient)"
            />

            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div>
        <h2>Average Completions</h2>

        <ResponsiveContainer width={300} height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={pieColors[index % pieColors.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;
