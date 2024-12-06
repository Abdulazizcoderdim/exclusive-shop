export interface AuthRefreshResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
    // Add other user properties as needed
  };
}
