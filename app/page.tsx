"use client";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendChat, getTasks } from "../lib/api";

export default function DiaryHome() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const reply = await sendChat(userMsg.content);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "⚠️ Something went wrong." },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Task ledger
  const [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("task polling error", err);
      }
    };
    fetchTasks();
    const id = setInterval(fetchTasks, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 gap-6">
      {/* Chat */}
      <Card className="w-full max-w-2xl flex flex-col flex-1 overflow-hidden">
        <CardContent className="flex flex-col flex-1 overflow-y-auto space-y-3 p-4">
          {messages.map((m, i) => (
            <div key={i} className={`rounded-xl p-3 max-w-prose ${m.role === "user" ? "self-end bg-indigo-100" : "self-start bg-white"}`}>{m.content}</div>
          ))}
          <div ref={chatEndRef} />
        </CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-4 flex gap-2 border-t"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Talk to your Business Diary…"
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </Card>

      {/* Tasks */}
      <Card className="w-full max-w-4xl">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Agent</th>
                <th className="p-2">Status</th>
                <th className="p-2">Updated</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="p-2">{t.title}</td>
                  <td className="p-2">{t.agent}</td>
                  <td className="p-2 capitalize">{t.status}</td>
                  <td className="p-2 text-xs">{new Date(t.updated_at ?? t.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No tasks yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
