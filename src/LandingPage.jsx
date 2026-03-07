import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Formspree form ID — create a form at formspree.io, set brendp51@gmail.com as recipient for testing, then replace with your form ID
const FORMSPREE_FORM_ID = "replace-me";

// ============================================================
// DESIGN TOKENS — edit these to restyle the entire site
// ============================================================
// Fonts: add to your index.html or global CSS:
// @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
//
// tailwind.config.js additions:
// fontFamily: { display: ['Bebas Neue', 'sans-serif'], body: ['DM Sans', 'sans-serif'] }
// colors: { brand: { dark: '#1A1A1A', charcoal: '#333333', mid: '#666666', accent: '#00AEEF', muted: '#666666', light: '#F8F8F8' } }

// ============================================================
// ANIMATION VARIANTS
// ============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

// ============================================================
// ANIMATED SECTION WRAPPER — reuse this everywhere
// ============================================================
function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// PLACEHOLDER IMAGE
// ============================================================
function PlaceholderImage({ className = "", label = "Image" }) {
  return (
    <div className={`bg-[#E5E5E5] flex items-center justify-center overflow-hidden rounded-xl ${className}`}>
      <div className="text-center">
        <div className="w-12 h-12 border border-[#999] rounded-full flex items-center justify-center mx-auto mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <p className="text-[#666] text-xs font-body tracking-widest uppercase">{label}</p>
      </div>
    </div>
  );
}

// ============================================================
// NAV
// ============================================================
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <a href="#" className="block">
            <img src="/logo.png" alt="Just Branding" className="h-11 object-contain" />
          </a>
        </motion.div>

        {/* Desktop nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center gap-10"
        >
          {["Exhibitions", "Signage", "Vehicles", "Merch", "Fabrication"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#1A1A1A] font-body text-sm tracking-wider hover:text-[#00AEEF] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="border border-[#1A1A1A] text-[#1A1A1A] font-body text-sm tracking-wider px-5 py-2 hover:bg-[#00AEEF] hover:text-white hover:border-[#00AEEF] transition-all duration-300"
          >
            Let's Talk
          </a>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#1A1A1A]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#E5E5E5] px-6 py-6 flex flex-col gap-5"
          >
            {["Exhibitions", "Signage", "Vehicles", "Merch", "Fabrication"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#1A1A1A] font-body text-lg tracking-wider hover:text-[#00AEEF]"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="border border-[#00AEEF] text-[#00AEEF] font-body text-sm tracking-widest px-5 py-3 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  return (
    <section className="relative min-h-screen bg-white flex items-end overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 overflow-hidden">
        <PlaceholderImage className="w-full h-full rounded-none" label="Hero — Full bleed brand/fabrication shot" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-[#00AEEF] origin-left"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-[#00AEEF] text-sm tracking-[0.3em] uppercase mb-6"
          >
            Signage & Branding — Cape Town
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(4rem,12vw,10rem)] leading-none text-[#1A1A1A] mb-8 tracking-wider"
          >
            YOUR BRAND<br />
            <span className="text-[#00AEEF]">DESERVES</span><br />
            TO BE SEEN.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body text-[#666] text-lg md:text-xl max-w-xl leading-relaxed mb-12"
          >
            From exhibition stands to vehicle wraps — we build the kind of presence that stops people in their tracks.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-[#00AEEF] text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#0099D4] transition-colors duration-300"
            >
              Let's build something
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-3 border border-[#1A1A1A] text-[#1A1A1A] font-body text-sm tracking-widest uppercase px-8 py-4 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors duration-300"
            >
              See our work
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[#666] text-xs tracking-widest uppercase rotate-90 origin-center">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-[#00AEEF] to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ============================================================
// SERVICES GRID — visual cards with icons
// ============================================================
const services = [
  {
    id: "exhibitions",
    label: "Exhibition & Event Branding",
    number: "01",
    tagline: "Own the room",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="8" y="20" width="32" height="20" rx="2" />
        <path d="M12 20V14a2 2 0 012-2h20a2 2 0 012 2v6" />
        <path d="M24 28v4" />
        <path d="M20 32h8" />
      </svg>
    ),
  },
  {
    id: "signage",
    label: "Signage & Site Branding",
    number: "02",
    tagline: "Make every wall work",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="6" y="14" width="36" height="24" rx="2" />
        <path d="M12 22h24" />
        <path d="M12 28h16" />
        <circle cx="18" cy="34" r="2" />
      </svg>
    ),
  },
  {
    id: "vehicles",
    label: "Vehicle Branding",
    number: "03",
    tagline: "Every drive is a billboard",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M8 28l4-12h24l4 12" />
        <path d="M8 28H6a2 2 0 01-2-2v-4a2 2 0 012-2h2" />
        <path d="M40 28h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2" />
        <path d="M8 32h32" />
        <circle cx="14" cy="36" r="3" />
        <circle cx="34" cy="36" r="3" />
      </svg>
    ),
  },
  {
    id: "merch",
    label: "Merchandise & Apparel",
    number: "04",
    tagline: "Wear it proud",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M16 12l8-4 8 4" />
        <path d="M24 8v32" />
        <path d="M16 12v24a2 2 0 002 2h12a2 2 0 002-2V12" />
        <path d="M8 20h4l2 8 2-8h4" />
      </svg>
    ),
  },
  {
    id: "fabrication",
    label: "Custom Fabrication",
    number: "05",
    tagline: "If you can picture it",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M14 38l-4-8 4-8" />
        <path d="M34 38l4-8-4-8" />
        <path d="M24 10v28" />
        <path d="M14 22h20" />
        <path d="M18 14l6-4 6 4" />
        <circle cx="24" cy="22" r="4" />
      </svg>
    ),
  },
];

function ServicesGrid() {
  return (
    <section id="services" className="bg-[#F8F8F8] border-t border-[#E5E5E5] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="font-body text-[#00AEEF] text-xs tracking-[0.3em] uppercase mb-4">What we do</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#1A1A1A] tracking-wider leading-none">
            BUILT TO<br />SHOW UP.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.08}>
              <a
                href={`#${service.id}`}
                className="group block bg-white border border-[#E5E5E5] rounded-xl p-8 hover:border-[#00AEEF]/30 hover:shadow-lg hover:shadow-[#00AEEF]/5 transition-all duration-300 overflow-hidden relative"
              >
                {/* Accent corner — red for visual interest */}
                <div className="absolute top-0 right-0 w-20 h-20 border-l-2 border-t-2 border-brand-red/30 rounded-tl-xl -translate-y-1 translate-x-1 group-hover:border-brand-red/50 transition-colors duration-300" />
                {/* Icon */}
                <div className="w-14 h-14 text-[#00AEEF] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <span className="font-body text-[#999] text-xs tracking-widest block mb-3">{service.number}</span>
                <h3 className="font-display text-[#1A1A1A] text-xl lg:text-2xl tracking-wider group-hover:text-[#00AEEF] transition-colors duration-300 leading-tight mb-2">
                  {service.label.toUpperCase()}
                </h3>
                <p className="font-body text-[#666] text-sm tracking-wider mb-6">
                  {service.tagline}
                </p>
                <span className="inline-flex items-center gap-2 font-body text-[#00AEEF] text-xs tracking-widest uppercase group-hover:gap-3 transition-all duration-300">
                  Learn more
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ALTERNATING SECTION COMPONENT
// ============================================================
function AlternatingSection({ id, number, eyebrow, headline, description, imageLabel, imageSrc, reverse = false, href, inverted = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} className={`${inverted ? "bg-[#F8F8F8]" : "bg-white"} border-t border-[#E5E5E5]`}>
      <div ref={ref} className={`max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-0 ${reverse ? "lg:flex-row-reverse" : ""}`}>

        {/* Image */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={reverse ? slideRight : slideLeft}
          className={`relative ${reverse ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="relative overflow-hidden aspect-[4/3] rounded-xl shadow-lg">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageLabel}
                className="w-full h-full object-cover"
              />
            ) : (
              <PlaceholderImage
                className="w-full h-full"
                label={imageLabel}
              />
            )}
            {/* Hover scale overlay */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            />
          </div>
          {/* Accent corner — Just Branding red */}
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-brand-red rounded-br-xl" />
        </motion.div>

        {/* Copy */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={reverse ? slideLeft : slideRight}
          className={`flex flex-col justify-center ${reverse ? "lg:order-1 lg:pr-16" : "lg:order-2 lg:pl-16"} pt-12 lg:pt-0`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-body text-[#999] text-xs tracking-widest">{number}</span>
            <div className="h-px flex-1 bg-[#E5E5E5]" />
            <span className="font-body text-[#00AEEF] text-xs tracking-[0.2em] uppercase">{eyebrow}</span>
          </div>

          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#1A1A1A] leading-none tracking-wider mb-6">
            {headline.toUpperCase()}
          </h2>

          <p className="font-body text-[#666] text-base leading-relaxed mb-10 max-w-md">
            {description}
          </p>

          <a
            href={href}
            className="group inline-flex items-center gap-3 text-[#1A1A1A] font-body text-sm tracking-widest uppercase border-b border-[#999] pb-2 w-fit hover:border-[#00AEEF] hover:text-[#00AEEF] transition-all duration-300"
          >
            Read more
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SOCIAL PROOF
// ============================================================
function SocialProof() {
  const logos = ["Client One", "Client Two", "Client Three", "Client Four", "Client Five"];

  return (
    <section className="bg-white border-t border-[#E5E5E5] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <p className="font-body text-[#666] text-xs tracking-[0.3em] uppercase text-center mb-12">
            Trusted by brands that take showing up seriously
          </p>
        </AnimatedSection>

        {/* Logo strip */}
        <AnimatedSection>
          <div className="flex flex-wrap items-center justify-center gap-12 mb-20">
            {logos.map((logo) => (
              <div key={logo} className="font-display text-[#999] text-xl tracking-widest hover:text-[#666] transition-colors duration-300">
                {logo.toUpperCase()}
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Feature callout */}
        <AnimatedSection>
          <div className="border border-[#E5E5E5] bg-white p-12 md:p-16 relative overflow-hidden rounded-2xl shadow-sm">
            <div className="absolute top-0 left-0 w-24 h-px bg-brand-red rounded-tl-2xl" />
            <div className="absolute top-0 left-0 w-px h-24 bg-brand-red rounded-tl-2xl" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-body text-[#00AEEF] text-xs tracking-[0.3em] uppercase mb-4">Project spotlight</p>
                <h3 className="font-display text-4xl md:text-5xl text-[#1A1A1A] tracking-wider leading-none mb-6">
                  KILLARNEY<br />INTERNATIONAL<br />RACEWAY
                </h3>
                <p className="font-body text-[#666] leading-relaxed">
                  When the energy of race day demands a brand presence to match, there's no room for ordinary. We delivered a full branding installation that held its own against the spectacle.
                </p>
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <PlaceholderImage
                  className="aspect-video w-full"
                  label="Killarney Raceway project shot"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============================================================
// HOW IT WORKS
// ============================================================
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Tell us what you need",
      description: "Share your project, your deadline, and your vision. No briefs too big or too scrappy.",
    },
    {
      number: "02",
      title: "We get to work",
      description: "Design, fabricate, print — everything handled in-house, so nothing gets lost in translation.",
    },
    {
      number: "03",
      title: "Show up ready",
      description: "Delivered, installed, and built to impress. You just have to arrive.",
    },
  ];

  return (
    <section id="process" className="bg-[#F8F8F8] border-t border-[#E5E5E5] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="mb-16">
          <p className="font-body text-[#00AEEF] text-xs tracking-[0.3em] uppercase mb-4">The process</p>
          <h2 className="font-display text-[clamp(3rem,6vw,5rem)] text-[#1A1A1A] tracking-wider leading-none">
            GETTING STARTED<br />IS THE EASY PART.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-[#E5E5E5]">
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.15}>
              <div className="border-r border-b border-[#E5E5E5] p-10 h-full">
                <span className="font-display text-[#00AEEF] text-6xl opacity-30 block mb-8">{step.number}</span>
                <h3 className="font-display text-2xl text-[#1A1A1A] tracking-wider mb-4">{step.title.toUpperCase()}</h3>
                <p className="font-body text-[#666] leading-relaxed">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] font-body text-sm tracking-widest uppercase px-8 py-4 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-all duration-300"
          >
            Start your project
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT STRIP
// ============================================================
function About() {
  return (
    <section id="about" className="bg-[#F8F8F8] border-t border-[#E5E5E5] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <AnimatedSection>
            <p className="font-body text-[#00AEEF] text-xs tracking-[0.3em] uppercase mb-6">Who we are</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[#1A1A1A] tracking-wider leading-none mb-8">
              WORKSHOP-BUILT.<br />OWNER-RUN.<br />
              <span className="text-[#999]">CAPE TOWN PROUD.</span>
            </h2>
            <p className="font-body text-[#666] text-base leading-relaxed mb-8 max-w-lg">
              Just Branding is Neal, Melissa, and a team that genuinely cares about the work. Based in Killarney Gardens, we've been quietly building some of Cape Town's most recognisable brand presences — exhibitions, sites, vehicles, and everything in between.
            </p>
            <p className="font-body text-[#666] text-base leading-relaxed max-w-lg">
              No account managers. No middlemen. Just the people who actually make your stuff, from the first conversation to the final install.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="overflow-hidden rounded-xl shadow-lg aspect-[4/3] relative">
                <iframe
                  title="Just Branding — 79 Kyalami Drive, Killarney Gardens"
                  src="https://www.google.com/maps?q=79+Kyalami+Drive,+Killarney+Gardens,+7441,+South+Africa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Accent corner — Just Branding red */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-brand-red rounded-tl-xl" />
              <div className="absolute -bottom-4 -right-4 bg-brand-red text-white font-body text-xs tracking-widest uppercase px-4 py-2 rounded-bl-lg">
                Killarney Gardens, Cape Town
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA CLOSER + CONTACT FORM
// ============================================================
function CTACloser() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError("Something went wrong. Please try again or email neal@justbranding.co.za.");
      }
    } catch {
      setError("Something went wrong. Please try again or email neal@justbranding.co.za.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white border-t border-[#E5E5E5] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left — copy */}
          <AnimatedSection>
            <p className="font-body text-[#00AEEF] text-xs tracking-[0.3em] uppercase mb-6">Get in touch</p>
            <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] text-[#1A1A1A] tracking-wider leading-none mb-8">
              READY TO SHOW UP<br />
              <span className="text-[#00AEEF]">LIKE YOU</span><br />
              MEAN IT?
            </h2>
            <p className="font-body text-[#666] text-base leading-relaxed mb-12 max-w-md">
              Whether you've got a full brief or just an idea scrawled on a napkin, we'd love to hear about your project.
            </p>

            <div className="space-y-4">
              <a href="tel:0215562501" className="flex items-center gap-4 text-[#666] hover:text-[#1A1A1A] transition-colors duration-300 font-body text-sm tracking-wider">
                <span className="text-[#00AEEF] shrink-0" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                021 556 2501
              </a>
              <a href="mailto:neal@justbranding.co.za" className="flex items-center gap-4 text-[#666] hover:text-[#1A1A1A] transition-colors duration-300 font-body text-sm tracking-wider">
                <span className="text-[#00AEEF] shrink-0" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                neal@justbranding.co.za
              </a>
              <a href="https://www.google.com/maps/search/79+Kyalami+Drive,+Killarney+Gardens,+7441" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#666] hover:text-[#1A1A1A] transition-colors duration-300 font-body text-sm tracking-wider">
                <span className="text-[#00AEEF] shrink-0" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                79 Kyalami Drive, Killarney Gardens, 7441
              </a>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection delay={0.2}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {[
                    { key: "name", label: "Your name", type: "text" },
                    { key: "email", label: "Email address", type: "email" },
                    { key: "phone", label: "Phone (optional)", type: "tel" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="font-body text-[#666] text-xs tracking-widest uppercase block mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.key}
                        value={formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full bg-[#F5F5F5] border border-[#E5E5E5] text-[#1A1A1A] font-body text-sm px-4 py-3 focus:outline-none focus:border-[#00AEEF] transition-colors duration-300 placeholder-[#999]"
                        placeholder={field.label}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-body text-[#666] text-xs tracking-widest uppercase block mb-2">
                      What do you need?
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-[#F5F5F5] border border-[#E5E5E5] text-[#1A1A1A] font-body text-sm px-4 py-3 focus:outline-none focus:border-[#00AEEF] transition-colors duration-300 placeholder-[#999] resize-none"
                      placeholder="Tell us about your project, deadline, and vision..."
                    />
                  </div>

                  {error && (
                    <p className="font-body text-brand-red text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full bg-[#00AEEF] text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#0099D4] disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-3"
                  >
                    {submitting ? "Sending..." : "Send it through"}
                    {!submitting && <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-[#00AEEF] bg-[#F8F8F8] p-12 text-center"
                >
                  <div className="w-12 h-12 border border-[#00AEEF] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-[#00AEEF]">✓</span>
                  </div>
                  <h3 className="font-display text-3xl text-[#1A1A1A] tracking-wider mb-4">WE'VE GOT IT.</h3>
                  <p className="font-body text-[#666] leading-relaxed">
                    Neal or Melissa will be in touch shortly. Expect a real reply, not an auto-response.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/JustBranding",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/just_branding_official/?hl=en",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#00AEEF] border-t border-[#0099D4]">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left block — logo, tagline, socials, address */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="block">
              <img src="/logo.png" alt="Just Branding" className="h-16 lg:h-20 object-contain" />
            </a>
            <p className="font-body text-white/90 text-sm tracking-wider">
              Signage & Branding — Cape Town
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a
              href="https://www.google.com/maps/search/79+Kyalami+Drive,+Killarney+Gardens,+7441"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-white/90 hover:text-white transition-colors duration-300 font-body text-sm tracking-wider max-w-xs"
            >
              <span className="text-white shrink-0 mt-0.5" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              79 Kyalami Drive, Killarney Gardens, 7441
            </a>
          </div>

          {/* Right block — link columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16">
            {/* Services column */}
            <div>
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-white/70 mb-6">Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <a
                      href={`#${service.id}`}
                      className="font-body text-sm text-white/90 hover:text-white transition-colors duration-300"
                    >
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Company column */}
            <div>
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-white/70 mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="font-body text-sm text-white/90 hover:text-white transition-colors duration-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#process" className="font-body text-sm text-white/90 hover:text-white transition-colors duration-300">
                    The Process
                  </a>
                </li>
                <li>
                  <a href="#contact" className="font-body text-sm text-white/90 hover:text-white transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-body text-white/80 text-xs tracking-wider">
            © {new Date().getFullYear()} Just Branding. Killarney Gardens, Cape Town.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN LANDING PAGE COMPONENT
// ============================================================
export default function LandingPage() {
  const alternatingSections = [
    {
      id: "exhibitions",
      number: "01",
      eyebrow: "Exhibition & Events",
      headline: "Launch your exhibition\nlike you own the room.",
      description:
        "You've got one shot on the floor. While everyone else blends into the background, your stand should be the one people stop, photograph, and remember. We build exhibition experiences that turn heads before you've said a single word.",
      imageLabel: "Exhibition stand — hero shot",
      imageSrc: "/exhibition.png",
      reverse: false,
      href: "/exhibitions",
    },
    {
      id: "signage",
      number: "02",
      eyebrow: "Signage & Site Branding",
      headline: "Make every wall, window,\nand doorway work for you.",
      description:
        "Your space is speaking to people whether you like it or not. Bad signage says 'we'll do.' Great signage says 'we mean business.' We turn your site into a brand statement — one that builds trust before anyone walks through the door.",
      imageLabel: "Site signage — shopfront or office",
      imageSrc: "/signage.png",
      reverse: true,
      href: "/signage",
    },
    {
      id: "vehicles",
      number: "03",
      eyebrow: "Vehicle Branding",
      headline: "Every drive is a billboard\nyou've already paid for.",
      description:
        "Your fleet is on the road every single day. That's thousands of impressions your competitors aren't getting. We wrap your vehicles in branding that's sharp, durable, and impossible to ignore.",
      imageLabel: "Vehicle wrap — bakkie or fleet",
      imageSrc: "/vehicles.png",
      reverse: false,
      href: "/vehicles",
    },
    {
      id: "merch",
      number: "04",
      eyebrow: "Merchandise & Apparel",
      headline: "Give your brand something\npeople actually want to wear.",
      description:
        "Great merch doesn't sit in a drawer. It walks into rooms, starts conversations, and keeps working long after the event is over. We produce apparel and merchandise worth putting your name on.",
      imageLabel: "Branded apparel — lifestyle shot",
      imageSrc: "/apparel.png",
      reverse: true,
      href: "/merch",
    },
    {
      id: "fabrication",
      number: "05",
      eyebrow: "Custom Fabrication",
      headline: "If you can picture it,\nwe can build it.",
      description:
        "Some ideas don't fit a template. That's exactly where we thrive. From custom-built stands to one-of-a-kind brand installations, we take the thing in your head and make it real — no compromises.",
      imageLabel: "Workshop fabrication shot",
      imageSrc: "/fabrication.png",
      reverse: false,
      href: "/fabrication",
    },
  ];

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F5F5F5; }
        ::-webkit-scrollbar-thumb { background: #00AEEF; }
      `}</style>

      <Nav />
      <Hero />
      <ServicesGrid />

      {alternatingSections.map((section, i) => (
        <AlternatingSection key={section.id} {...section} inverted={i % 2 === 1} />
      ))}
      <SocialProof />
      <HowItWorks />
      <About />
      <CTACloser />
      <Footer />
    </div>
  );
}
