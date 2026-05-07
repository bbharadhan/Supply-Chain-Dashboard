"use client";

import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EditDialog from "./EditDialog";
import { Pencil, Info, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";

export default function InventoryTable({filters, refreshCharts, refreshKey}) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchData = async () => {
    const query = new URLSearchParams();
    if (filters.search)
      query.append("search", filters.search);

    if (filters.category.length > 0)
      query.append("category", filters.category.join(","));

    if (filters.status.length > 0)
      query.append("status", filters.status.join(","));

    const res = await fetch(`/api/inventory?${query.toString()}`);
    if (!res.ok) {
      console.error("API Failed");
      return;
    }
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [filters, refreshKey]);

  const getStatus = (item) => {
    if (item.quantity_on_hand === 0)
      return "Out of Stock";

    if (item.quantity_on_hand <= item.reorder_point)
      return "Low Stock";

    return "In Stock";
  };

  const confirmDelete = async () => {
    await fetch(`/api/inventory?id=${deleteId}`, {method: "DELETE"});
    fetchData();
    refreshCharts();
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "quantity_on_hand",
      header: "Quantity",
    },
    {
      accessorKey: "reorder_point",
      header: "Reorder Point",
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const status = getStatus(row.original);

        const color =
          status === "In Stock"
            ? "bg-green-100 text-green-700"
            : status === "Low Stock"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700";

        return (
          <Badge
            className={`${color} px-2 py-1 text-xs font-medium`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-blue-100"
              onClick={() => {setSelectedItem(item); setOpen(true); }}
            >
              <Pencil className="w-4 h-4 text-blue-600" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-red-100"
              onClick={() => {setDeleteId(item.id); setDeleteOpen(true); }}
            >
              <Trash className="w-4 h-4 text-red-600" />
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                  >
                    <Info className="w-4 h-4 text-gray-600" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p className="max-w-xs">
                    {item.notes?.trim()
                      ? item.notes
                      : "No NOTES added"
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-blue-600 text-white"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell ??
                        cell.column.columnDef.accessorKey,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Item?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditDialog
        open={open}
        setOpen={setOpen}
        item={selectedItem}
        onSave={() => {fetchData(); refreshCharts(); }}
      />
    </div>
  );
}