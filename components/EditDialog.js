"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditDialog({open, setOpen, item, onSave}) {
  const [reorderpoint, setReorderPoint] = useState(0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (item) {
      setReorderPoint(item.reorder_point);
      setNotes(item.notes || "");
    }
  }, [item]);

  const handleSave = async () => {
    await fetch("/api/inventory", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: item.id,
        reorderpoint,
        notes,
      }),
    });
    onSave();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Item
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            type="number"
            value={reorderpoint}
            onChange={(e) => setReorderPoint(e.target.value)}
            placeholder="Reorder Point"
          />

          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
          />

          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}