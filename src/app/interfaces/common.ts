export interface IPageInfo {
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage:	boolean;
  hasNextPage:	boolean;
  isFirstPage:	boolean;
  isLastPage:	boolean;
  firstItemOnPage: number;
  lastItemOnPage: number;
}
