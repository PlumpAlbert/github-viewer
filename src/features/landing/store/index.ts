import {Reducer, Action} from "redux";
import {z} from "zod";

export const initialState: RepoState = {
  list: {},
  isFetching: false,
};

interface RepoState {
  list: {[key: string]: z.infer<typeof RepoSchema>};
  isFetching: boolean;
}

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

export default reducer;
