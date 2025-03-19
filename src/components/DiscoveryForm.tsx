
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import ProgressIndicator from './ProgressIndicator';
import { ChevronRight, ChevronLeft, Send } from 'lucide-react';
import { FORM_SECTIONS, PAGE_CONTENT } from '@/lib/content';

interface FormData {
  businessFoundation: string;
  growthChallenges: string;
  [key: string]: string;
}

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

const DiscoveryForm: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem('discoveryFormData');
    return savedData ? JSON.parse(savedData) : {
      businessFoundation: '',
      growthChallenges: ''
    };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const {
    toast
  } = useToast();
  const autoSaveTimerRef = useRef<number | null>(null);

  const saveFormData = useCallback(() => {
    localStorage.setItem('discoveryFormData', JSON.stringify(formData));
    setLastSaved(new Date());
    console.log('Form data autosaved', new Date().toLocaleTimeString());
  }, [formData]);

  useEffect(() => {
    if (autoSaveTimerRef.current) {
      window.clearInterval(autoSaveTimerRef.current);
    }
    autoSaveTimerRef.current = window.setInterval(saveFormData, AUTOSAVE_INTERVAL);
    return () => {
      if (autoSaveTimerRef.current) {
        window.clearInterval(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    };
  }, [saveFormData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      saveFormData();
    }, 2000);
    return () => clearTimeout(debounceTimer);
  }, [formData, saveFormData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const nextSection = useCallback(() => {
    if (currentSection < FORM_SECTIONS.length - 1) {
      setCurrentSection(prev => prev + 1);
      saveFormData();
    }
  }, [currentSection, saveFormData]);

  const prevSection = useCallback(() => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      saveFormData();
    }
  }, [currentSection, saveFormData]);

  const handleStepClick = useCallback((stepIndex: number) => {
    if (stepIndex <= currentSection) {
      setCurrentSection(stepIndex);
      saveFormData();
    }
  }, [currentSection, saveFormData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    saveFormData();
    setTimeout(() => {
      toast({
        title: "Form submitted!",
        description: "Thank you for sharing your information. We'll be in touch soon."
      });
      setIsSubmitting(false);
      setCurrentSection(0);
    }, 1500);
  }, [toast, saveFormData]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentSection]);

  const renderLastSavedText = () => {
    if (!lastSaved) return null;
    return <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
        Last saved: {lastSaved.toLocaleTimeString()}
      </div>;
  };

  return <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-left">
        <ProgressIndicator totalSteps={FORM_SECTIONS.length} currentStep={currentSection} onStepClick={handleStepClick} />
      </div>

      {currentSection !== 0 && currentSection !== 1 && currentSection !== 2 && <div className="text-right mb-2">
          {renderLastSavedText()}
        </div>}

      <div className="text-center mt-4">
        {currentSection === 0 ? <div className="flex flex-col items-center my-0">
            <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto font-mono mb-8"><strong>Design Music Code</strong> orchestrates three pioneering platforms that harness AI, ML, and automation to eliminate tedious business processes.
            <br /><br />
<strong>alchemedia lab.</strong> powers design innovation, <strong>happy little accidents</strong> crafts sonic experiences, and <strong>console-one</strong> engineers technical solutions through code.

Operating both independently and as an integrated ecosystem, these specialized studios deliver tailored creative solutions that transform client visions into reality.</p>
            
            <div className="animate-float">
              <button onClick={nextSection} className="btn-mint mt-4 flex items-center justify-center gap-2">
                {PAGE_CONTENT.buttons.start} <ChevronRight size={18} />
              </button>
            </div>
          </div> : <div className="space-y-5">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">
                {FORM_SECTIONS[currentSection].title}
              </h2>
              <p className="text-stone-600 dark:text-stone-400">
                {FORM_SECTIONS[currentSection].description}
              </p>
            </div>

            <div className="text-left">
              {FORM_SECTIONS[currentSection].fields?.map(field => <div key={field.name} className="space-y-3 mb-6">
                  <label className="block text-[#e0e0e0] dark:text-[#e0e0e0]">
                    {field.label}
                  </label>
                  <textarea name={field.name} value={formData[field.name]} onChange={handleInputChange} className={cn("textarea-mint w-full", (currentSection === 1 || currentSection === 2) && "min-h-[300px]")} placeholder={field.placeholder} style={{
              whiteSpace: 'pre-line'
            }} />
                  
                  {(currentSection === 1 || currentSection === 2) && <div className="text-right mt-1">
                      {renderLastSavedText()}
                    </div>}
                </div>)}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              {currentSection > 0 && <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-[#f5f5f5] hover:bg-stone-100 hover:text-stone-600 transition-all">
                  <ChevronLeft size={18} /> {PAGE_CONTENT.buttons.back}
                </button>}
              {currentSection < FORM_SECTIONS.length - 1 ? <button onClick={nextSection} className="btn-mint flex items-center gap-2">
                  {PAGE_CONTENT.buttons.next} <ChevronRight size={18} />
                </button> : <button onClick={handleSubmit} disabled={isSubmitting} className={cn("btn-mint flex items-center gap-2 min-w-[180px] justify-center", isSubmitting && "opacity-70 cursor-not-allowed")}>
                  {isSubmitting ? <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span> : <>
                      {PAGE_CONTENT.buttons.submit} <Send size={18} />
                    </>}
                </button>}
            </div>
          </div>}
      </div>
    </div>;
};

export default DiscoveryForm;
