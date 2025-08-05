export interface FilterState {
  searchQuery: string;
  filterStatus: string;
  dateRange: {
    start: string;
    end: string;
  };
}

const STORAGE_KEYS = {
  PAYMENTS_SEARCH: 'paymentsSearch',
  PAYMENTS_FILTER: 'paymentsFilter',
  PAYMENTS_DATE_RANGE: 'paymentsDateRange',
} as const;

export function getStoredFilterState(): FilterState {
  if (typeof window === 'undefined') {
    return {
      searchQuery: "",
      filterStatus: "all",
      dateRange: { start: "", end: "" }
    };
  }

  const searchQuery = localStorage.getItem(STORAGE_KEYS.PAYMENTS_SEARCH) || "";
  const filterStatus = localStorage.getItem(STORAGE_KEYS.PAYMENTS_FILTER) || "all";
  const dateRangeStr = localStorage.getItem(STORAGE_KEYS.PAYMENTS_DATE_RANGE);
  
  let dateRange = { start: "", end: "" };
  if (dateRangeStr) {
    try {
      dateRange = JSON.parse(dateRangeStr);
    } catch {
      dateRange = { start: "", end: "" };
    }
  }

  return {
    searchQuery,
    filterStatus,
    dateRange
  };
}

export function setStoredSearchQuery(query: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PAYMENTS_SEARCH, query);
}

export function setStoredFilterStatus(status: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PAYMENTS_FILTER, status);
}

export function setStoredDateRange(dateRange: { start: string; end: string }): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PAYMENTS_DATE_RANGE, JSON.stringify(dateRange));
}

export function clearStoredFilters(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.PAYMENTS_SEARCH);
  localStorage.removeItem(STORAGE_KEYS.PAYMENTS_FILTER);
  localStorage.removeItem(STORAGE_KEYS.PAYMENTS_DATE_RANGE);
}

export function clearStoredDateRange(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.PAYMENTS_DATE_RANGE);
} 