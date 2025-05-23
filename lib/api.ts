const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function sendChat(message: string) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: "00000000-0000-0000-0000-000000000000", 
      message,
    }),
  });
  if (!res.ok) throw new Error("chat failed");
  return (await res.json()).reply as string;
}

export async function getTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) throw new Error("tasks failed");
  return (await res.json()) as any[];
}
