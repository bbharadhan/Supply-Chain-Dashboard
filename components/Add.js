"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Add({ open, setOpen, onAdd }) {
  const initialForm = {
    name: "",
    sku: "",
    category: "",
    quantity_on_hand: "",
    reorder_point: "",
    unit_cost: "",
    supplier: "",
    notes: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setErrors({});
    }
  }, [open]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim())
      newErrors.name = "Name is required";

    if (!form.sku.trim())
      newErrors.sku = "SKU is required";

    if (!form.category.trim())
      newErrors.category = "Category is required";

    if ( form.reorder_point === "" || form.reorder_point === null ) {
      newErrors.reorder_point = "Reorder Point is required";
    }

    if (!form.supplier.trim())
      newErrors.supplier =
        "Supplier is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();

    if ( Object.keys(validationErrors).length > 0 ) {
      setErrors(validationErrors);
      return;
    }

    await fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        ...form,
        quantity_on_hand: Number(form.quantity_on_hand || 0),
        reorder_point: Number(form.reorder_point),
        unit_cost: Number(form.unit_cost || 0),
      }),
    });
    onAdd();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Item
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div>
            <Input
              placeholder="Name *"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="SKU *"
              value={form.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
              className={errors.sku ? "border-red-500" : ""}
            />

            {errors.sku && (
              <p className="text-red-500 text-xs mt-1">
                {errors.sku}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Category *"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={errors.category ? "border-red-500" : ""}
            />

            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category}
              </p>
            )}
          </div>

          <Input
            type="number"
            placeholder="Quantity"
            value={form.quantity_on_hand}
            onChange={(e) => handleChange("quantity_on_hand", e.target.value)}
          />

          <div>
            <Input
              type="number"
              placeholder="Reorder Point *"
              value={form.reorder_point}
              onChange={(e) => handleChange("reorder_point", e.target.value)}
              className={errors.reorder_point ? "border-red-500" : ""}
            />

            {errors.reorder_point && (
              <p className="text-red-500 text-xs mt-1">
                {errors.reorder_point}
              </p>
            )}
          </div>

          <Input
            type="number"
            placeholder="Unit Cost"
            value={form.unit_cost}
            onChange={(e) => handleChange("unit_cost", e.target.value)}
          />

          <div>
            <Input
              placeholder="Supplier *"
              value={form.supplier}
              onChange={(e) => handleChange("supplier", e.target.value)}
              className={errors.supplier ? "border-red-500" : ""}
            />

            {errors.supplier && (
              <p className="text-red-500 text-xs mt-1">
                {errors.supplier}
              </p>
            )}
          </div>

          <Input
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />

          <Button onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}