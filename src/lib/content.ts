// Form sections and content for the client discovery application

export const FORM_SECTIONS = [
  {
    id: 'opening',
    title: '',
    description: '',
    fields: []
  },
  {
    id: 'understanding',
    title: 'Understanding Your Business',
    description: "First, I'd love to hear more about your company:",
    fields: [
      {
        name: 'coreOfferings',
        label: 'Could you walk me through your core offerings and who your ideal clients are?',
        placeholder: 'Describe your products/services and target audience...'
      },
      {
        name: 'uniqueApproach',
        label: 'What makes your approach unique in the market?',
        placeholder: 'Share your unique value proposition...'
      },
      {
        name: 'acquisitionChannels',
        label: 'Which client acquisition channels have been most effective for you so far?',
        placeholder: 'Tell us about your successful marketing channels...'
      }
    ]
  },
  {
    id: 'painPoints',
    title: 'Identifying Pain Points & Opportunities',
    description: "To understand where we might add value:",
    fields: [
      {
        name: 'challenges',
        label: 'What are your biggest challenges right now in acquiring new clients?',
        placeholder: 'Describe your current challenges...'
      },
      {
        name: 'targetSegments',
        label: 'Are there specific market segments you\'re trying to penetrate but finding difficult?',
        placeholder: 'Share details about difficult-to-reach segments...'
      },
      {
        name: 'growthGoals',
        label: 'What would meaningful growth look like for you in the next 6-12 months?',
        placeholder: 'Describe your growth targets and metrics...'
      }
    ]
  },
  {
    id: 'collaboration',
    title: 'Exploring Collaboration Models',
    description: "Based on what you've shared, I see a few potential ways we could work together:",
    fields: [
      {
        name: 'partnershipStructure',
        label: 'How do you typically structure partnerships with other businesses?',
        placeholder: 'Describe your typical partnership arrangements...'
      },
      {
        name: 'pastPartnerships',
        label: 'Have you had success with referral arrangements, co-marketing, or integrated service offerings in the past?',
        placeholder: 'Share details about your past partnership experiences...'
      },
      {
        name: 'idealCollaboration',
        label: 'What would an ideal collaboration look like from your perspective?',
        placeholder: 'Describe your vision for an ideal partnership...'
      }
    ]
  },
  {
    id: 'value',
    title: 'Discussing Value Exchange',
    description: "Let's talk about how we can create value for each other:",
    fields: [
      {
        name: 'resourcesNeeded',
        label: 'What resources or capabilities would help you most in reaching new clients?',
        placeholder: 'Describe resources that would help your business grow...'
      },
      {
        name: 'evaluationCriteria',
        label: 'How do you evaluate the success of your business partnerships?',
        placeholder: 'Share how you measure partnership success...'
      },
      {
        name: 'valueExpectations',
        label: 'What would make this relationship worth investing in from your perspective?',
        placeholder: 'Describe your value expectations...'
      }
    ]
  },
  {
    id: 'ideas',
    title: 'Testing Specific Ideas',
    description: "I have a few initial thoughts on how we might work together:",
    fields: [
      {
        name: 'feedbackOnIdeas',
        label: 'How do these ideas align with your goals?',
        placeholder: 'Share your thoughts on these collaboration ideas...'
      },
      {
        name: 'additionalIdeas',
        label: 'What other approaches do you think would be effective?',
        placeholder: 'Suggest any other collaboration ideas...'
      }
    ],
    extraContent: {
      type: 'ideaList',
      title: 'Potential Collaboration Ideas:',
      items: [
        'Cross-promotional content marketing to leverage each other\'s audiences',
        'Joint webinar series addressing industry pain points',
        'Referral program with mutual benefits and clear tracking'
      ]
    }
  },
  {
    id: 'nextSteps',
    title: 'Establishing Next Steps',
    description: "I've found this conversation really valuable. To move forward:",
    fields: [
      {
        name: 'keyStakeholders',
        label: 'Who else in your organization should be involved in these discussions?',
        placeholder: 'List key stakeholders who should be involved...'
      },
      {
        name: 'timeline',
        label: 'What timeline makes sense for putting together a formal proposal/agreement?',
        placeholder: 'Share your preferred timeline...'
      }
    ]
  },
  {
    id: 'closing',
    title: 'Thank You',
    description: "I'm excited about the potential here. Let me summarize what I've heard and our agreed next steps to make sure we're aligned.",
    fields: [],
    extraContent: {
      type: 'summary',
      title: 'Summary of Information Provided:',
      fields: ['coreOfferings', 'challenges', 'idealCollaboration', 'timeline'],
      fieldLabels: {
        coreOfferings: 'Core Offerings:',
        challenges: 'Key Challenges:',
        idealCollaboration: 'Ideal Collaboration:',
        timeline: 'Timeline:'
      }
    },
    nextSteps: {
      title: 'Next Steps:',
      items: [
        'We\'ll review your information within 2 business days',
        'Our team will prepare a collaboration proposal',
        'We\'ll schedule a follow-up meeting to discuss next steps'
      ]
    }
  }
];

export const PAGE_CONTENT = {
  header: {
    title: 'design music code',
    subtitle: ''
  },
  intro: {
    badge: 'CLIENT DISCOVERY',
    description: 'Your vision meets our expertise. Complete this quick interactive form to unlock powerful strategies tailored specifically for your business challenges. What could your organization achieve with the right partnership? Let\'s find out together.'
  },
  buttons: {
    start: 'Begin Discovery Process',
    next: 'Next',
    back: 'Back',
    submit: 'Submit'
  }
}; 