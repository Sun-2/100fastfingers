export const base64ToByteArray = (base64: string) => {
  const buffer = Buffer.from(base64, "base64");
  return new Uint8Array(buffer);
};