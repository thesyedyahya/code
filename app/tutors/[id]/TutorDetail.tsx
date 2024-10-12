"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Clock, DollarSign, Briefcase, GraduationCap, Heart, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BookingForm from '@/components/BookingForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

type TutorDetailProps = {
  tutor: {
    id: string;
    name: string;
    subject: string;
    rating: number;
    reviews: number;
    image: string;
    bio: string;
    location: string;
    hourlyRate: number;
    availability: string;
    experience: number;
    education: string;
    skills: string[];
    languages: string[];
    completedJobs: number;
  };
};

export default function TutorDetail({ tutor }: TutorDetailProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  const skills = [
    { name: 'Communication', value: 95 },
    { name: 'Expertise', value: 90 },
    { name: 'Professionalism', value: 98 },
    { name: 'Quality of Work', value: 92 },
  ];

  const handleAddToFavorites = () => {
    if (user) {
      const updatedFavorites = [...(user.favoriteTutors || []), tutor.id];
      updateUser({ ...user, favoriteTutors: updatedFavorites });
      toast({
        title: "Added to Favorites",
        description: `${tutor.name} has been added to your favorite tutors.`,
      });
    }
  };

  const isFavorite = user?.favoriteTutors?.includes(tutor.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <Image
                src={tutor.image}
                alt={tutor.name}
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-2/3 md:pl-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{tutor.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">{tutor.subject} Tutor</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={isFavorite ? "secondary" : "outline"}
                    size="icon"
                    onClick={handleAddToFavorites}
                    disabled={isFavorite}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/messages?tutor=${tutor.id}`}>
                      <MessageSquare className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" />
                <span className="font-semibold mr-2">{tutor.rating}</span>
                <span className="text-gray-600">({tutor.reviews} reviews)</span>
              </div>
              <p className="mb-4">{tutor.bio}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{tutor.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                  <span>${tutor.hourlyRate}/hour</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{tutor.availability}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{tutor.experience} years experience</span>
                </div>
              </div>
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button>Book a Session</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book a Session with {tutor.name}</DialogTitle>
                  </DialogHeader>
                  <BookingForm
                    tutorId={tutor.id}
                    tutorName={tutor.name}
                    hourlyRate={tutor.hourlyRate}
                    onBookingComplete={() => setIsBookingOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <p className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-gray-500" />
              {tutor.education}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {tutor.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {tutor.languages.map((language, index) => (
                <Badge key={index} variant="outline">{language}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Tutor Stats</h2>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Completed Jobs</h2>
            <p className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
              {tutor.completedJobs} jobs completed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}