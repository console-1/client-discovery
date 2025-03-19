import { useState } from 'react';
import DiscoveryForm from '@/components/DiscoveryForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FORM_SECTIONS, PAGE_CONTENT } from '@/lib/content';
import AnimatedText from '@/components/AnimatedText';

const Index = () => {
  const { header } = PAGE_CONTENT;
  const [currentSection, setCurrentSection] = useState(0);
  const [badgeAnimationComplete, setBadgeAnimationComplete] = useState(false);
  const [descriptionAnimationComplete, setDescriptionAnimationComplete] = useState(false);
  
  // Get the current section's intro content, or use default if not available
  const currentIntro = FORM_SECTIONS[currentSection]?.intro || PAGE_CONTENT.intro;
  
  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    // Reset animation states when section changes
    setBadgeAnimationComplete(false);
    setDescriptionAnimationComplete(false);
  };
  
  const handleBadgeAnimationComplete = () => {
    setBadgeAnimationComplete(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900">
      <Header title={header.title} subtitle={header.subtitle} />
      <main className="flex-1 container max-w-6xl mx-auto px-4 pt-20 pb-24 flex flex-col">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="flex flex-col items-center">
            <span className="inline-block chip-mint mb-4 animate-fade-in">
              <AnimatedText 
                text={currentIntro.badge} 
                speed={60}
                className="inline-block"
                tag="span"
                onComplete={handleBadgeAnimationComplete}
                autoStart={true}
              />
              <span className="animate-blink">_</span>
            </span>
            
            {badgeAnimationComplete && (
              <p className="text-stone-600 dark:text-stone-300 max-w-2xl animate-fade-in font-mono">
                {currentIntro.description}
              </p>
            )}
            
            {/* Keep a hidden version of the text for layout stability */}
            <p 
              className={`text-stone-600 dark:text-stone-300 max-w-2xl font-mono ${badgeAnimationComplete ? 'hidden' : 'opacity-0'}`}
            >
              {currentIntro.description}
            </p>
          </div>
        </div>

        <div className={`flex-grow transition-opacity duration-500 ${badgeAnimationComplete ? 'opacity-100' : 'opacity-0'}`}>
          <DiscoveryForm onSectionChange={handleSectionChange} initialSection={currentSection} />
        </div>
      </main>
      <Footer title={header.title} />
    </div>
  );
};

export default Index;
