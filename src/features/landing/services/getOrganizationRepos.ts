import axios, {AxiosError} from "axios";
import {z} from "zod";
import {ErrorType, GITHUB_API_ENDPOINT} from "api";
import {RepoSchema} from "../store/slices/repos";

export const getOrganizationRepos = async ({
  name,
  ...params
}: ParameterType) => {
  try {
    const response = await axios.get<ResponseType>(
      `${GITHUB_API_ENDPOINT}/orgs/${name}/repos`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        params: ParameterSchema.parse(params),
      }
    );
    return ResponseSchema.parse(response.data);
  } catch (response) {
    throw (response as AxiosError).response?.data as ErrorType;
  }
};

const ParameterSchema = z.object({
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
type ParameterType = z.infer<typeof ParameterSchema> & {name: string};

const ResponseSchema = RepoSchema.array();

type ResponseType = z.infer<typeof ResponseSchema> | ErrorType;
