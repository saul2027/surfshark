export async function api(path, opts = {}) {
  const res = await fetch('/api' + path, { credentials: 'include', headers: { 'Content-Type': 'application/json' }, ...opts });
  if (!res.ok) throw new Error('API ' + res.status);
  return res.json();
}
