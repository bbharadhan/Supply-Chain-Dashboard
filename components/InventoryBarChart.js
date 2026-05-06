"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function InventoryBarChart({ data }) {
  const CustomTick = ({ x, y, payload }) => {
    const words = payload.value.split(" ");
    return (
      <g transform={`translate(${x},${y})`}>
        {words.map((word, index) => (
          <text
            key={index}
            x={0}
            y={index * 12}
            dy={10}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
          >
            {word}
          </text>
        ))}
      </g>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 p-4 rounded-xl shadow border mt-6" > {/*className="bg-white p-4 rounded-xl shadow border mt-6"*/}
      <h2 className="text-center text-lg font-semibold mb-6">
        Quantity vs Reorder Point
      </h2>
      <div className="flex items-start gap-6 ">
        <div className="flex-1 h-[400px] bg-white/30 backdrop-blur-sm rounded-lg p-2">
          <ResponsiveContainer>
            <BarChart
              data={data}
              barGap={4}
              barCategoryGap="40%"
              margin={{ bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="name"
                interval={0}
                angle={0}
                textAnchor="middle"
                height={60}
                tick={<CustomTick />}
              />
              <YAxis 
                domain={[0, "auto"]}
                tickCount={11}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              />
              <Bar
                dataKey="quantity_on_hand"
                name="Quantity"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="reorder_point"
                name="Reorder Point"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className= "bg-white/60 backdrop-blur-md border rounded-xl p-4 w-[180px] shadow-sm">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">
            Label
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">Quantity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-600">
                Reorder Point
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}