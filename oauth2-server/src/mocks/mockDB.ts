export const MockUserDB = [
  {
    id: "1",
    username: "user",
    password: "password",
    email: "user@email.com",
  },
];

export const MockClientDB = [
  {
    id: "1",
    redirectUris: ["http://localhost:3000"],
    grants: [
      "client_credentials",
      "password",
      "refresh_token",
      "authorization_code",
    ],
    clientId: "client1",
    clientSecret: "client1secret",
    accessTokenLifetime: 3600, // 1 hr - optional
    refreshTokenLifetime: 1209600, // 14 days - optional
  },
];
