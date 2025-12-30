import { cookies } from "next/headers";

const IV_LENGTH = 16;

async function getEncryptionKey() {
  const keyBase64 = process.env.ENCRYPTION_KEY!;
  const keyBuffer = new Uint8Array(
    atob(keyBase64)
      .split("")
      .map((c) => c.charCodeAt(0))
  );
  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(text: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await getEncryptionKey();
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    new TextEncoder().encode(text)
  );
  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const encryptedHex = Array.from(new Uint8Array(encrypted))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${ivHex}:${encryptedHex}`;
}

export async function decrypt(text: string): Promise<string> {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = new Uint8Array(
    ivHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
  const encryptedArray = new Uint8Array(
    encryptedHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
  const key = await getEncryptionKey();
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    encryptedArray
  );
  return new TextDecoder().decode(decrypted);
}

async function getCookieSecret() {
  const secretBase64 = process.env.COOKIE_SECRET!;
  const secretBuffer = new Uint8Array(
    atob(secretBase64)
      .split("")
      .map((c) => c.charCodeAt(0))
  );
  return await crypto.subtle.importKey(
    "raw",
    secretBuffer,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );
}

export async function sign(value: string): Promise<string> {
  const key = await getCookieSecret();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );
  const signatureBase64 = btoa(
    String.fromCharCode.apply(
      null,
      new Uint8Array(signature) as unknown as number[]
    )
  ).replace(/=+$/, "");
  return `${value}.${signatureBase64}`;
}

export async function unsign(signedValue: string): Promise<string | false> {
  const [value, signature] = signedValue.split(".");
  const key = await getCookieSecret();
  const signatureArray = new Uint8Array(
    atob(signature)
      .split("")
      .map((c) => c.charCodeAt(0))
  );
  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    signatureArray,
    new TextEncoder().encode(value)
  );
  return isValid ? value : false;
}
export const getSecureCookie = async (name: string): Promise<string | null> => {
  try {
    const signedValue = cookies().get(name)?.value;
    if (!signedValue) return null;

    const unsignedValue = await unsign(signedValue); // Await unsign
    if (!unsignedValue) return null; // Invalid signature

    return await decrypt(unsignedValue); // Await decryption
  } catch (error) {
    console.error(`Error getting cookie ${name}:`, error);
    return null;
  }
};

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
};

// Async function to set a secure cookie (await for encryption and signing)
export const setSecureCookie = async (
  name: string,
  value: string,
  maxAge?: number
) => {
  const encryptedValue = await encrypt(value); // Await encryption
  const signedValue = await sign(encryptedValue); // Await signing
  cookies().set(name, signedValue, {
    ...cookieOptions,
    maxAge: maxAge || 10 * 60, // Default expiration 10 minutes
  });
};
