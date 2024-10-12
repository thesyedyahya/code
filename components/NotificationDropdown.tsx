"use client"

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export type Notification = {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

// This would typically be in a separate file and use a real database
let notifications: Notification[] = [
  { id: '1', message: 'New message from your tutor', read: false, createdAt: new Date() },
  { id: '2', message: 'Upcoming session in 1 hour', read: false, createdAt: new Date() },
  { id: '3', message: 'Your last invoice is ready', read: true, createdAt: new Date() },
];

export function addNotification(userId: string, message: string) {
  const newNotification: Notification = {
    id: Date.now().toString(),
    message,
    read: false,
    createdAt: new Date(),
  };
  notifications = [newNotification, ...notifications];
  // In a real app, you'd save this to a database and possibly trigger a real-time update
}

export default function NotificationDropdown() {
  const [userNotifications, setUserNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, you'd fetch notifications for the current user from your backend
    setUserNotifications(notifications);
  }, [user]);

  const unreadCount = userNotifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setUserNotifications(userNotifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    // In a real app, you'd also update this on the backend
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {userNotifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          userNotifications.map((notification) => (
            <DropdownMenuItem key={notification.id} onSelect={() => markAsRead(notification.id)}>
              <div className={`flex items-center space-x-2 ${notification.read ? 'opacity-50' : ''}`}>
                <div className="flex-1">
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-500">
                    {notification.createdAt.toLocaleString()}
                  </p>
                </div>
                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}