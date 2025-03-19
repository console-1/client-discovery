
// Form sections and content for the client discovery application

export const FORM_SECTIONS = [
  {
    id: 'opening',
    title: 'DO MORE CREATIVELY',
    description: '',
    introText: 'DMC orchestrates three pioneering platforms that harness AI, ML, and automation to eliminate tedious business processes.',
    introChip: 'DO MORE CREATIVELY',
    fields: []
  },
  {
    id: 'understanding',
    title: 'Business Foundation',
    sectionHeader: 'UNDERSTAND DEEPLY',
    description: '',
    introText: 'alchemedia lab. powers design innovation, happy little accidents crafts sonic experiences, and console-one engineers technical solutions through code.',
    introChip: 'DESIGN MUSIC CODE',
    fields: [
      {
        name: 'businessFoundation',
        label: 'Building on our discussion, what makes your company unique, differentiating from competitors? What results have you delivered for clients and how has your target market evolved recently?',
        placeholder: `Consider these points in your response:

1. Which client acquisition channels have been most effective for you so far?
2. What truly sets your company apart from competitors in your industry? 
3. What specific results have clients achieved by working with you? 
4. How has your target market evolved over the past year?`
      }
    ]
  },
  {
    id: 'growthChallenges',
    title: 'Growth, Challenges & Opportunities',
    sectionHeader: 'GROW STRATEGICALLY',
    description: '',
    introText: 'Operating both independently and as an integrated ecosystem, these specialized studios deliver tailored creative solutions that transform client visions into reality.',
    introChip: 'DEVELOP MY COMPANY',
    fields: [
      {
        name: 'growthChallenges',
        label: 'Tell us about your most inspiring core offerings, unique approach, client acquisition challenges, difficult to reach market segments, and what meaningful growth would look like for your business in the next 6 - 12 months.',
        placeholder: `Consider these points in your response:

1. What are your biggest challenges in attracting new clients?
2. Are there specific market segments you're trying to penetrate but finding difficult?
3. What would meaningful growth look like for you in the next 6-12 months?`
      }
    ]
  },
  {
    id: 'closing',
    title: 'Thank You',
    sectionHeader: 'PARTNER MEANINGFULLY',
    description: "I'm excited about the potential here. Let me summarize what I've heard and our agreed next steps to make sure we're aligned.",
    introText: 'DMC orchestrates three pioneering platforms that harness AI, ML, and automation to eliminate tedious business processes.',
    introChip: 'DO MORE CREATIVELY',
    fields: [],
    extraContent: {
      type: 'summary',
      title: 'Summary of Information Provided:',
      fields: ['businessFoundation', 'growthChallenges'],
      fieldLabels: {
        businessFoundation: 'Business Foundation:',
        growthChallenges: 'Growth & Challenges:'
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
