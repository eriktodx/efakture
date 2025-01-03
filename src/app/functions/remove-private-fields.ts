export function removePrivateFields<T>(obj: T): T {
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (key[0] === "_") {
      delete (obj as any)[key];
    }
  }
  return obj;
}
