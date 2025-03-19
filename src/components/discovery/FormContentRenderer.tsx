
import React from 'react';
import { ChevronRight, ChevronLeft, Send, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FORM_SECTIONS, PAGE_CONTENT } from '@/lib/content';

interface FormContentRendererProps {
  currentSection: number;
  formData: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  nextSection: () => void;
  prevSection: () => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  renderLastSavedText: () => React.ReactNode;
}

const FormContentRenderer: React.FC<FormContentRendererProps> = ({
  currentSection,
  formData,
  handleInputChange,
  nextSection,
  prevSection,
  isSubmitting,
  handleSubmit,
  renderLastSavedText
}) => {
  if (currentSection === 0) {
    return (
      <div className="flex flex-col items-center my-0">
        <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto font-mono mb-4">
          <strong>Design Music Code</strong> orchestrates three pioneering platforms that harness AI, ML, and automation to eliminate tedious business processes.
        </p>
        
        <div className="chip-mint mb-4">DO MORE CREATIVELY</div>
        
        <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto font-mono mb-8">
          <strong>alchemedia lab.</strong> powers design innovation, <strong>happy little accidents</strong> crafts sonic experiences, and <strong>console-one</strong> engineers technical solutions through code.

          Operating both independently and as an integrated ecosystem, these specialized studios deliver tailored creative solutions that transform client visions into reality.
        </p>
        
        <div className="animate-float">
          <button onClick={nextSection} className="btn-mint mt-4 flex items-center justify-center gap-2">
            {PAGE_CONTENT.buttons.start} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }
  
  const section = FORM_SECTIONS[currentSection];
  
  return (
    <div className="space-y-5">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">
          {section.title}
        </h2>
        <p className="text-stone-600 dark:text-stone-400">
          {section.description}
        </p>
      </div>

      <div className="text-left">
        {section.fields?.map(field => (
          <div key={field.name} className="space-y-3 mb-6">
            <label className="block text-[#e0e0e0] dark:text-[#e0e0e0]">
              {field.label}
            </label>
            <textarea 
              name={field.name} 
              value={formData[field.name] || ''} 
              onChange={handleInputChange} 
              className={cn(
                "textarea-mint w-full", 
                (currentSection === 1 || currentSection === 2) && "min-h-[300px]"
              )} 
              placeholder={field.placeholder} 
              style={{
                whiteSpace: 'pre-line'
              }} 
            />
            
            {(currentSection === 1 || currentSection === 2) && (
              <div className="text-right mt-1">
                {renderLastSavedText()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary and next steps for the final section */}
      {currentSection === FORM_SECTIONS.length - 1 && section.extraContent?.type === 'summary' && (
        <SummarizeSection 
          section={section} 
          formData={formData} 
        />
      )}
      
      {currentSection === FORM_SECTIONS.length - 1 && section.nextSteps && (
        <NextStepsSection section={section} />
      )}

      <FormNavigation 
        currentSection={currentSection} 
        prevSection={prevSection} 
        nextSection={nextSection} 
        isSubmitting={isSubmitting} 
        handleSubmit={handleSubmit} 
      />
    </div>
  );
};

interface SummarizeSectionProps {
  section: typeof FORM_SECTIONS[number];
  formData: Record<string, string>;
}

const SummarizeSection: React.FC<SummarizeSectionProps> = ({ section, formData }) => {
  if (!section.extraContent || section.extraContent.type !== 'summary') return null;
  
  return (
    <div className="glass-card p-6 rounded-xl border border-stone-200 mb-6">
      <h3 className="text-lg font-medium text-stone-800 mb-4">{section.extraContent.title}</h3>
      <div className="space-y-4 text-stone-600">
        {section.extraContent.fields.map(fieldName => 
          formData[fieldName] && (
            <div key={fieldName}>
              <p className="font-medium text-stone-700">
                {section.extraContent?.fieldLabels?.[fieldName] || fieldName}
              </p>
              <p>{formData[fieldName]}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

interface NextStepsSectionProps {
  section: typeof FORM_SECTIONS[number];
}

const NextStepsSection: React.FC<NextStepsSectionProps> = ({ section }) => {
  if (!section.nextSteps) return null;
  
  return (
    <div className="space-y-3 bg-mint/10 p-6 rounded-xl">
      <h3 className="text-lg font-medium text-stone-800">{section.nextSteps.title}</h3>
      <ul className="space-y-2">
        {section.nextSteps.items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="inline-block bg-mint text-white p-0.5 rounded mr-2 mt-1">
              <Check size={14} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface FormNavigationProps {
  currentSection: number;
  prevSection: () => void;
  nextSection: () => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentSection,
  prevSection,
  nextSection,
  isSubmitting,
  handleSubmit
}) => {
  return (
    <div className="flex justify-center gap-4 mt-8">
      {currentSection > 0 && (
        <button 
          onClick={prevSection} 
          className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-[#f5f5f5] hover:bg-stone-100 hover:text-stone-600 transition-all"
        >
          <ChevronLeft size={18} /> {PAGE_CONTENT.buttons.back}
        </button>
      )}
      {currentSection < FORM_SECTIONS.length - 1 ? (
        <button onClick={nextSection} className="btn-mint flex items-center gap-2">
          {PAGE_CONTENT.buttons.next} <ChevronRight size={18} />
        </button>
      ) : (
        <button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          className={cn(
            "btn-mint flex items-center gap-2 min-w-[180px] justify-center", 
            isSubmitting && "opacity-70 cursor-not-allowed"
          )}
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
      )}
    </div>
  );
};

export default FormContentRenderer;
