export const ScholasticConfig = {
  schemaType: 'EducationalOrganization',
  hero: {
    title: 'Focused tutoring and academic mentoring for students in {location}',
    subtitle:
      'Assessment-led tutoring, exam preparation, and academic planning for families in {location} who want clearer progress and more confident learners.',
    cta: 'Book an Academic Assessment'
  },
  stats: [
    { val: '4.9/5', label: 'Average family rating' },
    { val: '1:1 + Small Group', label: 'Support formats available' },
    { val: 'Exam-Year Planning', label: 'For GCSE, A-level, and beyond' },
    { val: 'Progress Reviews', label: 'Built into the learning journey' }
  ],
  promisesBar: [
    'Initial assessment before a long-term plan is agreed',
    'Subject tutoring, exam technique, and confidence building',
    'Regular parent updates and clear progress reviews'
  ],
  services: [
    {
      title: 'Subject foundations',
      desc: 'Structured tutoring for students who need stronger understanding, better study habits, and more confidence in core academic subjects.',
      includes: [
        'Support for topic gaps and weak areas',
        'Session plans matched to the student level',
        'Useful from primary through to sixth form'
      ]
    },
    {
      title: 'Exam preparation',
      desc: 'Focused support for students preparing for assessments, GCSEs, A-levels, mocks, and other academic milestones under real deadlines.',
      includes: [
        'Revision structure and exam technique',
        'Confidence building under time pressure',
        'Regular review of progress and priorities'
      ]
    },
    {
      title: 'Academic progression',
      desc: 'Higher-level support for students and families planning next steps around sixth form, university entry, or more ambitious academic targets.',
      includes: [
        'Goal setting and progression advice',
        'Support with academic decision points',
        'Guidance on the path ahead'
      ]
    }
  ],
  packages: [
    {
      name: 'Assessment Session',
      price: 'From GBP 60',
      idealFor: 'Ideal for families who want a clear starting point before committing to regular tutoring',
      features: [
        'Initial review of strengths and gaps',
        'Recommendation on the right support level',
        'Written summary and next-step guidance'
      ]
    },
    {
      name: 'Weekly Tutoring Plan',
      price: 'From GBP 180 / month',
      idealFor: 'Best for ongoing academic support, confidence building, and measurable progress',
      features: [
        'Regular weekly tuition sessions',
        'Progress tracking and parent feedback',
        'Adapted pacing based on student performance'
      ],
      featured: true,
      tag: 'Most chosen'
    },
    {
      name: 'Exam Intensive',
      price: 'Custom plan',
      idealFor: 'For students approaching exams who need a shorter-term focused academic push',
      features: [
        'Revision planning around real deadlines',
        'Exam technique and timed practice focus',
        'Concentrated support before key papers'
      ]
    }
  ],
  process: [
    {
      number: '01',
      title: 'Start with an assessment',
      desc: 'Share the student stage, concerns, and academic goals so the first session can identify what support is actually needed.'
    },
    {
      number: '02',
      title: 'Build the learning plan',
      desc: 'The tutor recommends a format, subject focus, and pace that match the student level and the outcomes being targeted.'
    },
    {
      number: '03',
      title: 'Track progress properly',
      desc: 'Sessions, reviews, and parent updates keep the tutoring measurable so improvements are visible over time.'
    }
  ],
  footer: {
    title: 'Book an academic consultation in {location}',
    subtitle:
      'Speak to the team about subject tutoring, exam preparation, study confidence, or a more structured academic plan for your child.'
  },
  faqs: [
    {
      q: 'Do you start with an assessment?',
      a: 'Yes. An initial review helps identify the student\'s current level, the main learning gaps, and the most sensible tutoring format.'
    },
    {
      q: 'Can you support students preparing for major exams?',
      a: 'Yes. Exam-year support can include revision planning, topic prioritisation, technique work, and confidence building under timed conditions.'
    },
    {
      q: 'How are parents updated on progress?',
      a: 'Progress is reviewed regularly so families can see what is improving, what still needs work, and what the next learning focus should be.'
    }
  ]
};
