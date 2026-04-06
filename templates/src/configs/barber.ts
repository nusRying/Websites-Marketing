export const BarberConfig = {
  schemaType: "BarberShop",
  hero: {
    title: "Sharp cuts and considered grooming in {location}",
    subtitle:
      "A modern barbershop for fades, scissor work, beard shaping, and hot-towel finishes with consistent standards, good conversation, and appointments that run on time.",
    cta: "Book Your Appointment"
  },
  stats: [
    { val: "4.9/5", label: "Average client rating" },
    { val: "45 Min", label: "Typical cut appointment" },
    { val: "6 Days", label: "Open each week" },
    { val: "15 Min", label: "Express tidy-up option" }
  ],
  services: [
    {
      title: "Precision Haircuts",
      desc: "Clean fades, sharp scissor work, and modern or classic cuts shaped around head shape, growth pattern, and how the client actually wears the hair.",
      includes: [
        "Consultation before the cut",
        "Clipper and scissor finishing",
        "Styling guidance after the service"
      ]
    },
    {
      title: "Beard Design and Maintenance",
      desc: "Line work, bulk reduction, shaping, and beard care that keeps the look intentional rather than overworked.",
      includes: [
        "Face-shape led beard work",
        "Detailing around the cheeks and neckline",
        "Advice on keeping the shape between visits"
      ]
    },
    {
      title: "Ritual Grooming Appointments",
      desc: "Longer services for clients who want the full barbershop experience with time for a hot towel, closer finish, and a more relaxed visit.",
      includes: [
        "Extended appointment slot",
        "Hot towel finish and detailing",
        "Premium products and finishing care"
      ]
    }
  ],
  menu: [
    {
      name: "Signature Cut",
      duration: "45 min",
      price: "From GBP 35",
      desc: "A full haircut appointment with consultation, precision finishing, and styling.",
      includes: ["Consultation", "Precision shaping", "Styling finish"]
    },
    {
      name: "Cut and Beard Detail",
      duration: "60 min",
      price: "From GBP 48",
      desc: "Haircut plus beard shaping for clients who want the full look balanced in one visit.",
      includes: ["Hair and beard balance", "Line-up and detail work", "Product finish"]
    },
    {
      name: "Hot Towel Ritual",
      duration: "75 min",
      price: "From GBP 58",
      desc: "A slower, premium service with haircut, hot towel, beard detail, and a more complete finish.",
      includes: ["Extended chair time", "Hot towel finish", "Premium grooming treatment"]
    },
    {
      name: "Express Clean-Up",
      duration: "15 min",
      price: "From GBP 18",
      desc: "A quick edge-up or in-between tidy for clients who want to stay sharp between full appointments.",
      includes: ["Fast outline refresh", "Neck and edges cleaned", "Ideal between cuts"]
    }
  ],
  process: [
    {
      number: "01",
      title: "Talk through the look",
      desc: "Each appointment starts with the cut, beard shape, or level of maintenance the client actually wants, not a rushed assumption."
    },
    {
      number: "02",
      title: "Cut with control",
      desc: "The barber works through the shape, blend, texture, and detail in the right order so the finish feels clean from every angle."
    },
    {
      number: "03",
      title: "Refine and finish",
      desc: "The final stage covers detailing, product choice, and what the client should ask for next time to keep the look consistent."
    }
  ],
  footer: {
    title: "A good barbershop should make booking feel easy and the result feel reliable",
    subtitle:
      "Book your next appointment in {location} for a sharper cut, better attention to detail, and a shop experience that feels properly dialled in."
  },
  faqs: [
    {
      q: "Do I need to book ahead or can I walk in?",
      a: "Walk-ins may be possible, but appointments are recommended if you want a specific time or a longer service such as a cut and beard or ritual appointment."
    },
    {
      q: "How long does a standard haircut take?",
      a: "Most standard haircut appointments take around 45 minutes. Longer appointments are available for beard work, restyles, and more detailed services."
    },
    {
      q: "Can you advise on what style will suit me?",
      a: "Yes. The service starts with a short consultation covering face shape, hair density, maintenance level, and the kind of finish the client wants."
    },
    {
      q: "Do you offer beard-only appointments?",
      a: "Yes. Beard shaping and maintenance can be booked on their own or added to a haircut appointment for a more complete grooming session."
    }
  ]
};
