import React from 'react';
import DiscoveryForm from '@/components/DiscoveryForm';
import { PAGE_CONTENT } from '@/lib/content';

const Index = () => {
  const { header, intro } = PAGE_CONTENT;
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900">
      <header className="py-6 border-b border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 bg-mint rounded-lg flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100">{header.title}</h1>
                {header.subtitle && (
                  <p className="text-xs text-stone-600 dark:text-stone-400 tracking-wider">{header.subtitle}</p>
                )}
              </div>
            </a>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-12 flex-grow flex flex-col">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-col items-start">
            <span className="inline-block chip-mint mb-2 animate-fade-in text-left py-0 my-0 mx-0 px-[9px]">
              {intro.badge}
            </span>
            
            <p 
              style={{ animationDelay: '200ms' }} 
              className="text-stone-600 dark:text-stone-300 max-w-2xl animate-fade-in font-mono text-left py-[14px]"
            >
              {intro.description}
            </p>
          </div>
        </div>

        <div className="flex-grow mb-20">
          <DiscoveryForm />
        </div>
      </main>

      <footer className="mt-auto border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-mint rounded-md flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                  </svg>
                </div>
                <span className="text-stone-800 dark:text-stone-100 font-medium">{header.title}</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">© 2023 All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-stone-600 dark:text-stone-300 hover:text-mint transition-colors">Privacy Policy</a>
              <a href="#" className="text-stone-600 dark:text-stone-300 hover:text-mint transition-colors">Terms of Service</a>
              <a href="#" className="text-stone-600 dark:text-stone-300 hover:text-mint transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;