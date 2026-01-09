import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { admin, emailOTP, twoFactor, username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

export const auth = betterAuth({
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  baseURL: "https://dn4ghw-3000.csb.app/",
  secret:
    "3cf497695cbf468eff1d7c36b06b7c74ff3cc332df392f2565e1836a30ad1cac82ef65243d3213c97957030073d4cc4c894380e5f3e35dca88cf8066bc068672f6646ac31dabd25a135b3ef6ec61aea16f280661ec0281c4a5e9e9d54415f26e00faa2ec827048db252c71a923d89ebb12390c2a93941de38866a2a532c90e5bca0996508bf0bd3975f4918ffd76d668b43a88169c4a5b53f12577981236d5731300d47f39f940f0e2ed51fb7ab07508f7cbffe80cead895850fd377e113dda1b7d16560026d9e20",
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  cookies: true, // store session ID in secure cookie
  advanced: {
    database: {
      useNumberId: true,
    },
    useSecureCookies: false,
    disableCSRFCheck: true,
    cookies: {
      session_token: {
        name: "fsb",
        attributes: {
          sameSite: "none",
          httpOnly: false,
          secure: true,
        },
      },
    },
    defaultCookieAttributes: {
      sameSite: "none",
      httpOnly: false,
      secure: true,
    },
    cookiePrefix: "fsb",
    crossSubDomainCookies: {
      enabled: true,
    },
  },
  trustedOrigins: ["https://dhmf8x-3000.csb.app/"],
  plugins: [
    admin(),
    nextCookies(),
    username(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log("OTP:", otp, "Type:", type, "Email:", email);
        if (type === "sign-in") {
          // send the OTP for sign in
          console.log(`Sending OTP ${otp} to email ${email} for ${type}`);
        } else if (type === "email-verification") {
          // send the otp for email verification
          console.log(`Sending OTP ${otp} to email ${email} for ${type}`);
        } else {
          // send the OTP for password reset
          console.log(`Sending OTP ${otp} to email ${email} for ${type}`);
        }
      },
    }),
  ],
});
