import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import ProgressIndicator from './ProgressIndicator';
import FormSection from './FormSection';
import AnimatedText from './AnimatedText';
import { ChevronRight, ChevronLeft, Check, Send } from 'lucide-react';
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
}
const SECTIONS = [{
  id: 'opening',
  title: 'Welcome',
  description: "Thanks for connecting today. I'm excited to explore how our companies might collaborate to drive growth for both of us. I'd like to understand your business better so we can identify the most valuable opportunities."
}, {
  id: 'understanding',
  title: 'Understanding Your Business',
  description: "First, I'd love to hear more about your company:"
}, {
  id: 'painPoints',
  title: 'Identifying Pain Points & Opportunities',
  description: "To understand where we might add value:"
}, {
  id: 'collaboration',
  title: 'Exploring Collaboration Models',
  description: "Based on what you've shared, I see a few potential ways we could work together:"
}, {
  id: 'value',
  title: 'Discussing Value Exchange',
  description: "Let's talk about how we can create value for each other:"
}, {
  id: 'ideas',
  title: 'Testing Specific Ideas',
  description: "I have a few initial thoughts on how we might work together:"
}, {
  id: 'nextSteps',
  title: 'Establishing Next Steps',
  description: "I've found this conversation really valuable. To move forward:"
}, {
  id: 'closing',
  title: 'Thank You',
  description: "I'm excited about the potential here. Let me summarize what I've heard and our agreed next steps to make sure we're aligned."
}];
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
  const {
    toast
  } = useToast();
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
    if (currentSection < SECTIONS.length - 1) {
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
  const renderFormFields = () => {
    switch (currentSection) {
      case 0:
        // Opening
        return <div className="flex flex-col items-center my-0">
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="Handshake" className="w-full h-48 object-cover rounded-xl mb-6 opacity-90" />
            <div className="animate-float">
              <button onClick={nextSection} className="btn-mint mt-4 flex items-center justify-center gap-2">
                Get Started <ChevronRight size={18} />
              </button>
            </div>
          </div>;
      case 1:
        // Understanding Business
        return <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-stone-700">
                Could you walk me through your core offerings and who your ideal clients are?
              </label>
              <textarea name="coreOfferings" value={formData.coreOfferings} onChange={handleInputChange} className="textarea-mint" placeholder="Describe your products/services and target audience..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                What makes your approach unique in the market?
              </label>
              <textarea name="uniqueApproach" value={formData.uniqueApproach} onChange={handleInputChange} className="textarea-mint" placeholder="Share your unique value proposition..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                Which client acquisition channels have been most effective for you so far?
              </label>
              <textarea name="acquisitionChannels" value={formData.acquisitionChannels} onChange={handleInputChange} className="textarea-mint" placeholder="Tell us about your successful marketing channels..." />
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100 transition-all">
                <ChevronLeft size={18} /> Back
              </button>
              <button onClick={nextSection} className="btn-mint flex items-center gap-2">
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>;
      case 2:
        // Pain Points
        return <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-stone-700">
                What are your biggest challenges right now in acquiring new clients?
              </label>
              <textarea name="challenges" value={formData.challenges} onChange={handleInputChange} className="textarea-mint" placeholder="Describe your current challenges..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                Are there specific market segments you're trying to penetrate but finding difficult?
              </label>
              <textarea name="targetSegments" value={formData.targetSegments} onChange={handleInputChange} className="textarea-mint" placeholder="Share details about difficult-to-reach segments..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                What would meaningful growth look like for you in the next 6-12 months?
              </label>
              <textarea name="growthGoals" value={formData.growthGoals} onChange={handleInputChange} className="textarea-mint" placeholder="Describe your growth targets and metrics..." />
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100 transition-all">
                <ChevronLeft size={18} /> Back
              </button>
              <button onClick={nextSection} className="btn-mint flex items-center gap-2">
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>;
      case 3:
        // Collaboration
        return <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-stone-700">
                How do you typically structure partnerships with other businesses?
              </label>
              <textarea name="partnershipStructure" value={formData.partnershipStructure} onChange={handleInputChange} className="textarea-mint" placeholder="Describe your typical partnership arrangements..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                Have you had success with referral arrangements, co-marketing, or integrated service offerings in the past?
              </label>
              <textarea name="pastPartnerships" value={formData.pastPartnerships} onChange={handleInputChange} className="textarea-mint" placeholder="Share details about your past partnership experiences..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                What would an ideal collaboration look like from your perspective?
              </label>
              <textarea name="idealCollaboration" value={formData.idealCollaboration} onChange={handleInputChange} className="textarea-mint" placeholder="Describe your vision for an ideal partnership..." />
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100 transition-all">
                <ChevronLeft size={18} /> Back
              </button>
              <button onClick={nextSection} className="btn-mint flex items-center gap-2">
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>;
      case 4:
        // Value Exchange
        return <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-stone-700">
                What resources or capabilities would help you most in reaching new clients?
              </label>
              <textarea name="resourcesNeeded" value={formData.resourcesNeeded} onChange={handleInputChange} className="textarea-mint" placeholder="Describe resources that would help your business grow..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                How do you evaluate the success of your business partnerships?
              </label>
              <textarea name="evaluationCriteria" value={formData.evaluationCriteria} onChange={handleInputChange} className="textarea-mint" placeholder="Share how you measure partnership success..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                What would make this relationship worth investing in from your perspective?
              </label>
              <textarea name="valueExpectations" value={formData.valueExpectations} onChange={handleInputChange} className="textarea-mint" placeholder="Describe your value expectations..." />
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100 transition-all">
                <ChevronLeft size={18} /> Back
              </button>
              <button onClick={nextSection} className="btn-mint flex items-center gap-2">
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>;
      case 5:
        // Testing Ideas
        return <div className="space-y-5">
            <div className="glass-card bg-mint/5 p-5 border border-mint/10 rounded-xl mb-4">
              <h3 className="text-lg font-medium text-stone-800 mb-2">Potential Collaboration Ideas:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block bg-mint text-white p-0.5 rounded mr-2 mt-1">
                    <Check size={14} />
                  </span>
                  <span>Cross-promotional content marketing to leverage each other's audiences</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-mint text-white p-0.5 rounded mr-2 mt-1">
                    <Check size={14} />
                  </span>
                  <span>Joint webinar series addressing industry pain points</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-mint text-white p-0.5 rounded mr-2 mt-1">
                    <Check size={14} />
                  </span>
                  <span>Referral program with mutual benefits and clear tracking</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                How do these ideas align with your goals?
              </label>
              <textarea name="feedbackOnIdeas" value={formData.feedbackOnIdeas} onChange={handleInputChange} className="textarea-mint" placeholder="Share your thoughts on these collaboration ideas..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                What other approaches do you think would be effective?
              </label>
              <textarea name="additionalIdeas" value={formData.additionalIdeas} onChange={handleInputChange} className="textarea-mint" placeholder="Suggest any other collaboration ideas..." />
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100 transition-all">
                <ChevronLeft size={18} /> Back
              </button>
              <button onClick={nextSection} className="btn-mint flex items-center gap-2">
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>;
      case 6:
        // Next Steps
        return <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-stone-700">
                Who else in your organization should be involved in these discussions?
              </label>
              <textarea name="keyStakeholders" value={formData.keyStakeholders} onChange={handleInputChange} className="textarea-mint" placeholder="List key stakeholders who should be involved..." />
            </div>
            
            <div className="space-y-3">
              <label className="block text-stone-700">
                What timeline makes sense for putting together a formal proposal/agreement?
              </label>
              <textarea name="timeline" value={formData.timeline} onChange={handleInputChange} className="textarea-mint" placeholder="Share your preferred timeline..." />
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100 transition-all">
                <ChevronLeft size={18} /> Back
              </button>
              <button onClick={nextSection} className="btn-mint flex items-center gap-2">
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>;
      case 7:
        // Closing
        return <div className="space-y-5">
            <div className="glass-card p-6 rounded-xl border border-stone-200 mb-6">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Summary of Information Provided:</h3>
              <div className="space-y-4 text-stone-600">
                {formData.coreOfferings && <div>
                    <p className="font-medium text-stone-700">Core Offerings:</p>
                    <p>{formData.coreOfferings}</p>
                  </div>}
                {formData.challenges && <div>
                    <p className="font-medium text-stone-700">Key Challenges:</p>
                    <p>{formData.challenges}</p>
                  </div>}
                {formData.idealCollaboration && <div>
                    <p className="font-medium text-stone-700">Ideal Collaboration:</p>
                    <p>{formData.idealCollaboration}</p>
                  </div>}
                {formData.timeline && <div>
                    <p className="font-medium text-stone-700">Timeline:</p>
                    <p>{formData.timeline}</p>
                  </div>}
              </div>
            </div>
            
            <div className="space-y-3 bg-mint/10 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-stone-800">Next Steps:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block bg-mint text-white p-0.5 rounded mr-2 mt-1">
                    <Check size={14} />
                  </span>
                  <span>We'll review your information within 2 business days</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-mint text-white p-0.5 rounded mr-2 mt-1">
                    <Check size={14} />
                  </span>
                  <span>Our team will prepare a collaboration proposal</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-mint text-white p-0.5 rounded mr-2 mt-1">
                    <Check size={14} />
                  </span>
                  <span>We'll schedule a follow-up meeting to discuss next steps</span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-center mt-8">
              <button onClick={handleSubmit} disabled={isSubmitting} className={cn("btn-mint flex items-center gap-2 min-w-[180px] justify-center", isSubmitting && "opacity-70 cursor-not-allowed")}>
                {isSubmitting ? <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span> : <>
                    Submit <Send size={18} />
                  </>}
              </button>
            </div>
            
            <div className="flex justify-start mt-4">
              <button onClick={prevSection} className="flex items-center gap-2 px-5 py-2 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100 transition-all">
                <ChevronLeft size={18} /> Back
              </button>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="max-w-3xl mx-auto py-0 px-[20px]">
      <ProgressIndicator totalSteps={SECTIONS.length} currentStep={currentSection + 1} className="mb-8" onStepClick={handleStepClick} />
      
      {SECTIONS.map((section, index) => <div key={section.id} className={cn("transition-all duration-500 ease-out absolute w-[calc(100%-2rem)] max-w-3xl", currentSection === index ? "opacity-100 z-10 translate-x-0" : "opacity-0 -z-10 translate-x-8")} style={{
      display: Math.abs(currentSection - index) <= 1 ? 'block' : 'none'
    }}>
          <FormSection title={section.title} description={section.description} isActive={currentSection === index} animationDelay={index * 100}>
            {currentSection === index && renderFormFields()}
          </FormSection>
        </div>)}
    </div>;
};
export default DiscoveryForm;