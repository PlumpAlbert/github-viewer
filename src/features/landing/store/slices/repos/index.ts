import {Reducer} from "redux";
import {
  PayloadedAction,
  ACTION_TYPE,
  actionTypeCreator,
  parseActionType,
} from "app/actions";
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
  repos: IFetchable<RepoType>;
};

const reducer: Reducer<RepoState, PayloadedAction<any>> = (
  state = initialState,
  action
) => {
  const {storeName, type, property} = parseActionType<typeof state>(
    action.type
  );
  if (!storeName) return state;
  // explode `storeName` to get full path of action root
  const storeNames = storeName.split(".");
  if (storeNames[0] !== STORE_NAME) return state;
  switch (type) {
    case ACTION_TYPE.CHANGE: {
      if (property === "name") {
        return {...state, name: action.payload};
      }
      if (storeNames[1] === "repos") {
        // pass action down to `fetchReducer`
        // with updated `action.type.storeName` field
        const delegatedAction = actionTypeCreator<typeof state>(
          storeNames.slice(1).join("."),
          type,
          property
        );
        return {
          ...state,
          repos: fetchReducer(state.repos, {
            ...action,
            type: delegatedAction,
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
