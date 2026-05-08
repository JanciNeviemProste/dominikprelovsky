// Bezpečný get/set cez dot-notation path. Cez whitelist znakov bránime
// prototype pollution (__proto__, constructor) a invalid path.

const SAFE_KEY = /^[a-zA-Z0-9_-]+$/;
const FORBIDDEN = new Set(["__proto__", "prototype", "constructor"]);

export function parsePath(path: string): (string | number)[] | null {
  if (!path || typeof path !== "string") return null;
  if (path.length > 200) return null;
  const parts = path.split(".");
  const result: (string | number)[] = [];
  for (const p of parts) {
    if (!p) return null;
    if (FORBIDDEN.has(p)) return null;
    if (/^\d+$/.test(p)) {
      result.push(Number(p));
    } else if (SAFE_KEY.test(p)) {
      result.push(p);
    } else {
      return null;
    }
  }
  return result;
}

export function getByPath(obj: unknown, path: string): unknown {
  const parts = parsePath(path);
  if (!parts) return undefined;
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined) return undefined;
    if (typeof cur !== "object") return undefined;
    cur = (cur as Record<string | number, unknown>)[p];
  }
  return cur;
}

export function setByPath(obj: unknown, path: string, value: unknown): boolean {
  const parts = parsePath(path);
  if (!parts || parts.length === 0) return false;
  if (obj === null || typeof obj !== "object") return false;
  let cur: unknown = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (cur === null || typeof cur !== "object") return false;
    const next = (cur as Record<string | number, unknown>)[p];
    if (next === null || typeof next !== "object") return false;
    cur = next;
  }
  const lastKey = parts[parts.length - 1];
  if (cur === null || typeof cur !== "object") return false;
  (cur as Record<string | number, unknown>)[lastKey] = value;
  return true;
}
