export interface IFetchable<T, E = any> {
  isFetching: boolean;
  value: T;
  fetchError?: E;
}
