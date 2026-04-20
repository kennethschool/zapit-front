import {
  adminClient,
  emailOTPClient,
  magicLinkClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://app.kenchongo.com/",
  plugins: [
    magicLinkClient(),
    adminClient(),
    emailOTPClient(),
    usernameClient(),
  ],
});
