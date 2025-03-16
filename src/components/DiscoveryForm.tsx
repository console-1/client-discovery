import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import ProgressIndicator from './ProgressIndicator';
import FormSection from './FormSection';
import AnimatedText from './AnimatedText';
import { ChevronRight, ChevronLeft, Check, Send } from 'lucide-react';
import { FORM_SECTIONS, PAGE_CONTENT } from '@/lib/content';

interface FormData {
  coreOfferings: string;
  uniqueApproach: string;
  acquisitionChannels: string;
  challenges: string;
  targetSegments: string;
  growthGoals: string;
  partnershipStructure: string;
  pastPartnerships: string;
  idealCollaboration: string;
  resourcesNeeded: string;
  evaluationCriteria: string;
  valueExpectations: string;
  feedbackOnIdeas: string;
  additionalIdeas: string;
  keyStakeholders: string;
  timeline: string;
  [key: string]: string;
}

const DiscoveryForm: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    coreOfferings: '',
    uniqueApproach: '',
    acquisitionChannels: '',
    challenges: '',
    targetSegments: '',
    growthGoals: '',
    partnershipStructure: '',
    pastPartnerships: '',
    idealCollaboration: '',
    resourcesNeeded: '',
    evaluationCriteria: '',
    valueExpectations: '',
    feedbackOnIdeas: '',
    additionalIdeas: '',
    keyStakeholders: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const nextSection = useCallback(() => {
    if (currentSection < FORM_SECTIONS.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  }, [currentSection]);

  const prevSection = useCallback(() => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  }, [currentSection]);

  const handleStepClick = useCallback((stepIndex: number) => {
    if (stepIndex <= currentSection) {
      setCurrentSection(stepIndex);
    }
  }, [currentSection]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Form submitted!",
        description: "Thank you for sharing your information. We'll be in touch soon."
      });
      setIsSubmitting(false);
      // Reset or navigate away
      setCurrentSection(0);
    }, 1500);
  }, [toast]);

  useEffect(() => {
    // Scroll to top when changing sections
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentSection]);

  // Render form fields based on current section
  const renderFormFields = () => {
    const section = FORM_SECTIONS[currentSection];
    
    // Opening section with just the button
    if (currentSection === 0) {
      return (
        <div className="flex flex-col items-center my-0">
          <div className="animate-float">
            <button 
              onClick={nextSection} 
              className="btn-mint mt-4 flex items-center justify-center gap-2"
            >
              {PAGE_CONTENT.buttons.start} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      );
    }
    
    // Ideas section with extra content
    if (section.id === 'ideas' && section.extraContent?.type === 'ideaList') {
      return (
        <div className="space-y-5">
          <div className="glass-card bg-mint/5 p-5 border border-mint/10 rounded-xl mb-4">
            <h3 className="text-lg font-medium text-stone-800 mb-2">{section.extraContent.title}</h3>
            <ul className="space-y-2">
              {section.extraContent.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block bg-mint text-white p-0.5 rounded mr-2 mt-1">
                    <Check size={14} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {section.fields.map((field) => (
            <div key={field.name} className="space-y-3">
              <label className="block text-[#e0e0e0] dark:text-[#e0e0e0]">
                {field.label}
              </label>
              <textarea 
                name={field.name} 
                value={formData[field.name]} 
                onChange={handleInputChange} 
                className="textarea-mint" 
                placeholder={field.placeholder} 
              />
            </div>
          ))}
          
          <div className="flex justify-between mt-8">
            <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-[#f5f5f5] hover:bg-stone-100 hover:text-stone-600 transition-all">
              <ChevronLeft size={18} /> {PAGE_CONTENT.buttons.back}
            </button>
            <button onClick={nextSection} className="btn-mint flex items-center gap-2">
              {PAGE_CONTENT.buttons.next} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      );
    }
    
    // Closing section with summary
    if (section.id === 'closing' && section.extraContent?.type === 'summary') {
      return (
        <div className="space-y-5">
          <div className="glass-card p-6 rounded-xl border border-stone-200 mb-6">
            <h3 className="text-lg font-medium text-stone-800 mb-4">{section.extraContent.title}</h3>
            <div className="space-y-4 text-stone-600">
              {section.extraContent.fields.map((fieldName) => (
                formData[fieldName] && (
                  <div key={fieldName}>
                    <p className="font-medium text-stone-700">{section.extraContent.fieldLabels[fieldName]}</p>
                    <p>{formData[fieldName]}</p>
                  </div>
                )
              ))}
            </div>
          </div>
          
          {section.nextSteps && (
            <div className="space-y-3 bg-mint/10 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-stone-800">{section.nextSteps.title}</h3>
              <ul className="space-y-2">
                {section.nextSteps.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block bg-mint text-white p-0.5 rounded mr-2 mt-1">
                      <Check size={14} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting} 
              className={cn("btn-mint flex items-center gap-2 min-w-[180px] justify-center", 
                isSubmitting && "opacity-70 cursor-not-allowed")}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                <>
                  {PAGE_CONTENT.buttons.submit} <Send size={18} />
                </>
              )}
            </button>
          </div>
          
          <div className="flex justify-start mt-4">
            <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-[#f5f5f5] hover:bg-stone-100 hover:text-stone-600 transition-all">
              <ChevronLeft size={18} /> {PAGE_CONTENT.buttons.back}
            </button>
          </div>
        </div>
      );
    }
    
    // Standard form section with fields
    return (
      <div className="space-y-5">
        {section.fields.map((field) => (
          <div key={field.name} className="space-y-3">
            <label className="block text-[#e0e0e0] dark:text-[#e0e0e0]">
              {field.label}
            </label>
            <textarea 
              name={field.name} 
              value={formData[field.name]} 
              onChange={handleInputChange} 
              className="textarea-mint" 
              placeholder={field.placeholder} 
            />
          </div>
        ))}
        
        <div className="flex justify-between mt-8">
          <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-[#f5f5f5] hover:bg-stone-100 hover:text-stone-600 transition-all">
            <ChevronLeft size={18} /> {PAGE_CONTENT.buttons.back}
          </button>
          <button onClick={nextSection} className="btn-mint flex items-center gap-2">
            {PAGE_CONTENT.buttons.next} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-0 px-[20px] relative pb-24">
      <ProgressIndicator 
        totalSteps={FORM_SECTIONS.length} 
        currentStep={currentSection + 1} 
        className="mb-8" 
        onStepClick={handleStepClick} 
      />
      
      <div className="relative min-h-[500px]">
        {FORM_SECTIONS.map((section, index) => (
          <div 
            key={section.id} 
            className={cn(
              "transition-all duration-500 ease-out w-full",
              currentSection === index 
                ? "opacity-100 visible" 
                : "opacity-0 invisible absolute top-0 left-0"
            )}
          >
            <FormSection 
              title={section.title} 
              description={section.description} 
              isActive={currentSection === index} 
              animationDelay={index * 100}
            >
              {currentSection === index && renderFormFields()}
            </FormSection>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoveryForm;
