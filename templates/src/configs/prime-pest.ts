export const PrimePestConfig = {
  schemaType: 'PestControlService',
  hero: {
    title: 'Fast, discreet pest control for homes and businesses in {location}',
    subtitle:
      'Practical inspections, targeted treatment, and follow-up advice for rodents, insects, and recurring pest issues across {location}.',
    cta: 'Request a Site Survey'
  },
  stats: [
    { val: 'Same-Day Help', label: 'Urgent callouts when available' },
    { val: 'Homes + Premises', label: 'Residential and commercial coverage' },
    { val: 'Targeted Plans', label: 'Inspection-led treatment approach' },
    { val: 'Follow-Up Support', label: 'Prevention and monitoring available' }
  ],
  promisesBar: [
    'Discreet technician visits and clear treatment plans',
    'Rodents, insects, and recurring infestation control',
    'Visit notes, prevention advice, and follow-up support'
  ],
  services: [
    {
      title: 'Residential treatment',
      desc: 'Inspection-led pest control for homes, flats, and rental properties where speed, discretion, and clear advice matter most.',
      includes: [
        'Rodent and insect treatment visits',
        'Advice for tenants, owners, and landlords',
        'Prevention guidance after treatment'
      ]
    },
    {
      title: 'Commercial compliance support',
      desc: 'Practical pest control for food sites, hospitality businesses, offices, and managed premises that need proper records and dependable attendance.',
      includes: [
        'Scheduled inspections and reporting',
        'Documentation for business records',
        'Discreet treatment during operating hours'
      ]
    },
    {
      title: 'Prevention and monitoring',
      desc: 'Repeat visits, proofing advice, and follow-up plans for properties with ongoing risk or previous recurring issues.',
      includes: [
        'Monitoring and review visits',
        'Proofing and access-point advice',
        'Longer-term protection planning'
      ]
    }
  ],
  plans: [
    {
      name: 'Single Treatment',
      price: 'From GBP 95',
      idealFor: 'Ideal for urgent active infestations and one-off callouts',
      features: [
        'Initial site survey and treatment plan',
        'Targeted treatment for the active issue',
        'Practical advice before leaving site'
      ]
    },
    {
      name: 'Protection Plan',
      price: 'From GBP 49 / month',
      idealFor: 'Best for repeat prevention and properties with recurring risk',
      features: [
        'Scheduled monitoring visits',
        'Adjustments based on seasonal patterns',
        'Ongoing prevention and follow-up support'
      ],
      featured: true,
      tag: 'Most popular'
    },
    {
      name: 'Commercial Contract',
      price: 'Custom quote',
      idealFor: 'For food sites, offices, and managed portfolios needing reporting',
      features: [
        'Routine attendance and inspection logs',
        'Support for audits and site records',
        'Multi-site service available when required'
      ]
    }
  ],
  process: [
    {
      number: '01',
      title: 'Book an inspection',
      desc: 'Call or request a survey so the issue, property type, and urgency can be understood properly.'
    },
    {
      number: '02',
      title: 'Survey and treatment plan',
      desc: 'The visit starts with an inspection, then the technician explains what is happening and what treatment is appropriate.'
    },
    {
      number: '03',
      title: 'Treatment and follow-up',
      desc: 'You get the treatment, site notes, and practical prevention advice to reduce the chance of the issue returning.'
    }
  ],
  footer: {
    title: 'Book a pest inspection in {location}',
    subtitle:
      'Speak to a technician about urgent issues, repeat infestations, or ongoing protection for your home, rental, or commercial site.'
  },
  faqs: [
    {
      q: 'How soon can you attend?',
      a: 'Urgent visits can often be arranged quickly, depending on location and availability. The exact response time is confirmed when you call.'
    },
    {
      q: 'Will I need to leave the property during treatment?',
      a: 'That depends on the treatment type and the area affected. You will be told clearly before any work starts if temporary access restrictions are needed.'
    },
    {
      q: 'Do you offer contracts for businesses and landlords?',
      a: 'Yes. Ongoing support can be arranged for managed properties, hospitality sites, offices, and other businesses that need regular attendance and records.'
    }
  ]
};
