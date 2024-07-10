export class PagingResponse<T> {
  data: T;
  count: number;
  page: number;
  limit: number;

  constructor(data: T, paging: { count: number; page: number; limit: number }) {
    this.data = data;
    this.count = paging.count;
    this.page = paging.page;
    this.limit = paging.limit;
  }
}