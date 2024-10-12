import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Briefcase, GraduationCap } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    role: 'Teacher',
    subject: 'Mathematics',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 2,
    name: 'Alex Johnson',
    role: 'Student',
    subject: 'Computer Science',
    rating: 4.7,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 3,
    name: 'Prof. Michael Johnson',
    role: 'Teacher',
    subject: 'Physics',
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 4,
    name: 'Sarah Thompson',
    role: 'Student',
    subject: 'English Literature',
    rating: 4.6,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
];

export default function FeaturedTutors() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {users.map((user) => (
            <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src={user.image}
                    alt={user.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex items-center">
                    {user.role === 'Teacher' ? (
                      <Briefcase className="w-4 h-4 mr-1" />
                    ) : (
                      <GraduationCap className="w-4 h-4 mr-1" />
                    )}
                    {user.role} - {user.subject}
                  </p>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-semibold mr-1">{user.rating}</span>
                    <span className="text-sm text-gray-600">({user.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {user.role === 'Teacher' ? 'Top Rated' : 'Active Learner'}
                    </Badge>
                    <Badge variant="outline">Available Now</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}