export const TitanConfig = {
  schemaType: 'ProfessionalService',
  hero: {
    title: 'Managed IT, cloud, and cyber support for businesses in {location}',
    subtitle:
      'For teams in {location} that need faster support, stronger security, and infrastructure that can keep up with growth, Titan provides day-to-day IT management plus the advisory layer behind it.',
    cta: 'Book a Discovery Call'
  },
  stats: [
    { val: '4.9/5', label: 'Average client rating' },
    { val: 'SLA-backed', label: 'Support and escalation coverage' },
    { val: 'Cloud + Security', label: 'Projects and ongoing management' },
    { val: 'Board-ready', label: 'Reporting and planning clarity' }
  ],
  promisesBar: [
    'Support, security, cloud, and backup are managed as one operating model',
    'Projects are scoped around uptime, risk, and operational priorities',
    'Clients get clear ownership, reporting, and practical next steps'
  ],
  services: [
    {
      title: 'Managed support desk',
      desc: 'Day-to-day support for users, devices, and core business systems with clearer escalation, ownership, and follow-through than a reactive break-fix model.',
      includes: [
        'Support triage and issue ownership',
        'User onboarding, offboarding, and device lifecycle support',
        'Escalation paths aligned to business impact'
      ]
    },
    {
      title: 'Cloud and infrastructure oversight',
      desc: 'A cleaner operating structure for Microsoft 365, shared access, device policy, backups, and the wider environment that keeps teams productive.',
      includes: [
        'Cloud tenancy review and clean-up planning',
        'Backup, continuity, and access policy oversight',
        'Infrastructure changes mapped to operational needs'
      ]
    },
    {
      title: 'Cyber security and resilience',
      desc: 'Practical security improvement covering identity, endpoint hygiene, permissions, monitoring, and the reporting leaders need to understand exposure.',
      includes: [
        'Baseline hardening and risk review',
        'Permissions, identity, and endpoint controls',
        'Security priorities translated into a clear roadmap'
      ]
    }
  ],
  plans: [
    {
      name: 'Managed Support Desk',
      price: 'From GBP 595 / month',
      idealFor:
        'Teams that need dependable support coverage, device management, and day-to-day issue ownership without building a full internal IT function.',
      features: [
        'Helpdesk coverage and escalation management',
        'User, laptop, and device support',
        'Monthly service review and action list'
      ]
    },
    {
      name: 'Growth Infrastructure Partner',
      price: 'Custom monthly scope',
      idealFor:
        'Best for businesses changing offices, scaling headcount, modernising cloud systems, or cleaning up inherited IT while maintaining support stability.',
      features: [
        'Retained support plus planned project delivery',
        'Cloud structure, permissions, and backup oversight',
        'Priority roadmap matched to business risk'
      ],
      featured: true,
      tag: 'Most requested'
    },
    {
      name: 'Security and Resilience Programme',
      price: 'Quarterly roadmap',
      idealFor:
        'For operations that need stronger cyber hygiene, cleaner backups, better identity control, and more confidence in how risk is being reduced over time.',
      features: [
        'Security review and remediation planning',
        'Access, device, and backup control improvement',
        'Regular reporting for leadership teams'
      ]
    }
  ],
  process: [
    {
      number: '01',
      title: 'Assess the estate and operating risk',
      desc: 'Review users, devices, cloud tools, security gaps, backup posture, and the points where downtime hurts the business most.'
    },
    {
      number: '02',
      title: 'Prioritise support and change work',
      desc: 'Separate urgent support needs from structural fixes, then agree the order of changes based on impact, exposure, and business pressure.'
    },
    {
      number: '03',
      title: 'Deliver, monitor, and report',
      desc: 'Move into retained support with ongoing project delivery, clearer documentation, and service reporting the client can actually use.'
    }
  ],
  footer: {
    title: 'Book an IT discovery call in {location}',
    subtitle:
      'Talk through support coverage, cloud projects, cyber priorities, or a wider infrastructure plan with Titan.'
  },
  faqs: [
    {
      q: 'Do you only handle support tickets, or can you also lead projects?',
      a: 'Both. Day-to-day support can sit alongside cloud migrations, Microsoft 365 clean-up, security hardening, onboarding process changes, and wider infrastructure work.'
    },
    {
      q: 'Can you work with an internal operations or IT contact?',
      a: 'Yes. Titan can operate as the main external partner or as a delivery and advisory layer alongside in-house operations, compliance, or technical staff.'
    },
    {
      q: 'How do you approach cyber security for smaller businesses?',
      a: 'The focus is usually on practical controls first: identity, endpoint posture, permissions, backup, user process, and reporting. The aim is to reduce risk clearly rather than overwhelm the client with tooling.'
    }
  ]
};
