
import { useState } from 'react';
import DiscoveryForm from '@/components/DiscoveryForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FORM_SECTIONS, PAGE_CONTENT } from '@/lib/content';
import AnimatedText from '@/components/AnimatedText';
import ProgressIndicator from '@/components/ProgressIndicator';

const Index = () => {
  const { header } = PAGE_CONTENT;
  const [currentSection, setCurrentSection] = useState(0);
  
  // Animation sequence states
  const [badgeAnimationComplete, setBadgeAnimationComplete] = useState(false);
  const [descriptionAnimationComplete, setDescriptionAnimationComplete] = useState(false);
  const [progressBarAnimationComplete, setProgressBarAnimationComplete] = useState(false);
  const [firstParagraphComplete, setFirstParagraphComplete] = useState(false);
  const [chipMint2Complete, setChipMint2Complete] = useState(false);
  
  // Get the current section's intro content, or use default if not available
  const currentIntro = FORM_SECTIONS[currentSection]?.intro || PAGE_CONTENT.intro;
  
  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    
    // Reset animation sequence on section change
    setBadgeAnimationComplete(false);
    setDescriptionAnimationComplete(false);
    setProgressBarAnimationComplete(false);
    setFirstParagraphComplete(false);
    setChipMint2Complete(false);
    
    // Small delay before starting the new animation sequence
    setTimeout(() => {
      setBadgeAnimationComplete(false);
    }, 100);
  };
  
  const handleBadgeAnimationComplete = () => {
    setBadgeAnimationComplete(true);
  };
  
  const handleDescriptionAnimationComplete = () => {
    setDescriptionAnimationComplete(true);
  };
  
  const handleProgressBarAnimationComplete = () => {
    setProgressBarAnimationComplete(true);
  };
  
  const handleFirstParagraphComplete = () => {
    setFirstParagraphComplete(true);
  };
  
  const handleChipMint2Complete = () => {
    setChipMint2Complete(true);
  };
  
  // Calculate delays for each component in the sequence
  const descriptionDelay = 300; // Delay after badge animation completes
  const progressBarDelay = descriptionAnimationComplete ? 300 : 0; // Delay after description animation completes
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900">
      <Header title={header.title} subtitle={header.subtitle} />
      <main className="flex-1 container max-w-6xl mx-auto px-4 pt-20 pb-24 flex flex-col">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="flex flex-col items-center">
            {/* 1. Badge with typewriter effect */}
            <span className="inline-block chip-mint mb-4 animate-fade-in">
              <AnimatedText 
                text={currentIntro.badge} 
                speed={60}
                className="inline-block"
                tag="span"
                onComplete={handleBadgeAnimationComplete}
              />
              <span className="animate-blink">_</span>
            </span>
            
            {/* 2. Description text fades in after badge animation completes */}
            {badgeAnimationComplete && (
              <AnimatedText 
                text={currentIntro.description}
                speed={20}
                className="text-stone-600 dark:text-stone-300 max-w-2xl animate-fade-in font-mono"
                tag="p"
                delay={descriptionDelay}
                onComplete={handleDescriptionAnimationComplete}
              />
            )}
            
            {/* Keep a hidden version of the text for layout stability */}
            <p 
              className={`text-stone-600 dark:text-stone-300 max-w-2xl font-mono ${badgeAnimationComplete ? 'hidden' : 'opacity-0'}`}
            >
              {currentIntro.description}
            </p>
          </div>
        </div>

        {/* 3. Progress indicator fades in after description animation completes */}
        <div className={`transition-opacity duration-500 mb-8 ${descriptionAnimationComplete ? 'opacity-100' : 'opacity-0'}`}>
          <ProgressIndicator 
            totalSteps={FORM_SECTIONS.length} 
            currentStep={currentSection}
            onStepClick={(index) => handleSectionChange(index)}
            fadeInDelay={progressBarDelay}
            onFadeComplete={handleProgressBarAnimationComplete}
          />
        </div>

        {/* 4, 5, 6: The form content fades in with sequenced paragraphs */}
        <div className="flex-grow">
          {progressBarAnimationComplete ? (
            <div className="animate-fade-in">
              <DiscoveryForm 
                onSectionChange={handleSectionChange} 
                initialSection={currentSection}
                animationSequence={{
                  startFirstParagraph: progressBarAnimationComplete,
                  onFirstParagraphComplete: handleFirstParagraphComplete,
                  startChipMint2: firstParagraphComplete,
                  onChipMint2Complete: handleChipMint2Complete,
                  startLastParagraph: chipMint2Complete
                }}
              />
            </div>
          ) : (
            <div className="opacity-0">
              <DiscoveryForm 
                onSectionChange={handleSectionChange} 
                initialSection={currentSection}
              />
            </div>
          )}
        </div>
      </main>
      <Footer title={header.title} />
    </div>
  );
};

export default Index;
