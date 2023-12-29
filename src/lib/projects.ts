import { z } from "zod";

const projectSchema = z.object({
  repo: z.string(),
  description: z.string(),
  link: z.string().optional(),
});

export type Projects = z.infer<typeof projectSchema>;

export async function getProjects(number: 1 | 2 | 3 | 4 | 5 | 6) {
  const res = await fetch(
    "https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=rkaahean"
  ).then((res) => res.json());

  const projects = projectSchema.array().parse(res);

  return projects.slice(0, number);
}
