export class FilterParams {
  offset: number;
  limit: number;
  search: string;
  application: string;
  constructor(offset: number, limit: number, search: string, application: string) {
    this.offset = offset;
    this.limit = limit;
    this.search = search;
    this.application = application;
  }
}
