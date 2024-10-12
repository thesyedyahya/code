import { Button } from '@/components/ui/button';
import { BookOpen, Code, Calculator, Microscope, Music, Palette, Globe, Dumbbell } from 'lucide-react';

const subjects = [
  { name: 'English', icon: BookOpen },
  { name: 'Programming', icon: Code },
  { name: 'Mathematics', icon: Calculator },
  { name: 'Science', icon: Microscope },
  { name: 'Music', icon: Music },
  { name: 'Art', icon: Palette },
  { name: 'Languages', icon: Globe },
  { name: 'Physical Education', icon: Dumbbell },
];

export default function PopularSubjects() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Subjects</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subjects.map((subject) => (
            <Button
              key={subject.name}
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center text-center"
            >
              <subject.icon className="w-8 h-8 mb-2" />
              <span>{subject.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}