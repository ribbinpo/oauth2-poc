import { NextFunction, Request, Response } from "express";
import OAuth2Server, {
  Request as OAuth2Request,
  Response as OAuth2Response,
  OAuthError,
} from "@node-oauth/oauth2-server";

import OAuth2Model from "../models/oauth2.model";
import { BadRequestError, UnauthorizedError } from "../utils/error.util";
import { SuccessHandler } from "../utils/response.util";

const oauth2 = new OAuth2Server({
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 60 * 60 * 24, // 24 hours
  model: OAuth2Model,
});

const authorizeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request = new OAuth2Request(req);
  const response = new OAuth2Response(res);
  try {
    const result = await oauth2.authorize(request, response, {
      authenticateHandler: {
        handle: async (
          request: OAuth2Server.Request,
          response: OAuth2Server.Response
        ) => {
          return {};
        },
      },
    });
    return new SuccessHandler(200, { result }).send(res);
  } catch (error) {
    next(error);
  }
};

// return from model - getAccessToken
const authenticateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request = new OAuth2Request(req);
  const response = new OAuth2Response(res);
  try {
    const result = await oauth2.authenticate(request, response);
    (req as any).auth = result;
    next();
  } catch (error) {
    next(error);
  }
};

const tokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request = new OAuth2Request(req);
  const response = new OAuth2Response(res);
  try {
    const result = await oauth2.token(request, response);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const oauth2ErrorMappingMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof OAuthError) {
    console.log(error.code, error.name, error.message);
    if (error.code === 400 && error.name === "unauthorized_client") {
      return new UnauthorizedError(error.message).send(res);
    } else if (error.code === 400 && error.name === "invalid_request") {
      return new BadRequestError(error.message).send(res);
    } else if (
      error.code === 503 &&
      error.name === "server_error" &&
      error.message === "Unauthorized user"
    ) {
      return new UnauthorizedError(error.message).send(res);
    } else if (
      error.code === 503 &&
      error.name === "server_error" &&
      error.message === "invalid token"
    ) {
      return new UnauthorizedError(error.message).send(res);
    } else if (error.code === 400 && error.name === "invalid_grant") {
      return new UnauthorizedError(error.message).send(res);
    }
  }
  next(error);
};

export default {
  authorizeHandler,
  authenticateHandler,
  tokenHandler,
  oauth2ErrorMappingMiddleware,
};
