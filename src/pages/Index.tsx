
import React from 'react';
import DiscoveryForm from '@/components/DiscoveryForm';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-900 to-stone-950">
      <header className="py-6 border-b border-stone-700 bg-stone-900/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mint rounded-lg flex items-center justify-center text-stone-900">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-100">design music code</h1>
                <p className="text-xs text-stone-400 tracking-wider">DO MORE CREATIVELY</p>
              </div>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-stone-300 hover:text-mint transition-colors">Home</a>
                </li>
                <li>
                  <a href="#" className="text-stone-300 hover:text-mint transition-colors">About</a>
                </li>
                <li>
                  <a href="#" className="text-stone-300 hover:text-mint transition-colors">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="max-w-6xl mx-auto px-4">
          <DiscoveryForm />
        </div>
      </main>

      <footer className="border-t border-stone-700 bg-stone-900 py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-mint rounded-md flex items-center justify-center text-stone-900">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                  </svg>
                </div>
                <span className="text-stone-100 font-medium">design music code</span>
              </div>
              <p className="text-stone-400 text-sm mt-1">© 2023 All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-stone-300 hover:text-mint transition-colors">Privacy Policy</a>
              <a href="#" className="text-stone-300 hover:text-mint transition-colors">Terms of Service</a>
              <a href="#" className="text-stone-300 hover:text-mint transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
