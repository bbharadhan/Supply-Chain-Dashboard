"use client";

import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const categories = [ "Packaging", "Equipment", "Labels", "Safety", "Storage" ];

const statuses = [ "In Stock", "Low Stock", "Out of Stock" ];

export default function Filters({ filters, setFilters }) {
  const toggleCategory = (value) => {
    setFilters({
      ...filters,
      category: filters.category.includes(value)
        ? filters.category.filter((item) => item !== value)
        : [...filters.category, value],
    });
  };

  const toggleStatus = (value) => {
    setFilters({
      ...filters,
      status: filters.status.includes(value)
        ? filters.status.filter((item) => item !== value)
        : [...filters.status, value],
    });
  };

  return (
    <div className="flex gap-4 p-4 flex-wrap">
      <Input
        placeholder="Search by Name or ID"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            ...filters,
            search: e.target.value,
          })
        }
        className="w-60 border border-black"
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-48 justify-start border-black"
          >
            {filters.category.length > 0
              ? filters.category.join(", ")
              : "Category"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-48">
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center gap-2"
              >
                <Checkbox
                  checked={filters.category.includes(category)}
                  onCheckedChange={() =>
                    toggleCategory(category)
                  }
                />

                <label className="text-sm">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-48 justify-start border-black"
          >
            {filters.status.length > 0
              ? filters.status.join(", ")
              : "Stock Status"
            }
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-48">
          <div className="space-y-2">
            {statuses.map((status) => (
              <div
                key={status}
                className="flex items-center gap-2"
              >
                <Checkbox
                  checked={filters.status.includes(status)}
                  onCheckedChange={() =>
                    toggleStatus(status)
                  }
                />

                <label className="text-sm">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}