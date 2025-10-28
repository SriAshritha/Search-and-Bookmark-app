export type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};
