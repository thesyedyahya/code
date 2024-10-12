"use client"

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ChatInterface from '@/components/ChatInterface';
import { createConversation, sendMessage } from '@/lib/chat';
import { useToast } from '@/components/ui/use-toast';

export default function ChatPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      simulateMessageExchange();
    }
  }, [user]);

  const simulateMessageExchange = async () => {
    if (!user) return;

    // Simulate creating a conversation
    const studentId = user.role === 'student' ? user.id : 'student123';
    const teacherId = user.role === 'teacher' ? user.id : 'teacher456';
    
    const conversation = await createConversation(studentId, teacherId);

    // Simulate student sending a message
    if (user.role === 'student') {
      await sendMessage(conversation.id, user.id, "Hello! I'm interested in scheduling a tutoring session.");
      toast({
        title: "Message Sent",
        description: "You've sent a message to the teacher.",
      });
    } else {
      // Simulate receiving a message as a teacher
      await sendMessage(conversation.id, studentId, "Hello! I'm interested in scheduling a tutoring session.");
      toast({
        title: "New Message",
        description: "You've received a message from a student.",
      });
    }

    // Simulate teacher's response
    if (user.role === 'teacher') {
      setTimeout(async () => {
        await sendMessage(conversation.id, user.id, "Hi there! I'd be happy to schedule a session. What subject do you need help with?");
        toast({
          title: "Message Sent",
          description: "You've responded to the student's message.",
        });
      }, 2000);
    } else {
      // Simulate receiving teacher's response as a student
      setTimeout(async () => {
        await sendMessage(conversation.id, teacherId, "Hi there! I'd be happy to schedule a session. What subject do you need help with?");
        toast({
          title: "New Message",
          description: "You've received a response from the teacher.",
        });
      }, 2000);
    }
  };

  if (!user) {
    return <div>Please log in to access the chat.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <ChatInterface />
    </div>
  );
}