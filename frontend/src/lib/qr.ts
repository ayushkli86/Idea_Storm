export function generateMedicineHash(
  batchNo: string,
  manufacturerId: string,
  expiry: string
) {
  const data = `${batchNo}-${manufacturerId}-${expiry}`;
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(data))
    .then(buffer =>
      Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("")
    );
}