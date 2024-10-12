"use client"

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

export default function FavoritesPage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view your favorite tutors.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Favorite Tutors</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Favorite Tutors</CardTitle>
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
    </div>
  );
}