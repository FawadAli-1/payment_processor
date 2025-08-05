"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar } from "lucide-react";
import { getStoredFilterState, setStoredSearchQuery, setStoredFilterStatus, setStoredDateRange, clearStoredDateRange } from "@/lib/storage";

export function PaymentsFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({
    start: "",
    end: ""
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setStoredSearchQuery(query);
  };

  const handleFilter = () => {
    // Toggle between filter options
    const statuses = ["all", "COMPLETED", "PENDING", "FAILED"];
    const currentIndex = statuses.indexOf(filterStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const nextStatus = statuses[nextIndex];
    setFilterStatus(nextStatus);
    setStoredFilterStatus(nextStatus);
  };

  const handleDateRange = () => {
    // Toggle date range picker visibility
    const datePicker = document.getElementById('dateRangePicker');
    if (datePicker) {
      datePicker.style.display = datePicker.style.display === 'none' ? 'block' : 'none';
    }
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const newDateRange = {
      ...dateRange,
      [type]: value
    };
    setDateRange(newDateRange);
    setStoredDateRange(newDateRange);
  };

  // Load saved filters on component mount
  useEffect(() => {
    const storedState = getStoredFilterState();
    setSearchQuery(storedState.searchQuery);
    setFilterStatus(storedState.filterStatus);
    setDateRange(storedState.dateRange);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search payments..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleFilter}
            className={filterStatus !== "all" ? "bg-blue-50 border-blue-200" : ""}
          >
            <Filter className="mr-2 h-4 w-4" />
            {filterStatus === "all" ? "Filter" : `Status: ${filterStatus}`}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDateRange}
            className={dateRange.start || dateRange.end ? "bg-blue-50 border-blue-200" : ""}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Date Range Picker */}
      <div 
        id="dateRangePicker" 
        className="hidden grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <Input
            type="date"
            value={dateRange.start}
            onChange={(e) => handleDateChange('start', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <Input
            type="date"
            value={dateRange.end}
            onChange={(e) => handleDateChange('end', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2 flex gap-2">
                      <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setDateRange({ start: "", end: "" });
                clearStoredDateRange();
              }}
            >
              Clear Dates
            </Button>
          <Button 
            size="sm"
            onClick={() => {
              const datePicker = document.getElementById('dateRangePicker');
              if (datePicker) datePicker.style.display = 'none';
            }}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filterStatus !== "all" || searchQuery || dateRange.start || dateRange.end) && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Search: {searchQuery}
            </span>
          )}
          {filterStatus !== "all" && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              Status: {filterStatus}
            </span>
          )}
          {(dateRange.start || dateRange.end) && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
              Date: {dateRange.start} - {dateRange.end}
            </span>
          )}
        </div>
      )}
    </div>
  );
} 