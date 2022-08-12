import {Reducer} from "redux";
import {z} from "zod";
import {Action} from "../../actions";
import {IFetchable} from "../../actions/fetch";

export const STORE_NAME = "repos";

export const initialState: RepoState = {
  isFetching: false,
};

type RepoState = IFetchable<{
  [key: string]: RepoType;
}>;

const reducer: Reducer<RepoState, Action> = (state = initialState, action) => {
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
