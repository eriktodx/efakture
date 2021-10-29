export function parseFirestoreDate(o?: any) {
  if (o == null) {
    return null;
  }
  if (typeof o.toDate === "function") {
    return o.toDate();
  }
  if (o instanceof Date) {
    return new Date(o);
  }
  return null;
}
