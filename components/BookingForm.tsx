"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { addNotification } from '@/components/NotificationDropdown';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type BookingFormProps = {
  tutorId: string;
  tutorName: string;
  hourlyRate: number;
  onBookingComplete: () => void;
};

export default function BookingForm({ tutorId, tutorName, hourlyRate, onBookingComplete }: BookingFormProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to book a session.",
        variant: "destructive",
      });
      return;
    }

    if (!date || !time || !duration || !subject) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Calculate the total cost
    const totalCost = (parseInt(duration) / 60) * hourlyRate;

    // Check if the user has enough credits
    if (user.credits < totalCost) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${totalCost} credits for this booking. Please add more credits to your account.`,
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send this data to your backend
    const bookingData = {
      tutorId,
      studentId: user.id,
      date: format(date, 'yyyy-MM-dd'),
      time,
      duration,
      subject,
      message,
      totalCost,
    };

    console.log('Booking data:', bookingData);

    // Simulate sending notifications
    addNotification(tutorId, `New booking request from ${user.name} for ${subject} on ${format(date, 'yyyy-MM-dd')} at ${time}`);
    addNotification(user.id, `Your booking request with ${tutorName} for ${subject} on ${format(date, 'yyyy-MM-dd')} at ${time} has been sent`);

    // Simulate deducting credits from the user's account
    user.credits -= totalCost;

    toast({
      title: "Booking Successful",
      description: `Your booking request has been sent and ${totalCost} credits have been deducted from your account.`,
    });

    setIsDialogOpen(false);
    onBookingComplete();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Book a Session</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Session with {tutorName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="date">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="duration">Duration (minutes)</label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="60">60</SelectItem>
                <SelectItem value="90">90</SelectItem>
                <SelectItem value="120">120</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message (optional)</label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <p>Total Cost: {((parseInt(duration) / 60) * hourlyRate).toFixed(2)} credits</p>
            <p>Your current balance: {user?.credits.toFixed(2)} credits</p>
          </div>
          <Button type="submit" className="w-full">Book Session</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}