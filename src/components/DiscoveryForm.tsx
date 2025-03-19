
import React, { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import ProgressIndicator from './ProgressIndicator';
import { FORM_SECTIONS } from '@/lib/content';
import useFormAutosave from './discovery/useFormAutosave';
import FormContentRenderer from './discovery/FormContentRenderer';

interface FormData {
  businessFoundation: string;
  growthChallenges: string;
  [key: string]: string;
}

interface DiscoveryFormProps {
  onSectionChange?: (sectionIndex: number) => void;
  initialSection?: number;
}

const DiscoveryForm: React.FC<DiscoveryFormProps> = ({ onSectionChange, initialSection = 0 }) => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem('discoveryFormData');
    return savedData ? JSON.parse(savedData) : {
      businessFoundation: '',
      growthChallenges: ''
    };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { saveFormData, renderLastSavedText } = useFormAutosave({ 
    formData 
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const nextSection = useCallback(() => {
    if (currentSection < FORM_SECTIONS.length - 1) {
      const newSection = currentSection + 1;
      setCurrentSection(newSection);
      if (onSectionChange) {
        onSectionChange(newSection);
      }
      saveFormData();
    }
  }, [currentSection, saveFormData, onSectionChange]);

  const prevSection = useCallback(() => {
    if (currentSection > 0) {
      const newSection = currentSection - 1;
      setCurrentSection(newSection);
      if (onSectionChange) {
        onSectionChange(newSection);
      }
      saveFormData();
    }
  }, [currentSection, saveFormData, onSectionChange]);

  const handleStepClick = useCallback((stepIndex: number) => {
    if (stepIndex <= currentSection) {
      setCurrentSection(stepIndex);
      if (onSectionChange) {
        onSectionChange(stepIndex);
      }
      saveFormData();
    }
  }, [currentSection, saveFormData, onSectionChange]);

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
      
      // Reset to first section
      const newSection = 0;
      setCurrentSection(newSection);
      if (onSectionChange) {
        onSectionChange(newSection);
      }
    }, 1500);
  }, [toast, saveFormData, onSectionChange]);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentSection]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-left">
        <ProgressIndicator 
          totalSteps={FORM_SECTIONS.length} 
          currentStep={currentSection} 
          onStepClick={handleStepClick}
        />
      </div>

      {currentSection !== 0 && currentSection !== 1 && currentSection !== 2 && (
        <div className="text-right mb-2">
          {renderLastSavedText()}
        </div>
      )}

      <div className="text-center mt-4">
        <FormContentRenderer 
          currentSection={currentSection}
          formData={formData}
          handleInputChange={handleInputChange}
          nextSection={nextSection}
          prevSection={prevSection}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          renderLastSavedText={renderLastSavedText}
        />
      </div>
    </div>
  );
};

export default DiscoveryForm;
