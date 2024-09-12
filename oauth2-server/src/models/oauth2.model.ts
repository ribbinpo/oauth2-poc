import {
  AuthorizationCode,
  Client,
  InvalidClientError,
  RefreshToken,
  Token,
  User,
} from "@node-oauth/oauth2-server";

import { MockClientDB, MockUserDB } from "../mocks/mockDB";
import { UnauthorizedError } from "../utils/error.util";

const randomString = (length: number): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// require all grant types
const getClient = async (
  clientId: string,
  clientSecret?: string
): Promise<Client> => {
  // retrieve client information from database by clientId and clientSecret
  console.log("getClient with clientId: ", clientId);
  const client = MockClientDB.find((client) => client.clientId === clientId);
  if (!client) throw new InvalidClientError("Invalid client");
  if (
    !client.grants.includes("authorization_code") &&
    !clientSecret &&
    client.clientSecret !== clientSecret
  ) {
    throw new InvalidClientError("Invalid client secret");
  }
  return {
    id: clientId,
    redirectUris: client.redirectUris,
    grants: client.grants,
    // user: {}, // optional
    accessTokenLifetime: client.accessTokenLifetime,
    refreshTokenLifetime: client.refreshTokenLifetime,
  };
};

// require for password grant type
const getUser = async (
  username: string,
  password: string
): Promise<User | undefined> => {
  // query user information from database by username
  // check if the password is correct
  console.log("getUser with username: ", username);
  const user = MockUserDB.find((u) => u.username === username);
  if (!user || user.password !== password) {
    throw new UnauthorizedError("Unauthorized user");
  }
  const { password: _, ...result } = user;
  return result;
};

// require for client_credentials grant type
const getUserFromClient = async (client: Client): Promise<User | undefined> => {
  // query user information from client.id
  console.log("getUserFromClient with clientId: ", client.id);
  const mockUser = {
    id: "id-1",
    username: "john",
    password: "123456",
    firstName: "John",
  };
  const { password: _, ...user } = mockUser;
  return user;
};

// optional, if scope is required
const validateScope = async (
  user: User,
  client: Client,
  scope: string[]
): Promise<string[]> => {
  // validate scope
  console.log("validateScope");
  return [];
};

const getAccessToken = async (accessToken: string): Promise<Token> => {
  // verify access token
  console.log("getAccessToken with accessToken: ", accessToken);
  // throw new Error("invalid token");
  return {
    accessToken: accessToken,
    accessTokenExpiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    client: {
      id: "",
      grants: [],
    },
    user: {},
  };
};

const getRefreshToken = async (refreshToken: string): Promise<RefreshToken> => {
  // verify refresh token and decode user information
  console.log("getRefreshToken with refreshToken: ", refreshToken);
  return {
    refreshToken: randomString(40),
    refreshTokenExpiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    scope: [],
    client: {
      id: MockClientDB[0].clientId,
      grants: MockClientDB[0].grants,
    },
    user: MockUserDB[0],
  };
};

// optional, default generate tokens consisting of 40 characters (a..z0..9)
const generateAccessToken = async (
  client: Client,
  user: User,
  scope: string[]
): Promise<string> => {
  // generate access token
  console.log("generateAccessToken");
  return randomString(40);
};

// optional, if refresh token is required
const generateRefreshToken = async (
  client: Client,
  user: User,
  scope: string[]
): Promise<string> => {
  // generate refresh token
  console.log("generateRefreshToken");
  return randomString(40);
};

const revokeToken = async (token: Token): Promise<boolean> => {
  // revoke token
  // delete token from database
  console.log("revokeToken");
  return true;
};

const saveToken = async (
  token: Token,
  client: Client,
  user: User
): Promise<Token> => {
  // save access token and refresh token
  console.log("saveToken");
  return {
    ...token,
    client,
    user,
    access_token: token.accessToken,
  };
};

const saveAuthorizationCode = async (
  code: Pick<
    AuthorizationCode,
    | "authorizationCode"
    | "expiresAt"
    | "redirectUri"
    | "scope"
    | "codeChallenge"
    | "codeChallengeMethod"
  >,
  client: Client,
  user: User
): Promise<AuthorizationCode> => {
  // save authorization code
  console.log("saveAuthorizationCode");
  return {
    authorizationCode: code.authorizationCode,
    expiresAt: code.expiresAt,
    redirectUri: code.redirectUri,
    scope: code.scope,
    codeChallenge: code.codeChallenge,
    codeChallengeMethod: code.codeChallengeMethod,
    client,
    user,
  };
};

const getAuthorizationCode = async (authorizationCode: string) => {
  // retrieve authorization code information from database
  console.log(
    "getAuthorizationCode with authorizationCode: ",
    authorizationCode
  );
  return {
    authorizationCode: authorizationCode,
    expiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    redirectUri: "http://localhost:3000/callback",
    scope: [],
    codeChallenge: "",
    codeChallengeMethod: "",
    client: {
      id: MockClientDB[0].clientId,
      grants: MockClientDB[0].grants,
    },
    user: MockUserDB[0],
  };
};

const generateAuthorizationCode = async (
  client: Client,
  user: User,
  scope: string[]
): Promise<string> => {
  // generate authorization code
  console.log("generateAuthorizationCode");
  return randomString(40);
};

const revokeAuthorizationCode = async (
  code: Pick<
    AuthorizationCode,
    | "authorizationCode"
    | "expiresAt"
    | "redirectUri"
    | "scope"
    | "codeChallenge"
    | "codeChallengeMethod"
  >
) => {
  // revoke authorization code
  console.log("revokeAuthorizationCode");
  return true;
};

export default {
  generateAccessToken,
  generateRefreshToken,
  getClient,
  getUser,
  getUserFromClient,
  validateScope,
  saveToken,
  getAccessToken,
  getRefreshToken,
  revokeToken,
  saveAuthorizationCode,
  getAuthorizationCode,
  revokeAuthorizationCode,
  generateAuthorizationCode,
};
