'use client'

import React, { useState } from "react";
import { SquareCode } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateSummaryReport() {
  const [selectedReport, setSelectedReport] = useState<"bug" | "test" | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex flex-row flex-1 gap-4 border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-md"
          onClick={() => setSelectedReport("test")}
        >
          <div className="flex-shrink-0 mt-auto mb-auto">
            <SquareCode size={36} />
          </div>
          <div>
            <h3 className="font-semibold">Test Summary Report</h3>
            <p className="text-sm text-gray-500">
              Provides summarizing test activities and results
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Test Summary Report</DialogTitle>
        </DialogHeader>
        <form>
          <Input className="my-2" placeholder="Project Name" />
          <Input className="my-2" placeholder="Function Name" required />
          <Input className="my-2" placeholder="Test Summary" />
          <Input className="my-2" placeholder="Test Results" />
        </form>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
