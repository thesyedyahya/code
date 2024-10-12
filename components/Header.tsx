"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, Heart, MessageSquare } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          TutorMatch
        </Link>
        <div className="flex-1 max-w-xl mx-4">
          <Input type="text" placeholder="Search for tutors or subjects..." className="w-full" />
        </div>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link href="/tutors">Find Tutors</Link></li>
            <li><Link href="/become-a-tutor">Become a Tutor</Link></li>
            {user && (
              <>
                <li>
                  <Link href="/favorites">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/messages">
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </Link>
                </li>
                <li><NotificationDropdown /></li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || `/avatars/${user.role}.png`} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">Settings</Link>
                      </DropdownMenuItem>
                      {user.role === 'student' && (
                        <DropdownMenuItem asChild>
                          <Link href="/become-a-tutor">Become a Tutor</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </>
            )}
            {!user && (
              <>
                <li><Link href="/login">Login</Link></li>
                <li><Button variant="outline" asChild><Link href="/signup">Sign Up</Link></Button></li>
              </>
            )}
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}