"use client"

import { useAuth } from '@/contexts/AuthContext';
import ChatInterface from '@/components/ChatInterface';

export default function MessagesPage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to access your messages.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <ChatInterface />
    </div>
  );
}