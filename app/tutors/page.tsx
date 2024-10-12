"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Clock, DollarSign, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useAuth } from '@/contexts/AuthContext';

// Mock tutor data (in a real app, you'd fetch this from an API)
const tutors = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    subject: 'Mathematics',
    rating: 4.9,
    reviews: 128,
    hourlyRate: 50,
    location: 'New York, NY',
    availability: 'Weekdays, Evenings',
    experience: 10,
    education: 'Ph.D. in Applied Mathematics',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: '2',
    name: 'Prof. Michael Johnson',
    subject: 'Physics',
    rating: 4.8,
    reviews: 95,
    hourlyRate: 45,
    location: 'Los Angeles, CA',
    availability: 'Weekends, Flexible',
    experience: 15,
    education: 'Ph.D. in Theoretical Physics',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  // Add more tutors as needed
];

export default function TutorsPage() {
  const [filteredTutors, setFilteredTutors] = useState(tutors);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'teacher') {
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    const filtered = tutors.filter((tutor) => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tutor.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = subjectFilter === '' || tutor.subject === subjectFilter;
      const matchesRating = tutor.rating >= ratingFilter;
      const matchesPrice = tutor.hourlyRate >= priceRange[0] && tutor.hourlyRate <= priceRange[1];
      const matchesAvailability = availabilityFilter === '' || tutor.availability.includes(availabilityFilter);

      return matchesSearch && matchesSubject && matchesRating && matchesPrice && matchesAvailability;
    });

    setFilteredTutors(filtered);
  }, [searchTerm, subjectFilter, ratingFilter, priceRange, availabilityFilter]);

  if (user?.role === 'teacher') {
    return null; // This will prevent any flickering before the redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find a Tutor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search tutors or subjects"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Subject</Label>
                  <RadioGroup value={subjectFilter} onValueChange={setSubjectFilter}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="all" />
                      <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Mathematics" id="math" />
                      <Label htmlFor="math">Mathematics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Physics" id="physics" />
                      <Label htmlFor="physics">Physics</Label>
                    </div>
                    {/* Add more subjects as needed */}
                  </RadioGroup>
                </div>
                <div>
                  <Label>Minimum Rating</Label>
                  <Slider
                    value={[ratingFilter]}
                    onValueChange={(value) => setRatingFilter(value[0])}
                    max={5}
                    step={0.1}
                  />
                  <span>{ratingFilter.toFixed(1)}</span>
                </div>
                <div>
                  <Label>Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    step={5}
                  />
                  <span>${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <div>
                  <Label>Availability</Label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Any</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Evenings">Evenings</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTutors.map((tutor) => (
              <Card key={tutor.id}>
                <CardContent className="p-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={tutor.image}
                      alt={tutor.name}
                      width={64}
                      height={64}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{tutor.name}</h2>
                      <p className="text-gray-600">{tutor.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" />
                    <span className="font-semibold mr-2">{tutor.rating}</span>
                    <span className="text-gray-600">({tutor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{tutor.location}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{tutor.availability}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="text-sm">${tutor.hourlyRate}/hour</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Briefcase className="w-4 h-4 mr-1" />
                    <span className="text-sm">{tutor.experience} years experience</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    <span className="text-sm">{tutor.education}</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}