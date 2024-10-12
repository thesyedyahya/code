import { User } from '../types';

interface Conversation {
  id: string;
  student_id: string;
  teacher_id: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

function getItem(key: string): any {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function setItem(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function createConversation(student_id: string, teacher_id: string): Promise<Conversation> {
  const conversations = getItem('conversations') || [];
  const newConversation: Conversation = {
    id: Date.now().toString(),
    student_id,
    teacher_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  conversations.push(newConversation);
  setItem('conversations', conversations);
  return newConversation;
}

export async function getConversation(id: string): Promise<Conversation | null> {
  const conversations = getItem('conversations') || [];
  return conversations.find((conv: Conversation) => conv.id === id) || null;
}

export async function getUserConversations(user_id: string): Promise<Conversation[]> {
  const conversations = getItem('conversations') || [];
  return conversations.filter((conv: Conversation) => 
    conv.student_id === user_id || conv.teacher_id === user_id
  ).sort((a: Conversation, b: Conversation) => 
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}

export async function sendMessage(conversation_id: string, sender_id: string, content: string): Promise<Message> {
  const messages = getItem('messages') || [];
  const newMessage: Message = {
    id: Date.now().toString(),
    conversation_id,
    sender_id,
    content,
    created_at: new Date().toISOString(),
    is_read: false,
  };
  messages.push(newMessage);
  setItem('messages', messages);

  // Update the conversation's updated_at timestamp
  const conversations = getItem('conversations') || [];
  const updatedConversations = conversations.map((conv: Conversation) => 
    conv.id === conversation_id ? { ...conv, updated_at: new Date().toISOString() } : conv
  );
  setItem('conversations', updatedConversations);

  return newMessage;
}

export async function getMessages(conversation_id: string, limit: number = 50, offset: number = 0): Promise<Message[]> {
  const messages = getItem('messages') || [];
  return messages
    .filter((msg: Message) => msg.conversation_id === conversation_id)
    .sort((a: Message, b: Message) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(offset, offset + limit);
}

export async function markMessagesAsRead(conversation_id: string, user_id: string): Promise<void> {
  const messages = getItem('messages') || [];
  const updatedMessages = messages.map((msg: Message) => 
    msg.conversation_id === conversation_id && msg.sender_id !== user_id && !msg.is_read
      ? { ...msg, is_read: true }
      : msg
  );
  setItem('messages', updatedMessages);
}