import axios from "axios";
import {z} from "zod";
import {ErrorType, GITHUB_API_ENDPOINT} from "..";

export const getOrganizationRepos = async ({
  name,
  ...params
}: z.infer<typeof ParameterSchema>) => {
  const response = await axios.get<ResponseType>(
    `${GITHUB_API_ENDPOINT}/orgs/${name}/repos`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      params,
    }
  );

  if (response.status !== 200) {
    throw response.data as ErrorType;
  }
  return ResponseSchema.parse(response.data);
};

const ParameterSchema = z.object({
  name: z
    .string({
      required_error: "Field `name` is required!",
      invalid_type_error: "Field `name` must be a string!",
    })
    .min(1, {message: "Field `name` must be more than 1 character long!"}),
  sort: z.enum(["created", "updated", "pushed", "full_name"]),
  direction: z.enum(["desc", "asc"]),
  per_page: z
    .number()
    .min(1, {message: "Field `per_page` must be greater than or equal to 1"})
    .max(100, {message: "Field `per_page` must be lower than 100"})
    .default(30),
  page: z.number().min(1, {message: "Field `page` must be greater than 1"}),
});

const ResponseSchema = z
  .object({
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
  })
  .array();

type ResponseType = z.infer<typeof ResponseSchema> & ErrorType;
