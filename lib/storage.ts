import { getStore, type Store } from "@netlify/blobs";

// Tenká abstrakcia nad úložiskom (Netlify Blobs). Na Netlify sa store
// autokonfiguruje z deploy kontextu — netreba žiadny token. Držať prístup k
// úložisku len tu, aby prípadná zmena poskytovateľa bola na jednom mieste.
const STORE_NAME = "dominik-app";

function store(): Store {
  return getStore(STORE_NAME);
}

export async function saveJson(key: string, value: unknown): Promise<void> {
  await store().setJSON(key, value);
}

export async function readJson<T = unknown>(key: string): Promise<T | null> {
  const v = await store().get(key, { type: "json" });
  return (v as T | null) ?? null;
}

export async function saveBytes(
  key: string,
  data: ArrayBuffer | Uint8Array,
): Promise<void> {
  await store().set(key, new Blob([data as BlobPart]));
}

export async function readBytes(key: string): Promise<ArrayBuffer | null> {
  const v = await store().get(key, { type: "arrayBuffer" });
  return (v as ArrayBuffer | null) ?? null;
}

export async function deleteKey(key: string): Promise<void> {
  await store().delete(key);
}
