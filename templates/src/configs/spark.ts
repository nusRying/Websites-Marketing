export const SparkConfig = {
  schemaType: 'Electrician',
  hero: {
    title: 'Electrical work done safely and clearly in {location}',
    subtitle:
      'Testing, repairs, rewires, upgrades, and energy-ready installations for homes and businesses in {location}, with proper certification and practical advice.',
    cta: 'Book a Safety Check'
  },
  stats: [
    { val: '4.9/5', label: 'Average client rating' },
    { val: 'Homes + Businesses', label: 'Residential and commercial support' },
    { val: 'Certified Work', label: 'Testing and documentation where required' },
    { val: 'Energy Ready', label: 'Upgrades for EV, solar, and smarter control' }
  ],
  solutions: [
    {
      title: 'Testing, faults, and safety work',
      desc: 'Inspection-led electrical support for dangerous faults, failed circuits, repeated tripping, and systems that need clearer diagnosis before any fix is recommended.',
      includes: [
        'Fault finding and safety testing',
        'Clear explanation of the issue',
        'Make-safe work where needed'
      ]
    },
    {
      title: 'Rewires and major upgrades',
      desc: 'Electrical upgrades for ageing properties, extensions, refurbishments, and installations that need a safer or more modern setup.',
      includes: [
        'Rewires and distribution upgrades',
        'Useful for renovations and extensions',
        'Planned with certification in mind'
      ]
    },
    {
      title: 'Energy and smart installations',
      desc: 'Future-ready electrical work for EV charging, solar-linked upgrades, and smarter home control where long-term usability matters.',
      includes: [
        'EV and energy-ready electrical work',
        'Smarter controls and system planning',
        'Designed around future property needs'
      ]
    }
  ],
  plans: [
    {
      name: 'Safety Visit',
      price: 'From GBP 95',
      idealFor: 'Ideal for fault finding, checks, and urgent electrical issues that need a safe diagnosis first',
      features: [
        'Testing and initial assessment',
        'Practical advice on the safest fix',
        'Useful for faults and compliance concerns'
      ]
    },
    {
      name: 'Upgrade Project',
      price: 'Custom quote',
      idealFor: 'Best for rewires, consumer-unit upgrades, extensions, and larger electrical improvements',
      features: [
        'Survey and written scope before work',
        'Planned around the property and usage needs',
        'Suitable for staged or larger projects'
      ],
      featured: true,
      tag: 'Most requested'
    },
    {
      name: 'Energy-Ready Install',
      price: 'Project-based',
      idealFor: 'For clients preparing for EV charging, solar-linked work, or smarter electrical control',
      features: [
        'Upgrade planning around future energy use',
        'Good fit for modern property improvements',
        'Helps avoid short-term patchwork solutions'
      ]
    }
  ],
  safetyBar: [
    'Safety checks before major work',
    'Testing, certification, and documentation',
    'Clear upgrade advice and aftercare'
  ],
  process: [
    {
      number: '01',
      title: 'Start with testing or survey',
      desc: 'Review the property, the issue, and the level of risk so the job can be diagnosed properly before a quote is issued.'
    },
    {
      number: '02',
      title: 'Agree the scope of work',
      desc: 'The repair, upgrade, or installation is explained clearly so the client understands what is being done and why.'
    },
    {
      number: '03',
      title: 'Complete and certify',
      desc: 'The work is carried out safely, tested where required, and handed over with the right documentation and guidance.'
    }
  ],
  footer: {
    title: 'Book an electrical survey in {location}',
    subtitle:
      'Speak to the team about faults, rewires, upgrades, EV readiness, or a safer and more modern electrical setup for your property.'
  },
  faqs: [
    {
      q: 'Do you provide electrical certificates for your work?',
      a: 'Yes. Where the job requires testing and certification, the relevant documentation is provided on completion.'
    },
    {
      q: 'Can you help with urgent electrical faults?',
      a: 'Yes. Faults and dangerous issues can be assessed and made safe, with the next repair steps explained clearly after the visit.'
    },
    {
      q: 'Do you handle larger upgrade projects as well as repairs?',
      a: 'Yes. The service covers both immediate electrical issues and larger upgrades such as rewires, extensions, and energy-related installations.'
    }
  ]
};
