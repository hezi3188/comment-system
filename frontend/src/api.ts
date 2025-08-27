const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('שגיאת התחברות');
  return res.json() as Promise<{ token: string }>;
}

export async function getPending(token: string) {
  const res = await fetch(`${API_BASE}/admin/comments/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('שגיאה בטעינת תגובות');
  return res.json();
}

export async function approveComment(id: number, token: string) {
  const res = await fetch(`${API_BASE}/admin/comments/${id}/approve`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('כשל באישור תגובה');
  return res.json();
}

export async function deleteComment(id: number, token: string) {
  const res = await fetch(`${API_BASE}/admin/comments/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('כשל במחיקת תגובה');
  return res.json();
}
