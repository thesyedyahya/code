import TutorDetail from './TutorDetail';

// Mock tutor data (in a real app, you'd fetch this from an API)
const tutors = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    subject: 'Mathematics',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    bio: 'Experienced mathematics tutor with a Ph.D. in Applied Mathematics. Specializing in calculus, linear algebra, and statistics.',
    location: 'New York, NY',
    hourlyRate: 50,
    availability: 'Weekdays, Evenings',
    experience: 10,
    education: 'Ph.D. in Applied Mathematics',
    skills: ['Calculus', 'Linear Algebra', 'Statistics', 'Problem Solving'],
    languages: ['English', 'Mandarin'],
    completedJobs: 256,
  },
  {
    id: '2',
    name: 'Prof. Michael Johnson',
    subject: 'Physics',
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    bio: 'Physics professor with 15 years of teaching experience. Expert in classical mechanics, electromagnetism, and quantum physics.',
    location: 'Los Angeles, CA',
    hourlyRate: 55,
    availability: 'Weekends, Flexible',
    experience: 15,
    education: 'Ph.D. in Theoretical Physics',
    skills: ['Classical Mechanics', 'Electromagnetism', 'Quantum Physics', 'Problem-Based Learning'],
    languages: ['English', 'Spanish'],
    completedJobs: 189,
  },
];

export default function TutorPage({ params }: { params: { id: string } }) {
  const tutor = tutors.find(t => t.id === params.id);

  if (!tutor) {
    return <div>Tutor not found</div>;
  }

  return <TutorDetail tutor={tutor} />;
}

export async function generateStaticParams() {
  return tutors.map((tutor) => ({
    id: tutor.id,
  }));
}