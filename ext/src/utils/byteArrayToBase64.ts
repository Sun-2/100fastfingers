export const byteArrayToBase64 = (arrayBuffer: ArrayBuffer) => {
  const chars = [...new Uint8Array(arrayBuffer)].map((byte) =>
    String.fromCharCode(byte)
  );
  return btoa(chars.join(""));
};
