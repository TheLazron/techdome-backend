import { Blog } from "@prisma/client";
import { Response as ExpressResponse } from "express";

// Raw Interfaces
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

//Extended Responses

interface customResponse extends Response {
  email?: string;
  userId?: string;
}

interface customBlogResponse extends blogResponse, Response {
  email?: string;
  userId?: string;
}

interface updateUserResponse {}

interface getUserResponse {}

interface errorHandlerResponse
  extends customBlogResponse,
    Response,
    loginResponse {}

interface Response extends ExpressResponse {
  email?: string;
  userId?: string;
}

export {
  loginResponse,
  blogResponse,
  customResponse,
  customBlogResponse,
  errorHandlerResponse,
  Response,
};
