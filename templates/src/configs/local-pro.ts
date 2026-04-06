export const LocalProConfig = {
  schemaType: 'LocalBusiness',
  hero: {
    badge: 'Proudly serving {location}',
    title:
      'Reliable {niche} for homes, landlords, and small businesses in {location}',
    subtitle:
      '{name} is built around fast local response, clear pricing, and practical service visits for customers who want the issue handled properly without chasing or uncertainty.',
    cta: 'Check Availability'
  },
  stats: [
    { val: '4.9/5', label: 'Average local rating' },
    { val: 'Same Day', label: 'Slots where possible' },
    { val: 'Fully Insured', label: 'Customer reassurance' },
    { val: 'Repeat Clients', label: 'Built on reliability' }
  ],
  promisesBar: [
    'Fast local response and scheduled appointments',
    'Clear quotes before bigger works begin',
    'Respectful, tidy service on every visit'
  ],
  services: [
    {
      title: 'Urgent Home Visits',
      desc: 'For customers who need quick local help when something stops working, becomes inconvenient, or needs attention before it turns into a bigger issue.',
      includes: [
        'Priority local appointments where available',
        'Clear explanation of the issue on arrival',
        'Straightforward next steps if more work is needed'
      ]
    },
    {
      title: 'Planned Service Appointments',
      desc: 'For standard household or small-business jobs where the customer wants a booked visit, a clearer scope, and confidence around timing and pricing.',
      includes: [
        'Scheduled appointment windows',
        'Scope confirmed before work expands',
        'Suitable for one-off jobs and general maintenance'
      ]
    },
    {
      title: 'Ongoing Property Support',
      desc: 'For landlords, repeat customers, and managed properties that benefit from a reliable local contact for recurring service needs over time.',
      includes: [
        'Useful for repeat maintenance and managed homes',
        'Ongoing contact for recurring service issues',
        'A more dependable long-term support relationship'
      ]
    }
  ],
  pricing: [
    {
      level: 'Quick Fix Visit',
      price: 'From GBP 49',
      idealFor: 'Best for smaller issues that need a local visit, a fast assessment, and a practical resolution where possible.',
      features: [
        'Short local service visit',
        'Basic issue diagnosis and advice',
        'Good for straightforward home problems'
      ],
      popular: false
    },
    {
      level: 'Standard Service Appointment',
      price: 'From GBP 89',
      idealFor: 'The most common option for booked jobs that need a more complete visit and enough time to handle the work properly.',
      features: [
        'Longer appointment window',
        'Suitable for planned household jobs',
        'Clearer scope and more complete service time'
      ],
      popular: true
    },
    {
      level: 'Property Care Support',
      price: 'From GBP 149',
      idealFor: 'Designed for landlords, repeat clients, or larger properties that benefit from ongoing help and a more dependable local contact.',
      features: [
        'Support for recurring property needs',
        'Priority scheduling for repeat customers',
        'Better suited to managed homes or multiple jobs'
      ],
      popular: false
    }
  ],
  process: [
    {
      number: '01',
      title: 'Book the visit',
      desc: 'The customer gets in touch with the issue, the location, and the kind of timing they need so the right slot can be offered first.'
    },
    {
      number: '02',
      title: 'Assess and explain',
      desc: 'On the visit, the problem is reviewed, the likely fix is explained clearly, and any further work is scoped before it moves ahead.'
    },
    {
      number: '03',
      title: 'Complete and follow up',
      desc: 'The work is handled as cleanly as possible, with the customer left clear on what was done and whether anything else should be monitored.'
    }
  ],
  footer: {
    title: 'If you need a reliable local expert, the next step is booking the visit',
    subtitle:
      'Speak to {name} in {location} about the issue, your preferred timing, and whether you need a quick callout, a standard appointment, or ongoing property support.'
  },
  faqs: [
    {
      q: 'Do you offer same-day appointments?',
      a: 'Yes, where availability allows. Same-day and short-notice slots can be offered for customers in the local service area depending on demand.'
    },
    {
      q: 'Will I know the price before larger work starts?',
      a: 'Yes. For anything beyond a simple visit or quick fix, the customer should be given a clearer scope and price expectation before more work begins.'
    },
    {
      q: 'Can you support landlords or repeat property needs?',
      a: 'Yes. The service supports one-off household visits as well as repeat maintenance relationships for landlords and managed properties.'
    },
    {
      q: 'What areas do you cover?',
      a: 'The business is positioned as a strong local option for {location} and nearby service areas, with travel and availability discussed when booking.'
    }
  ]
};
