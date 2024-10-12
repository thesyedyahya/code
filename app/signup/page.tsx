"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { createUser } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  // ... (previous state declarations remain the same)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const newUser = await createUser({ name, email, role, password });
      if (newUser) {
        login(newUser);
        if (role === 'teacher') {
          router.push('/become-a-tutor');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError('Failed to create user. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
    }
  };

  // ... (rest of the component remains the same)
}