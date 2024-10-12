"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserToTeacher } from '@/lib/auth';

export default function BecomeATutorPage() {
  const [subject, setSubject] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [bio, setBio] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const { user, login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const teacherData = {
      subject,
      experience: parseInt(experience),
      education,
      hourlyRate: parseInt(hourlyRate),
      bio,
    };

    const updatedUser = updateUserToTeacher(user.id, teacherData);
    if (updatedUser) {
      login(updatedUser);
      toast({
        title: "Profile Updated",
        description: "Your teacher profile has been created successfully.",
      });
      router.push('/dashboard');
    } else {
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Become a Tutor</CardTitle>
          <CardDescription>Share your knowledge and earn by becoming a tutor on our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="computer_science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium mb-1">Years of Experience</label>
              <Input 
                id="experience" 
                type="number" 
                value={experience} 
                onChange={(e) => setExperience(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="education" className="block text-sm font-medium mb-1">Highest Education</label>
              <Input 
                id="education" 
                value={education} 
                onChange={(e) => setEducation(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
              <Input 
                id="hourlyRate" 
                type="number" 
                value={hourlyRate} 
                onChange={(e) => setHourlyRate(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
              <Textarea 
                id="bio" 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                required 
              />
            </div>
            <Button type="submit" className="w-full">Create Teacher Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}