import {z} from "zod";

export const GITHUB_API_ENDPOINT = "https://api.github.com" as const;

export const ErrorSchema = z.object({
  /** Error message */
  message: z.string(),
  /** Github documentation page related to this problem */
  documentation_url: z.string(),
});

export type ErrorType = z.infer<typeof ErrorSchema>;
