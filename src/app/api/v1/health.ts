import { streamToString } from "~/lib/utils";
import type { Route } from "./+types/health";
import crypto from "crypto";

export async function loader() {
  return Response.json({ response: 200, health: "Fine!" });
}
