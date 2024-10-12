"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [avatar, setAvatar] = useState('');
  const [subject, setSubject] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio || '');
      setLocation(user.location || '');
      setAvatar(user.avatar || '');
      if (user.role === 'teacher') {
        setSubject(user.subject || '');
        setHourlyRate(user.hourlyRate?.toString() || '');
        setExperience(user.experience?.toString() || '');
        setEducation(user.education || '');
      }
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser({
        name,
        email,
        bio,
        location,
        avatar,
        ...(user?.role === 'teacher' && {
          subject,
          hourlyRate: parseFloat(hourlyRate),
          experience: parseInt(experience),
          education,
        }),
      });
      if (updatedUser) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        setIsEditing(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatar || `/avatars/${user.role}.png`} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{name}</CardTitle>
              <p className="text-muted-foreground">{user.role === 'teacher' ? 'Teacher' : 'Student'}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              {user.role === 'student' && <TabsTrigger value="reviews">Reviews from Teachers</TabsTrigger>}
              {user.role === 'teacher' && <TabsTrigger value="reviews">Student Reviews</TabsTrigger>}
            </TabsList>
            <TabsContent value="profile">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      disabled={!isEditing}
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      disabled={!isEditing}
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                    <Input 
                      id="location" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label htmlFor="avatar" className="block text-sm font-medium mb-1">Avatar URL</label>
                    <Input 
                      id="avatar" 
                      value={avatar} 
                      onChange={(e) => setAvatar(e.target.value)} 
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
                  <Textarea 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    disabled={!isEditing}
                  />
                </div>
                {user.role === 'teacher' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                        <Input 
                          id="subject" 
                          value={subject} 
                          onChange={(e) => setSubject(e.target.value)} 
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label htmlFor="hourlyRate" className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
                        <Input 
                          id="hourlyRate" 
                          type="number" 
                          value={hourlyRate} 
                          onChange={(e) => setHourlyRate(e.target.value)} 
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium mb-1">Years of Experience</label>
                        <Input 
                          id="experience" 
                          type="number" 
                          value={experience} 
                          onChange={(e) => setExperience(e.target.value)} 
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label htmlFor="education" className="block text-sm font-medium mb-1">Education</label>
                        <Input 
                          id="education" 
                          value={education} 
                          onChange={(e) => setEducation(e.target.value)} 
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </>
                )}
                {isEditing ? (
                  <Button type="submit">Save Changes</Button>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </form>
            </TabsContent>
            <TabsContent value="reviews">
              {user.reviews && user.reviews.length > 0 ? (
                <div className="space-y-4">
                  {user.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center mb-2">
                          <Avatar className="w-10 h-10 mr-2">
                            <AvatarImage src={review.teacherAvatar} alt={review.teacherName} />
                            <AvatarFallback>{review.teacherName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{review.teacherName}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <p>{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No reviews yet.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}