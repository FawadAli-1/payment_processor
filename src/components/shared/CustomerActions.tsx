"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Edit, 
  MoreHorizontal,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

interface CustomerActionsProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    status: string;
  };
  onEdit: (customer: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

export function CustomerActions({ customer, onEdit, onDelete }: CustomerActionsProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleView = () => {
    // For now, just show customer details in a toast
    toast.info(`Viewing ${customer.name}'s details`);
  };

  const handleEdit = () => {
    onEdit(customer);
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      try {
        const response = await fetch(`/api/customers/${customer.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to delete customer");
        }

        toast.success("Customer deleted successfully!");
        onDelete(customer.id);
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error(error instanceof Error ? error.message : "Failed to delete customer");
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleView}
        title="View customer"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleEdit}
        title="Edit customer"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <div className="relative">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowMenu(!showMenu)}
          title="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        {showMenu && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="py-1">
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Customer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 