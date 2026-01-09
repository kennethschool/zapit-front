import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCode(length = 5) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  if (length > 5) {
    throw new Error("Maximum length allowed is 5 characters.");
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export async function generate_random() {
  const resp = await fetch("https://generate-secret.vercel.app/32", {
    method: "GET",
  });

  if (!resp.ok) return false;

  const code = await resp.text();
  //console.log(code);
  return code;
}

// // usage:
// console.log(generateCode()); // e.g., "A9Z1B"
// console.log(generateCode(3)); // e.g., "X2P"

// Interface Data Encryption
interface DataEncryptionProps {
  passphrase: string;
  encryptedData: string;
  data: object | string;
  salt: Buffer;
}

export async function encrypt(data: DataEncryptionProps["data"]) {
  const res = await fetch("/api/v1/encrypt", {
    body: JSON.stringify(typeof data === "object" ? data : { encrypted: data }),
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const json = await res.text();
  //console.log(json)
  return json;
}

export async function decrypt(
  data: DataEncryptionProps["encryptedData"],
  passphrase: DataEncryptionProps["passphrase"] = import.meta.env
    .VITE_ENCRYPTION_KEY
) {
  const res = await fetch("/api/v1/encrypt", {
    body: data,
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const json = await res.text();
  return json;
}

export async function streamToString(
  stream: ReadableStream<Uint8Array>
): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  // combine
  const fullArray = new Uint8Array(
    chunks.reduce((acc, val) => acc + val.length, 0)
  );
  let offset = 0;
  for (const chunk of chunks) {
    fullArray.set(chunk, offset);
    offset += chunk.length;
  }

  // convert to string
  return new TextDecoder().decode(fullArray);
}
