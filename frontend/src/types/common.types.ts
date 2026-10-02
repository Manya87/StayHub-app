export interface PaginatedResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  isLast: boolean;
}

export type Status = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'MAINTENANCE' | 'ARCHIVED';

export interface SelectOption {
  label: string;
  value: string | number;
}
