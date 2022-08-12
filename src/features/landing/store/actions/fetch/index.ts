export interface IFetchable<T, E = any> {
  /** If `true` object value is currently been fetched */
  isFetching: boolean;
  /** Object's state */
  value?: T;
  /** Fetch error state */
  fetchError?: E;
}
