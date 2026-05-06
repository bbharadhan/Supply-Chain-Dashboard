"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Filters({filters, setFilters}) {
  return (
    <div className="flex gap-4 p-4 flex-wrap">
      <Input
        placeholder="Search by Name or ID"
        value={filters.search}
        onChange={(e) => setFilters({...filters, search: e.target.value})}
        className="w-60 border border-black"
      />

      <Select
        value={filters.category}
        onValueChange={(value) => setFilters({...filters, category: value === "all" ? "" : value})}
      >
        <SelectTrigger className="w-48 border border-black">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All
          </SelectItem>

          <SelectItem value="Packaging">
            Packaging
          </SelectItem>

          <SelectItem value="Equipment">
            Equipment
          </SelectItem>

          <SelectItem value="Labels">
            Labels
          </SelectItem>

          <SelectItem value="Safety">
            Safety
          </SelectItem>

          <SelectItem value="Storage">
            Storage
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value) => setFilters({...filters, status: value === "all" ? "" : value})}
      >
        <SelectTrigger className="w-48 border border-black">
          <SelectValue placeholder="Stock Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All
          </SelectItem>

          <SelectItem value="In Stock">
            In Stock
          </SelectItem>

          <SelectItem value="Low Stock">
            Low Stock
          </SelectItem>

          <SelectItem value="Out of Stock">
            Out of Stock
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}