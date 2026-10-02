import { useState } from 'react';

export interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination(options: UsePaginationOptions = {}) {
  const [page, setPage] = useState<number>(options.initialPage ?? 0);
  const [pageSize, setPageSize] = useState<number>(options.initialPageSize ?? 10);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(0, prev - 1));
  const goToPage = (p: number) => setPage(p);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    goToPage,
  };
}
