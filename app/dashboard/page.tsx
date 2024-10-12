"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BookOpen, DollarSign, Settings, Heart, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const cancelSession = (sessionId: string) => {
    // Implement session cancellation logic here
    console.log(`Cancelling session ${sessionId}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          {user.role === 'teacher' && <TabsTrigger value="earnings">Earnings</TabsTrigger>}
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Welcome to your {user.role} dashboard. Here you can view your upcoming sessions, manage your courses, and track your progress.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Your Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {user.sessions.length > 0 ? (
                <ul>
                  {user.sessions.map((session) => (
                    <li key={session.id} className="mb-4 p-4 border rounded">
                      <p><strong>{session.subject}</strong> with {user.role === 'student' ? session.teacherName : session.studentName}</p>
                      <p>Date: {session.date} at {session.time}</p>
                      <p>Duration: {session.duration} minutes</p>
                      <p>Status: {session.status}</p>
                      {session.status === 'scheduled' && (
                        <Button onClick={() => cancelSession(session.id)} variant="destructive" size="sm" className="mt-2">
                          Cancel Session
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You have no upcoming sessions.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Tutors</CardTitle>
            </CardHeader>
            <CardContent>
              {user.favoriteTutors && user.favoriteTutors.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.favoriteTutors.map((tutorId) => (
                    <li key={tutorId} className="flex items-center space-x-4 p-4 border rounded">
                      <Avatar>
                        <AvatarImage src={`/avatars/teacher.png`} alt={`Tutor ${tutorId}`} />
                        <AvatarFallback>T{tutorId}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Tutor {tutorId}</p>
                        <Link href={`/tutors/${tutorId}`} className="text-sm text-blue-500 hover:underline">
                          View Profile
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You haven't added any tutors to your favorites yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/chat" className="text-blue-500 hover:underline">
                Open Chat Interface
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        {user.role === 'teacher' && (
          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Your Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your earnings information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage your account settings here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}