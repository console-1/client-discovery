import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PAGE_CONTENT } from '@/lib/content';

const Login = () => {
  const { user, loading } = useAuth();
  const { header } = PAGE_CONTENT;

  // If user is already logged in, redirect to home
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900">
      <Header title={header.title} subtitle={header.subtitle} />
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-4">
            Welcome Back
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Sign in to your account to continue
          </p>
        </div>
        <LoginForm />
      </main>
      <Footer title={header.title} />
    </div>
  );
};

export default Login; 