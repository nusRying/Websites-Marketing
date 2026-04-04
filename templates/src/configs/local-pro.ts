export const LocalProConfig = {
  schemaType: "LocalBusiness",
  hero: {
    badge: "Proudly Serving {location}",
    title: "Premium {niche} Right in Your Neighborhood",
    subtitle: "Friendly, reliable, and five-star rated. We treat every home in {location} with the utmost care and professionalism.",
    cta: "Check Availability"
  },
  pricing: [
    { level: "Essentials", price: "£35", features: ["Basic {niche} kit", "Local area coverage", "100% Satisfaction"], popular: false },
    { level: "Premium Pro", price: "£65", features: ["Deep {niche} service", "Priority slot booking", "Extended local support", "Premium materials"], popular: true },
    { level: "Ultimate Care", price: "£110", features: ["Full VIP treatment", "Same-day guarantee", "Monthly maintenance", "Dedicated contact"], popular: false }
  ],
  footer: {
    title: "Small Business, Big Heart",
    subtitle: "Thank you for supporting a local {niche} expert in {location}."
  },
  
  faqs: [
    { q: 'How do I get started?', a: 'Getting started is simple. Just contact us to arrange a free initial consultation where we will assess your needs and provide a tailored plan.' },
    { q: 'Do you offer a satisfaction guarantee?', a: 'Yes, we pride ourselves on exceptional service. If you are not fully satisfied with our work, we will make it right at no extra cost.' },
    { q: 'What areas do you cover?', a: 'We serve clients across the local and surrounding regions. Please contact us to confirm if we can assist at your specific location.' }
  ]
};