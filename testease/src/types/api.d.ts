export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  isVerified: boolean;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  status: string;
  use_cases: string[];
}

export type CreateNewProjectResponse = {
  success: boolean;
  message: string;
  data: Project;
};

export type GetProjectsResponse = {
  success: boolean;
  message: string;
  data: Project[];
};