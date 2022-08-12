import {IFetchable} from ".";

/**
 * Template function that simplifies property path creation for `IFetchable`
 * objects
 *
 * @param property - path to property with type `IFetchable`
 * @param fetchableProperty - property of `IFetchable` type
 */
function templateProperty(
  _: TemplateStringsArray,
  property: string | undefined,
  fetchableProperty: keyof IFetchable<any>
): string {
  if (property) {
    return `${property}.${fetchableProperty}`;
  }
  return fetchableProperty;
}
