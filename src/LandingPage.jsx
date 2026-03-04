import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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
    <div className={`bg-[#E5E5E5] flex items-center justify-center overflow-hidden ${className}`}>
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
            <img src="/logo.png" alt="Just Branding" className="h-8 object-contain" />
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
      <div className="absolute inset-0">
        <PlaceholderImage className="w-full h-full" label="Hero — Full bleed brand/fabrication shot" />
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
// SERVICES GRID — titles only
// ============================================================
const services = [
  { id: "exhibitions", label: "Exhibition & Event Branding", number: "01" },
  { id: "signage", label: "Signage & Site Branding", number: "02" },
  { id: "vehicles", label: "Vehicle Branding", number: "03" },
  { id: "merch", label: "Merchandise & Apparel", number: "04" },
  { id: "fabrication", label: "Custom Fabrication", number: "05" },
];

function ServicesGrid() {
  return (
    <section id="services" className="bg-white border-t border-[#E5E5E5] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <p className="font-body text-[#00AEEF] text-xs tracking-[0.3em] uppercase mb-12">What we do</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-5 border-l border-[#E5E5E5]">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.08}>
              <a
                href={`#${service.id}`}
                className="group block border-r border-b border-[#E5E5E5] p-8 hover:bg-[#F8F8F8] transition-colors duration-300"
              >
                <span className="font-body text-[#999] text-xs tracking-widest block mb-6">{service.number}</span>
                <span className="font-display text-[#1A1A1A] text-xl tracking-wider group-hover:text-[#00AEEF] transition-colors duration-300 leading-tight">
                  {service.label.toUpperCase()}
                </span>
                <span className="block mt-6 text-[#999] group-hover:text-[#00AEEF] transition-colors duration-300">→</span>
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
function AlternatingSection({ id, number, eyebrow, headline, description, imageLabel, reverse = false, href }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} className="bg-white border-t border-[#E5E5E5]">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-0 ${reverse ? "lg:flex-row-reverse" : ""}`}>

        {/* Image */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={reverse ? slideRight : slideLeft}
          className={`relative ${reverse ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="relative overflow-hidden aspect-[4/3]">
            <PlaceholderImage
              className="w-full h-full"
              label={imageLabel}
            />
            {/* Hover scale overlay */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            />
          </div>
          {/* Accent corner */}
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-[#00AEEF] opacity-40" />
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
    <section className="bg-[#F8F8F8] border-t border-[#E5E5E5] py-20">
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
          <div className="border border-[#E5E5E5] bg-white p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-px bg-[#00AEEF]" />
            <div className="absolute top-0 left-0 w-px h-24 bg-[#00AEEF]" />

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
              <PlaceholderImage
                className="aspect-video w-full"
                label="Killarney Raceway project shot"
              />
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
    <section className="bg-white border-t border-[#E5E5E5] py-24">
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
    <section className="bg-[#F8F8F8] border-t border-[#E5E5E5] py-24">
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
              <PlaceholderImage
                className="w-full aspect-[4/3]"
                label="Neal & Melissa / workshop shot"
              />
              {/* Accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[#00AEEF] opacity-40" />
              <div className="absolute -bottom-4 -right-4 bg-[#00AEEF] text-white font-body text-xs tracking-widest uppercase px-4 py-2">
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

  const handleSubmit = () => {
    // Wire to Formspree or Web3Forms — replace action URL
    // For now just shows success state
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
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
                <span className="text-[#00AEEF]">→</span> 021 556 2501
              </a>
              <a href="mailto:neal@justbranding.co.za" className="flex items-center gap-4 text-[#666] hover:text-[#1A1A1A] transition-colors duration-300 font-body text-sm tracking-wider">
                <span className="text-[#00AEEF]">→</span> neal@justbranding.co.za
              </a>
              <p className="flex items-center gap-4 text-[#666] font-body text-sm tracking-wider">
                <span className="text-[#00AEEF]">→</span> 79 Kyalami Drive, Killarney Gardens, 7441
              </p>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection delay={0.2}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-[#F5F5F5] border border-[#E5E5E5] text-[#1A1A1A] font-body text-sm px-4 py-3 focus:outline-none focus:border-[#00AEEF] transition-colors duration-300 placeholder-[#999] resize-none"
                      placeholder="Tell us about your project, deadline, and vision..."
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="group w-full bg-[#00AEEF] text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#0099D4] transition-colors duration-300 flex items-center justify-center gap-3"
                  >
                    Send it through
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </motion.div>
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
  return (
    <footer className="bg-[#F5F5F5] border-t border-[#E5E5E5] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="block">
          <img src="/logo.png" alt="Just Branding" className="h-6 object-contain opacity-70" />
        </a>
        <p className="font-body text-[#666] text-xs tracking-wider">
          © {new Date().getFullYear()} Just Branding. Killarney Gardens, Cape Town.
        </p>
        <div className="flex gap-6">
          {["Facebook", "Instagram"].map((social) => (
            <a
              key={social}
              href="#"
              className="font-body text-[#666] text-xs tracking-widest uppercase hover:text-[#00AEEF] transition-colors duration-300"
            >
              {social}
            </a>
          ))}
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

      {alternatingSections.map((section) => (
        <AlternatingSection key={section.id} {...section} />
      ))}

      <SocialProof />
      <HowItWorks />
      <About />
      <CTACloser />
      <Footer />
    </div>
  );
}
