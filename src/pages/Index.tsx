
import { useState } from 'react';
import DiscoveryForm from '@/components/DiscoveryForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FORM_SECTIONS, PAGE_CONTENT } from '@/lib/content';

const Index = () => {
  const { header } = PAGE_CONTENT;
  const [currentSection, setCurrentSection] = useState(0);
  
  // Get the current section's intro content, or use default if not available
  const currentIntro = FORM_SECTIONS[currentSection]?.intro || PAGE_CONTENT.intro;
  
  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900">
      <Header title={header.title} subtitle={header.subtitle} />
      <main className="flex-1 container max-w-6xl mx-auto px-4 pt-20 pb-24 flex flex-col">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="flex flex-col items-center">
            <span className="inline-block chip-mint chip-mint-cursor mb-4 animate-fade-in">
              {currentIntro.badge}
            </span>
            {currentIntro.title && currentIntro.title !== 'DO MORE CREATIVELY' && (
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-100 mb-3 animate-fade-in">
                {currentIntro.title}
              </h2>
            )}
            <p 
              style={{ animationDelay: '200ms' }} 
              className="text-stone-600 dark:text-stone-300 max-w-2xl animate-fade-in font-mono"
            >
              {currentIntro.description}
            </p>
          </div>
        </div>

        <div className="flex-grow">
          <DiscoveryForm onSectionChange={handleSectionChange} initialSection={currentSection} />
        </div>
      </main>
      <Footer title={header.title} />
    </div>
  );
};

export default Index;
