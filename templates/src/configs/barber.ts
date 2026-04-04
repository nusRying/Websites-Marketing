export const BarberConfig = {
  schemaType: "BarberShop",
  hero: {
    title: "Sharp Tradition In the Heart of {location}",
    subtitle: "Premium {niche} for the modern gentleman. Old-school technique meets contemporary style in {location}.",
    cta: "Claim Your Chair"
  },
  menu: [
    { name: "The Executive Cut", desc: "Precision scissor or clipper work finished with a straight-razor neck shave.",includes: ["Consultation","Precision shaping","Premium products"],price: "£35" },
    { name: "Beard Sculpt & Shape", desc: "Expert line-up and volume reduction tailored to your facial structure.",includes: ["Consultation","Precision shaping","Premium products"],price: "£20" },
    { name: "The {location} Ritual", desc: "Signature cut, hot towel shave, and scalp massage experience.",includes: ["Consultation","Precision shaping","Premium products"],price: "£55" },
    { name: "Express Line-Up", desc: "Quick tidy-up for those between full sessions in {location}.",includes: ["Consultation","Precision shaping","Premium products"],price: "£15" }
  ],
  footer: {
    title: "Join the Heritage",
    subtitle: "Serving the most discerning clients in {location}."
  },
  
  faqs: [
    { q: 'Do I need to book in advance?', a: 'Walk-ins are always welcome but we recommend booking during peak times (Fri/Sat) to guarantee your slot. Online booking is available 24/7.' },
    { q: 'What is included in the Heritage Ritual?', a: 'Our signature experience includes a precision cut, hot-towel neck shave, scalp massage and a styling consultation. Approximately 75 minutes.' },
    { q: 'What brands of products do you use?', a: 'We exclusively use premium brands including American Crew, Proraso and Reuzel, all available to purchase in-shop.' }
  ]
};