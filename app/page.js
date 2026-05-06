"use client";

import { useState, useEffect } from "react";
import InventoryTable from "@/components/InventoryTable";
import Filters from "@/components/Filter";
import InventoryChart from "@/components/InventoryChart";
import InventoryBarChart from "@/components/InventoryBarChart";
import Add from "@/components/Add";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });

  const [chartData, setChartData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  const fetchChartData = async () => {
    const res = await fetch("/api/inventory");
    const data = await res.json();
    setChartData(data);
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <main className="min-h-screen p-4 bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-200">

      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
        Inventory Tracking & Analytics Dashboard
      </h1>

      <Tabs defaultValue="inventory" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-gray-100 p-1 rounded-full">
            <TabsTrigger
              value="inventory"
              className="px-4 py-2 rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Tracking Dashboard
            </TabsTrigger>

            <TabsTrigger
              value="graph"
              className="px-4 py-2 rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Graph Dashboard
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="inventory">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Filters filters={filters} setFilters={setFilters} />

            <Button
              onClick={() => setOpenAdd(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white mr-5"
            >
              + Add Item
            </Button>
          </div>

          <InventoryTable
            filters={filters}
            refreshCharts={fetchChartData}
            refreshKey={chartData?.length || 0}
          />

          <div>
            <span className="ml-7 font-bold">Notes:</span> &nbsp;
            <span>Have included addition of items using ADD button and delete an item using DELETE icon in Action column</span>
          </div>

          <Add
            open={openAdd}
            setOpen={setOpenAdd}
            onAdd={fetchChartData}
          />
        </TabsContent>

        <TabsContent value="graph">
          <InventoryChart data={chartData} />
          <InventoryBarChart data={chartData} />
        </TabsContent>

        <div>
          <span className="ml-7 font-bold">Notes:</span> &nbsp;
          <span>Have included addition of items using ADD button and delete an item using DELETE icon in Action column</span>
        </div>
      </Tabs>
    </main>
  );
}