import {
  adminClient,
  emailOTPClient,
  magicLinkClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://dn4ghw-3000.csb.app/",
  plugins: [
    magicLinkClient(),
    adminClient(),
    emailOTPClient(),
    usernameClient(),
  ],
});
