/**
 * Interface for paginated data
 */
export interface Paginated<T> {
  data: T[];
  meta: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
  links: {
    previous: string;
    next: string;
    current: string;
    first: string;
    last: string;
  };
}
