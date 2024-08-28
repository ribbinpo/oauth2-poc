import { NextFunction, Request, Response } from "express";
import OAuth2Server, {
  Request as OAuth2Request,
  Response as OAuth2Response,
} from "@node-oauth/oauth2-server";

import OAuth2Model from "../models/oauth2.model";

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
        handle: async () => {
          // return user
          return { id: "1" };
        },
      },
    });
    console.log("authorizeHandler: ", result);
    res.send(result);
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
    console.log("authenticateHandler: ", result);
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
    console.log("tokenHandler: ", result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  authorizeHandler,
  authenticateHandler,
  tokenHandler,
};
