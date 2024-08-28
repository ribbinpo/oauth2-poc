import OAuth2Server, { Client, Token, User } from "@node-oauth/oauth2-server";

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

// require all grant types
const getClient = async (
  clientId: string,
  clientSecret: string
): Promise<Client> => {
  // retrieve client information from database
  const client = {
    id: "0",
    redrectUris: ["http://localhost:3000"],
    grants: ["client_credentials"],
  };
  console.log("getClient");
  return {
    id: client.id,
    redirectUris: client.redrectUris,
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
    "access_token": token.accessToken,
  };
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

export default {
  generateAccessToken,
  getClient,
  getUserFromClient,
  validateScope,
  saveToken,
  getAccessToken,
};
