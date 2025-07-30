import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const { signUp, signIn, signOut, useSession, getSession } =
  createAuthClient({
    baseURL: "http://localhost:5000",
    plugins: [
      inferAdditionalFields({
        user: {
          role: {
            type: "string",
            defaultValue: "user",
            input: false,
          },
        },
      }),
    ],
  });
