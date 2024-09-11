import {
  AuthorizationCode,
  Client,
  RefreshToken,
  Token,
  User,
} from "@node-oauth/oauth2-server";

// require all grant types
const getClient = async (
  clientId: string,
  clientSecret: string
): Promise<Client> => {
  // retrieve client information from database by clientId and clientSecret
  console.log("getClient with clientId: ", clientId);
  const mockClient = {
    id: "id-1",
    redirectUris: ["http://localhost:3000/callback"],
    grants: [
      "client_credentials",
      "password",
      "refresh_token",
      "authorization_code",
    ],
  } as Client;
  console.log("getClient");
  return {
    id: clientId,
    redirectUris: mockClient.redirectUris,
    grants: mockClient.grants,
    user: {},
    // accessTokenLifetime,
    // refreshTokenLifetime
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
  const mockUser = {
    id: "id-1",
    username: "john",
    password: "123456",
    firstName: "John",
  };
  const { password: _, ...user } = mockUser;
  return user;
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
    refreshToken: refreshToken,
    refreshTokenExpiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    scope: [],
    client: {
      id: "id-1",
      grants: [],
    },
    user: {},
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
  return "1234567890";
};

// optional, if refresh token is required
const generateRefreshToken = async (
  client: Client,
  user: User,
  scope: string[]
): Promise<string> => {
  // generate refresh token
  console.log("generateRefreshToken");
  return "1234567890-";
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
  console.log("getAuthorizationCode with authorizationCode: ", authorizationCode);
  return {
    authorizationCode: authorizationCode,
    expiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    redirectUri: "http://localhost:3000/callback",
    scope: [],
    codeChallenge: "",
    codeChallengeMethod: "",
    // client: {
    //   id: "id-1",
    //   grants: [],
    // },
    // user: {},
  };
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
};
