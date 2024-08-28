import {
  AuthorizationCode,
  Client,
  RefreshToken,
  Token,
  User,
} from "@node-oauth/oauth2-server";

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

// require all grant types
const getClient = async (
  clientId: string,
  clientSecret: string
): Promise<Client> => {
  // retrieve client information from database
  const client = {
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
    redirectUris: client.redirectUris,
    grants: client.grants,
    user: {},
    // accessTokenLifetime,
    // refreshTokenLifetime
  };
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

// require for password grant type
const getUser = async (
  username: string,
  password: string
): Promise<User | undefined> => {
  // query user information from database
  console.log("getUser");
  return {};
};

// require for client_credentials grant type
const getUserFromClient = async (client: Client): Promise<User | undefined> => {
  // query user information from client
  console.log("getUserFromClient");
  return {};
};

const getAccessToken = async (accessToken: string): Promise<Token> => {
  // retrieve token information from database
  console.log("getAccessToken");
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
  // retrieve token information from database
  console.log("getRefreshToken");
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

const revokeToken = async (token: Token): Promise<boolean> => {
  // revoke token
  console.log("revokeToken");
  return true;
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
    client: {
      id: "id-1",
      grants: [],
    },
    user: {},
  };
};

const getAuthorizationCode = async (authorizationCode: string) => {
  // retrieve authorization code information from database
  console.log("getAuthorizationCode");
  return {
    authorizationCode: authorizationCode,
    expiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    redirectUri: "http://localhost:3000/callback",
    scope: [],
    codeChallenge: "",
    codeChallengeMethod: "",
    client: {
      id: "id-1",
      grants: [],
    },
    user: {},
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
