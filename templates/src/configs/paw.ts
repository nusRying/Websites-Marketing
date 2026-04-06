export const PawConfig = {
  schemaType: 'LocalBusiness',
  hero: {
    title: 'Gentle grooming, daycare, and pet care that keeps tails calm in {location}',
    subtitle:
      'Thoughtful {niche} in {location} for owners who want kind handling, clean facilities, and clear updates after every visit.',
    cta: 'Book a Meet and Greet'
  },
  stats: [
    { val: '4.9/5', label: 'Average owner rating' },
    { val: 'Calm Handling', label: 'For nervous pets and first visits' },
    { val: 'Daycare + Grooming', label: 'Main service mix' },
    { val: 'Repeat Visits', label: 'Built around regular care' }
  ],
  promisesBar: [
    'Calm handling and patient first appointments',
    'Grooming, tidy-ups, and supervised daycare',
    'Clear owner updates after each visit'
  ],
  services: [
    {
      title: 'Grooming and styling',
      desc: 'Bathing, drying, coat maintenance, and breed-aware styling for pets that need a tidy finish without a rushed experience.',
      includes: [
        'Bath, brush, and blow dry',
        'Nail, ear, and hygiene care',
        'Tailored trims for coat type and comfort'
      ]
    },
    {
      title: 'Supervised daycare',
      desc: 'Structured daytime care for pets that benefit from monitored play, rest breaks, and a team that keeps owners updated.',
      includes: [
        'Supervised social and rest periods',
        'Safe handover and collection routine',
        'Suitable for regular weekly visits'
      ]
    },
    {
      title: 'Routine pet maintenance',
      desc: 'Practical upkeep visits for pets that need regular coat care, seasonal tidy-ups, or support between full appointments.',
      includes: [
        'Between-groom tidy appointments',
        'Coat and skin-condition checks',
        'Advice on timing the next visit'
      ]
    }
  ],
  packages: [
    {
      name: 'Bath and Tidy',
      price: 'From GBP 35',
      idealFor: 'Ideal for short maintenance visits and in-between freshen-ups',
      features: [
        'Bath, dry, and brush through',
        'Face, feet, and hygiene tidy',
        'Nail and ear check included'
      ]
    },
    {
      name: 'Full Groom',
      price: 'From GBP 55',
      idealFor: 'Best for pets needing a complete coat reset and styling appointment',
      features: [
        'Consultation before the groom',
        'Coat work tailored to breed and comfort',
        'Owner update with aftercare notes'
      ],
      featured: true,
      tag: 'Most booked'
    },
    {
      name: 'Daycare Visit',
      price: 'From GBP 28',
      idealFor: 'Designed for owners who need supervised daytime care and routine support',
      features: [
        'Structured play and quiet time',
        'Monitored handover and collection',
        'Suitable for repeat weekly bookings'
      ]
    }
  ],
  process: [
    {
      number: '01',
      title: 'Start with a quick check-in',
      desc: 'Share your pet\'s temperament, routine, and any concerns so the visit can be planned properly.'
    },
    {
      number: '02',
      title: 'Choose the right visit type',
      desc: 'Book a tidy-up, full groom, or daycare session based on what your pet needs right now.'
    },
    {
      number: '03',
      title: 'Receive care notes after the visit',
      desc: 'You get a clear handover, practical advice, and a sensible recommendation for the next appointment.'
    }
  ],
  footer: {
    title: 'Book calm, dependable pet care in {location}',
    subtitle:
      'New and returning clients can book grooming, daycare, and routine support with a team that keeps owners informed.'
  },
  faqs: [
    {
      q: 'My pet is anxious. Can you still help?',
      a: 'Yes. First visits can be kept calmer and slower, with handling adjusted to the pet\'s temperament and tolerance.'
    },
    {
      q: 'How long does a full groom usually take?',
      a: 'Most full grooms take around 1.5 to 2.5 hours depending on coat condition, breed, and how much styling is required.'
    },
    {
      q: 'Can I book regular repeat visits?',
      a: 'Yes. Many owners book routine grooming or daycare visits on a repeat basis so coat condition and behavior stay easier to manage.'
    }
  ]
};
