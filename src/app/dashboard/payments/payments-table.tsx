"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaymentActions } from "./payment-actions";
import { Payment, filterPayments, formatPaymentAmount, getPaymentStatusBadgeVariant, formatPaymentDate } from "@/lib/payments";
import { getStoredFilterState } from "@/lib/storage";

interface PaymentsTableProps {
  payments: Payment[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(payments);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({
    start: "",
    end: ""
  });

  // Load saved filters on component mount
  useEffect(() => {
    const storedState = getStoredFilterState();
    setSearchQuery(storedState.searchQuery);
    setFilterStatus(storedState.filterStatus);
    setDateRange(storedState.dateRange);
  }, []);

  // Listen for filter changes from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedState = getStoredFilterState();
      setSearchQuery(storedState.searchQuery);
      setFilterStatus(storedState.filterStatus);
      setDateRange(storedState.dateRange);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter payments based on search, status, and date range
  useEffect(() => {
    const filtered = filterPayments(payments, searchQuery, filterStatus, dateRange);
    setFilteredPayments(filtered);
  }, [payments, searchQuery, filterStatus, dateRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <CardDescription>
          All payment transactions from your business
          {filteredPayments.length !== payments.length && (
            <span className="text-blue-600 ml-2">
              (Showing {filteredPayments.length} of {payments.length})
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-600">Payment</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Provider</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-sm">{payment.id}</p>
                        <p className="text-xs text-gray-500">{payment.description || 'No description'}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-sm">{payment.customerName || payment.customerEmail || 'Unknown Customer'}</p>
                        <p className="text-xs text-gray-500">{payment.customerEmail || 'No email'}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-sm">{formatPaymentAmount(payment.amount)}</p>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant={getPaymentStatusBadgeVariant(payment.status)}
                        className="text-xs"
                      >
                        {payment.status.toLowerCase()}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{payment.provider}</p>
                    </td>
                    <td className="p-3">
                      <div>
                        {(() => {
                          const { date, time } = formatPaymentDate(payment.createdAt);
                          return (
                            <>
                              <p className="text-sm">{date}</p>
                              <p className="text-xs text-gray-500">{time}</p>
                            </>
                          );
                        })()}
                      </div>
                    </td>
                    <td className="p-3">
                      <PaymentActions paymentId={payment.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    {payments.length === 0 ? (
                      <>
                        <p className="text-lg font-medium mb-2">No payments yet</p>
                        <p className="text-sm">Your payment transactions will appear here</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-medium mb-2">No payments match your filters</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 