"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function InventoryChart({ data }) {
    const getStatus = (item) => {
        if (item.quantity_on_hand === 0) return "outofstock";
        if (item.quantity_on_hand <= item.reorder_point) return "lowstock";
        return "instock";
    };

    const summary = {
        instock: 0,
        lowstock: 0,
        outofstock: 0,
    };

    data.forEach((item) => {
        const status = getStatus(item);
        summary[status]++;
    });

    const chartData = [
        { name: "In Stock", value: summary.instock, color: "#22c55e" },
        { name: "Low Stock", value: summary.lowstock, color: "#eab308" },
        { name: "Out of Stock", value: summary.outofstock, color: "#ef4444" },
    ];

    return (
        <div className="w-full mt-6">
            <h2 className="text-center text-lg font-semibold mb-6">
                Visual Representation of Item's Status
            </h2>

            <div className="flex items-center justify-center gap-8">
                <div className="w-[300px] h-[300px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                outerRadius={100}
                                innerRadius={60}
                                paddingAngle={3}
                                cornerRadius={5}
                                label
                            >
                                {chartData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white border rounded-xl shadow-sm p-4 w-[180px]">
                    <h3 className="text-sm font-semibold mb-3 text-gray-700">
                        Status Summary
                    </h3>
                    <div className="flex flex-col gap-3">
                        {chartData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm text-gray-600">
                                        {item.name}
                                    </span>
                                </div>

                                <span className="text-sm font-semibold text-gray-800">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}