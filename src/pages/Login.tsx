import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PAGE_CONTENT } from '@/lib/content';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const { user, loading } = useAuth();
  const { header } = PAGE_CONTENT;
  const [isNewUser, setIsNewUser] = useState(true);

  // Check if user has visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsNewUser(false);
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // If user is already logged in, redirect to home
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900">
      <Header title={header.title} subtitle={header.subtitle} />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 container max-w-6xl mx-auto px-4 py-12 flex items-center justify-center"
      >
        <div className="max-w-md w-full text-center">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-8"
          >
            {isNewUser ? "DO MORE CREATIVELY" : "Welcome Back"}
          </motion.h1>
          <LoginForm />
        </div>
      </motion.main>
      <Footer title={header.title} />
    </div>
  );
};

export default Login; 