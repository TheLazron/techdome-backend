import { Blog } from "@prisma/client";

interface loginResponse {
  error: string | null;
  user: {
    found: boolean;
    token: string | null;
  };
}

interface blogResponse {
  error: string | null;
  data: Blog | Blog[] | null;
}

export { loginResponse, blogResponse };
