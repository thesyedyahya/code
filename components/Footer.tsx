import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TutorMatch</h3>
            <p className="text-sm">Connecting students with expert tutors for personalized learning experiences.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/tutors">Find Tutors</Link></li>
              <li><Link href="/become-a-tutor">Become a Tutor</Link></li>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-2">
              <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center">
          <p>&copy; {new Date().getFullYear()} TutorMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}