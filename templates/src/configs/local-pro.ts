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
  }
};
