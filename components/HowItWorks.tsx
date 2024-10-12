import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, Video, Award } from 'lucide-react';

const steps = [
  {
    title: 'Find a Tutor',
    description: 'Search our extensive database of qualified tutors based on subject, expertise, and availability.',
    icon: Search,
    color: 'bg-blue-500',
  },
  {
    title: 'Schedule a Session',
    description: 'Book a session at a time that works for you, with options for both in-person and online tutoring.',
    icon: Calendar,
    color: 'bg-green-500',
  },
  {
    title: 'Start Learning',
    description: 'Connect with your tutor via our secure video platform or meet in person for your tutoring session.',
    icon: Video,
    color: 'bg-yellow-500',
  },
  {
    title: 'Achieve Your Goals',
    description: 'Track your progress, earn certificates, and reach your academic and professional goals.',
    icon: Award,
    color: 'bg-purple-500',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className={`w-16 h-16 mx-auto mb-4 ${step.color} text-white rounded-full flex items-center justify-center`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}