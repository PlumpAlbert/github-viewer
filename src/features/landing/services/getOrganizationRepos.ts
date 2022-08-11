import axios from "axios";
import {z} from "zod";
import {ErrorType, GITHUB_API_ENDPOINT} from "api";
import {RepoSchema} from "../reposStore";

export const getOrganizationRepos = async ({
  name,
  ...params
}: ParameterType) => {
  const response = await axios.get<ResponseType>(
    `${GITHUB_API_ENDPOINT}/orgs/${name}/repos`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      params: ParameterSchema.parse(params),
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
  sort: z.enum(["created", "updated", "pushed", "full_name"]).optional(),
  direction: z.enum(["desc", "asc"]).optional(),
  per_page: z
    .number()
    .min(1, {message: "Field `per_page` must be greater than or equal to 1"})
    .max(100, {message: "Field `per_page` must be lower than 100"})
    .default(30)
    .optional(),
  page: z
    .number()
    .min(1, {message: "Field `page` must be greater than 1"})
    .optional(),
});
type ParameterType = z.infer<typeof ParameterSchema>;

const ResponseSchema = RepoSchema.array();

type ResponseType = z.infer<typeof ResponseSchema> | ErrorType;
