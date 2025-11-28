export const toInt = (v: unknown, fallback = 0) => {
  if (typeof v === "number" && Number.isInteger(v)) return v as number;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    if (!Number.isNaN(n)) return Math.trunc(n);
  }
  return fallback;
};

export const ensureString = (v: unknown, fallback = "") => {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return fallback;
};
