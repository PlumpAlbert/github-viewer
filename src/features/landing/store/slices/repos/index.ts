import {Reducer} from "redux";
import {Action, ACTION_TYPE} from "app/actions";
import {z} from "zod";
import fetchReducer, {IFetchable} from "../fetch";

export const STORE_NAME = "repos";

export const initialState: RepoState = {
  name: "",
  repos: {
    isFetching: false,
  },
};

export type RepoState = {
  name: string;
  repos: IFetchable<RepoType[]>;
};

const reducer: Reducer<RepoState, Action<any, RepoState>> = (
  state = initialState,
  action
) => {
  const {storeName, type, property} = action.type;
  // explode `storeName` to get full path of action root
  const storeNames = storeName.split(".");
  if (storeName[0] !== STORE_NAME) return state;
  switch (type) {
    case ACTION_TYPE.CHANGE: {
      if (property === "name") {
        return {...state, name: action.payload};
      }
      if (storeNames[1] === "repos") {
        // pass action down to `fetchReducer`
        // with updated `action.type.storeName` field
        return {
          ...state,
          repos: fetchReducer(state.repos, {
            ...action,
            type: {
              ...action.type,
              storeName: storeNames.slice(1).join("."),
            },
          }),
        };
      }
    }
  }
  return state;
};

export const RepoSchema = z.object({
  /** Repository identifier */
  id: z.number(),
  /** Repository name */
  name: z.string(),
  /** Repository full name (organization/repo) */
  full_name: z.string(),
  /** Whether repository private or not */
  private: z.boolean(),
  /** URL of repository */
  html_url: z.string(),
  /** Repository description */
  description: z.string(),
  /** Main language of the repository */
  language: z.string().nullable(),
  /** Total number of stars for this repository */
  stargazers_count: z.number(),
});

export type RepoType = z.infer<typeof RepoSchema>;

export default reducer;
