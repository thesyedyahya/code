"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserConversations, getMessages, sendMessage, createConversation } from '@/lib/chat';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

interface Conversation {
  id: string;
  student_id: string;
  teacher_id: string;
  created_at: string;
  updated_at: string;
  last_message?: string;
}

export default function ChatInterface() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    if (user) {
      const userConversations = await getUserConversations(user.id);
      setConversations(userConversations);
      if (userConversations.length > 0) {
        setSelectedConversation(userConversations[0]);
      }
    }
  };

  const fetchMessages = async (conversationId: string) => {
    const conversationMessages = await getMessages(conversationId);
    setMessages(conversationMessages.reverse());
  };

  const handleSendMessage = async () => {
    if (user && selectedConversation && newMessage.trim()) {
      const sentMessage = await sendMessage(selectedConversation.id, user.id, newMessage.trim());
      setMessages([...messages, sentMessage]);
      setNewMessage('');
      
      // Update the conversation's last message
      const updatedConversations = conversations.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, last_message: newMessage.trim(), updated_at: new Date().toISOString() } 
          : conv
      );
      setConversations(updatedConversations);
    }
  };

  const startNewConversation = async () => {
    if (user) {
      const otherUserId = prompt("Enter the ID of the user you want to chat with:");
      if (otherUserId) {
        const newConversation = await createConversation(
          user.role === 'student' ? user.id : otherUserId,
          user.role === 'teacher' ? user.id : otherUserId
        );
        setConversations([newConversation, ...conversations]);
        setSelectedConversation(newConversation);
      }
    }
  };

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      <div className="w-1/3 border-r">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Conversations</h2>
          <Button onClick={startNewConversation} size="sm">New Chat</Button>
        </div>
        <ScrollArea className="h-[552px]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center">
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.student_id === user?.id ? conversation.teacher_id : conversation.student_id}`} />
                  <AvatarFallback>{conversation.student_id === user?.id ? 'T' : 'S'}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold">
                    {user?.role === 'student'
                      ? `Teacher ${conversation.teacher_id}`
                      : `Student ${conversation.student_id}`}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{conversation.last_message}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                {user?.role === 'student'
                  ? `Teacher ${selectedConversation.teacher_id}`
                  : `Student ${selectedConversation.student_id}`}
              </h2>
            </div>
            <ScrollArea className="flex-grow p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender_id === user?.id ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender_id === user?.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  </p>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="mr-2"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a conversation or start a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}