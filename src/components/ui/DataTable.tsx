import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  LucideIcon,
  Inbox,
} from 'lucide-react';
import { Button } from './Button';

export interface DataTableColumn<T> {
  key: string;
  title: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number | boolean | Date | null | undefined;
  align?: 'left' | 'center' | 'right';
  className?: string;
  headerClassName?: string;
  width?: string;
}

export interface DataTableFilterOption {
  label: string;
  value: string;
}

export interface DataTableFilterConfig {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  options: DataTableFilterOption[];
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  keyExtractor: (item: T, index: number) => string | number;

  // Header & Title
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;

  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchFilter?: (item: T, query: string) => boolean;

  // Filters
  filters?: DataTableFilterConfig[];
  customFilters?: React.ReactNode;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;

  // Sorting
  defaultSortKey?: string;
  defaultSortDirection?: 'asc' | 'desc';

  // Pagination
  paginated?: boolean;
  initialPageSize?: number;
  pageSizeOptions?: number[];

  // States
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: LucideIcon;
  emptyActionText?: string;
  onEmptyAction?: () => void;

  // Row Interactions
  onRowClick?: (item: T) => void;
  className?: string;
  compact?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  title,
  subtitle,
  badge,
  actions,
  searchable = true,
  searchPlaceholder = 'Search records...',
  searchValue: controlledSearchValue,
  onSearchChange,
  searchFilter,
  filters = [],
  customFilters,
  onResetFilters,
  hasActiveFilters,
  defaultSortKey,
  defaultSortDirection = 'asc',
  paginated = true,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  isLoading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items matching your current filters or query.',
  emptyIcon: EmptyIcon = Inbox,
  emptyActionText,
  onEmptyAction,
  onRowClick,
  className = '',
  compact = false,
}: DataTableProps<T>): React.ReactElement {
  // Internal search state if uncontrolled
  const [internalSearch, setInternalSearch] = useState('');
  const isSearchControlled = controlledSearchValue !== undefined;
  const activeSearch = isSearchControlled ? controlledSearchValue : internalSearch;

  // Sorting state
  const [sortKey, setSortKey] = useState<string | undefined>(defaultSortKey);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handleSearchChange = (val: string) => {
    if (!isSearchControlled) {
      setInternalSearch(val);
    }
    onSearchChange?.(val);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    handleSearchChange('');
  };

  // 1. Filter data by search
  const searchedData = useMemo(() => {
    if (!activeSearch.trim()) return data;
    const query = activeSearch.toLowerCase().trim();

    if (searchFilter) {
      return data.filter((item) => searchFilter(item, query));
    }

    // Default search across all primitive fields
    return data.filter((item) => {
      return Object.values(item as Record<string, unknown>).some((val) => {
        if (val === null || val === undefined) return false;
        if (typeof val === 'string' || typeof val === 'number') {
          return String(val).toLowerCase().includes(query);
        }
        return false;
      });
    });
  }, [data, activeSearch, searchFilter]);

  // 2. Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return searchedData;

    const column = columns.find((c) => c.key === sortKey);
    if (!column || !column.sortable) return searchedData;

    return [...searchedData].sort((a, b) => {
      let valA: unknown;
      let valB: unknown;

      if (column.sortValue) {
        valA = column.sortValue(a);
        valB = column.sortValue(b);
      } else {
        valA = (a as Record<string, unknown>)[sortKey];
        valB = (b as Record<string, unknown>)[sortKey];
      }

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      let result = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        result = valA - valB;
      } else if (valA instanceof Date && valB instanceof Date) {
        result = valA.getTime() - valB.getTime();
      } else {
        result = String(valA).localeCompare(String(valB), undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      }

      return sortDirection === 'asc' ? result : -result;
    });
  }, [searchedData, sortKey, sortDirection, columns]);

  // 3. Paginate data
  const totalItems = sortedData.length;
  const totalPages = paginated ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;

  // Reset page if out of bounds
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, paginated, currentPage, pageSize]);

  const handleSort = (key: string) => {
    const col = columns.find((c) => c.key === key);
    if (!col || !col.sortable) return;

    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(undefined);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  const isFiltered = hasActiveFilters || Boolean(activeSearch.trim());

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden flex flex-col ${className}`}
    >
      {/* Table Header: Title & Primary Actions */}
      {(title || subtitle || badge || actions) && (
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2.5">
              {title && (
                <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>
              )}
              {badge}
            </div>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 self-start sm:self-auto">{actions}</div>}
        </div>
      )}

      {/* Toolbar: Search, Filters & Quick Actions */}
      {(searchable || filters.length > 0 || customFilters) && (
        <div className="p-3.5 sm:p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            {searchable && (
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={activeSearch}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-9 pr-8 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-2xs"
                />
                {activeSearch && (
                  <button
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Structured Select Filters */}
            {filters.map((filter) => (
              <div key={filter.id} className="min-w-[130px]">
                <select
                  value={filter.value}
                  onChange={(e) => {
                    filter.onChange(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label={filter.label || filter.id}
                  className="w-full px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 shadow-2xs cursor-pointer transition-all"
                >
                  {filter.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Custom Filter Components (Checkboxes, Toggles, etc.) */}
            {customFilters}

            {/* Reset Filters CTA if any active */}
            {isFiltered && onResetFilters && (
              <button
                onClick={() => {
                  clearSearch();
                  onResetFilters();
                  setCurrentPage(1);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Record Count Badge */}
          <div className="text-xs text-slate-500 font-medium shrink-0 self-end lg:self-center">
            Found <span className="font-semibold text-slate-800 tabular-nums">{totalItems}</span>{' '}
            {totalItems === 1 ? 'record' : 'records'}
          </div>
        </div>
      )}

      {/* Main Table Responsive Container */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 sticky top-0 z-10">
            <tr>
              {columns.map((column) => {
                const isSorted = sortKey === column.key;
                const alignClass =
                  column.align === 'center'
                    ? 'text-center'
                    : column.align === 'right'
                    ? 'text-right'
                    : 'text-left';

                return (
                  <th
                    key={column.key}
                    scope="col"
                    style={{ width: column.width }}
                    className={`px-4 py-3 select-none ${alignClass} ${column.headerClassName || ''}`}
                  >
                    {column.sortable ? (
                      <button
                        onClick={() => handleSort(column.key)}
                        className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider group cursor-pointer focus:outline-hidden ${
                          column.align === 'right' ? 'flex-row-reverse' : ''
                        } ${isSorted ? 'text-slate-900' : 'hover:text-slate-900'}`}
                        aria-sort={
                          isSorted
                            ? sortDirection === 'asc'
                              ? 'ascending'
                              : 'descending'
                            : 'none'
                        }
                      >
                        <span>{column.title}</span>
                        <span className="shrink-0 text-slate-400 group-hover:text-slate-700">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-rose-600" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-rose-600" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                          )}
                        </span>
                      </button>
                    ) : (
                      <span>{column.title}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              // Loading Skeleton State
              Array.from({ length: pageSize > 5 ? 5 : pageSize }).map((_, idx) => (
                <tr key={`skeleton-${idx}`} className="animate-pulse">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3.5">
                      <div className="h-4 bg-slate-200/80 rounded w-4/5" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                      <EmptyIcon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">{emptyTitle}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{emptyDescription}</p>
                    </div>
                    {(isFiltered || onEmptyAction) && (
                      <div className="pt-2 flex items-center gap-2">
                        {isFiltered && onResetFilters && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              clearSearch();
                              onResetFilters();
                              setCurrentPage(1);
                            }}
                            className="text-xs"
                          >
                            Reset filters
                          </Button>
                        )}
                        {emptyActionText && onEmptyAction && (
                          <Button variant="primary" size="sm" onClick={onEmptyAction} className="text-xs">
                            {emptyActionText}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              // Data Rows
              paginatedData.map((row, index) => {
                const key = keyExtractor(row, index);
                const isClickable = Boolean(onRowClick);

                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(row)}
                    className={`transition-colors ${
                      isClickable ? 'cursor-pointer hover:bg-slate-50/80' : 'hover:bg-slate-50/50'
                    } ${compact ? 'py-2' : ''}`}
                  >
                    {columns.map((column) => {
                      const alignClass =
                        column.align === 'center'
                          ? 'text-center'
                          : column.align === 'right'
                          ? 'text-right'
                          : 'text-left';

                      return (
                        <td
                          key={column.key}
                          className={`px-4 ${compact ? 'py-2.5' : 'py-3.5'} text-slate-700 ${alignClass} ${
                            column.className || ''
                          }`}
                        >
                          {column.render
                            ? column.render(row, (currentPage - 1) * pageSize + index)
                            : String((row as Record<string, unknown>)[column.key] ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Pagination Bar */}
      {paginated && totalItems > 0 && (
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          {/* Item Count Range */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-500">
              Showing <span className="font-bold text-slate-800 tabular-nums">{startIndex}</span> to{' '}
              <span className="font-bold text-slate-800 tabular-nums">{endIndex}</span> of{' '}
              <span className="font-bold text-slate-800 tabular-nums">{totalItems}</span> records
            </span>

            {/* Page Size Dropdown */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <span>Rows:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-0.5 bg-white border border-slate-200 rounded font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-rose-500 cursor-pointer shadow-2xs"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Page Navigation Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                aria-label="First page"
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Numbered page pills */}
              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show current page, edges, and +/- 1 neighbor
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .reduce<(number | string)[]>((acc, page, idx, arr) => {
                    if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                      acc.push('ellipsis-' + page);
                    }
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((item) => {
                    if (typeof item === 'string') {
                      return (
                        <span key={item} className="px-1 text-slate-400 select-none">
                          …
                        </span>
                      );
                    }

                    const isCurrent = item === currentPage;
                    return (
                      <button
                        key={item}
                        onClick={() => setCurrentPage(item)}
                        className={`min-w-[28px] h-7 px-2 rounded-lg font-bold text-xs tabular-nums transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Last page"
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
