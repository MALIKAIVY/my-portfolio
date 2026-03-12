"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Cloud,
  CloudCog,
  ExternalLink,
  Github,
  Layout,
  Linkedin,
  Loader2,
  LucideIcon,
  Mail,
  Menu,
  Monitor,
  Send,
  Server,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  SiAmazon,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOracle,
  SiReact,
  SiWeb3Dotjs,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  image: string;
  liveLink?: string;
  codeLink?: string;
}

interface Skill {
  name: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    color?: string;
  }>;
  color: string; // brand color for the icon
}

interface Certification {
  name: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    color?: string;
  }>;
  color: string; // brand color for the icon
}

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  color: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set(),
  );
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const SECTION_ORDER = [
    "home",
    "services",
    "about",
    "skills",
    "projects",
    "testimonials",
    "contact",
  ] as const;
  const SECTION_LABELS: Record<(typeof SECTION_ORDER)[number], string> = {
    home: "Home",
    services: "Services",
    about: "About",
    skills: "Skills & Certifications",
    projects: "Projects",
    testimonials: "Testimonials",
    contact: "Contact",
  };
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate random particle properties once using useState with lazy initializer
  // Only generate on client to avoid hydration mismatch
  const [particles] = useState(() => {
    if (typeof window === "undefined") return [];
    return [...Array(40)].map(() => ({
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      colorChoice: Math.random() > 0.5,
      opacity: Math.random() * 0.3 + 0.2,
      floatDuration: 5 + Math.random() * 10,
      twinkleDuration: 2 + Math.random() * 3,
      animationDelay: Math.random() * 5,
    }));
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      // Determine active section (last section in order that contains viewport top)
      for (const key of SECTION_ORDER) {
        const section = sectionsRef.current[key];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) setActiveSection(key);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects: Project[] = [
    {
      title: "Payment Gateway",
      description: "Payment Gateway for online transactions",
      tech: [
        "Next.js",
        "Stripe",
        "Crypto.js",
        "Node.js",
        "TailwindCSS",
        "react",
        "typescript",
      ],
      gradient: "from-purple-500 via-pink-500 to-red-500",
      image: "/payment-gateway app.png",
      liveLink: "https://sqp-clt.vercel.app/",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack marketplace with real-time inventory and payment processing",
      tech: [
        "Next.js",
        "Stripe",
        "Node.js",
        "Express.js",
        "TailwindCSS",
        "react",
        "typescript",
      ],
      gradient: "from-orange-500 via-red-500 to-pink-500",
      image: "/redbead.png",
      liveLink: "https://rbd-clt-sooty.vercel.app/",
    },
    {
      title: "Admin Portal",
      description: "Admin Portal for managing a chama platform",
      tech: ["React", "Next.js", "Tailwind", "typescript"],
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      image: "/qundi-screenshot.png",
    },
    {
      title: "E-learning Platform",
      description: "E-learning Platform for online tourism courses",
      tech: ["Prisma", "PostgreSQL", "TailwindCSS", "react", "typescript"],
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      image: "✅",
    },
    {
      title: "Weather App",
      description: "Beautiful weather forecasts with maps and location alerts",
      tech: ["React", "API", "Leaflet"],
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      image: "🌤️",
    },
  ];

  const skills: Skill[] = [
    { name: "React", icon: SiReact, color: "#61DAFB" }, // React blue
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" }, // Next.js white
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" }, // Node.js green
    { name: "Cloud", icon: SiAmazon, color: "#FF9900" }, // AWS orange
    { name: "Web3", icon: SiWeb3Dotjs, color: "#F16822" }, // Web3 orange
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" }, // MongoDB green
  ];

  const certifications: Certification[] = [
    { name: "Oracle GenAI", icon: SiOracle, color: "#F80000" }, // Oracle red
    { name: "Microsoft Azure AI in Cloud", icon: CloudCog, color: "#0078D4" }, // Azure blue (using CloudCog from lucide)
    { name: "Fundamentals of Cloud Computing", icon: Cloud, color: "#60A5FA" }, // Cloud blue (using lucide icon)
  ];

  const services: Service[] = [
    {
      title: "Web Development",
      description:
        "Full-stack web applications with modern frameworks like Next.js and React.",
      icon: Monitor,
    },
    {
      title: "API & Backend",
      description:
        "RESTful APIs, databases, and server-side logic with Node.js and cloud services.",
      icon: Server,
    },
    {
      title: "UI/UX Implementation",
      description:
        "Responsive, accessible interfaces that match your design and brand.",
      icon: Layout,
    },
  ];

  const testimonials: Testimonial[] = [
    {
      quote:
        "Ivy delivered a robust payment gateway on time. Professional and easy to work with.",
      name: "Hamilton Mwaila",
      role: "Product Manager",
    },
    {
      quote:
        "Clean code, clear communication, and great problem-solving. Highly recommend.",
      name: "Hazel Oketch",
      role: "Startup Founder",
    },
  ];

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      label: "Email",
      value: "ayukoivy03@gmail.com",
      href: "mailto:ayukoivy03@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@MALIKAIVY",
      href: "https://github.com/MALIKAIVY",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "@ivy-ayuko",
      href: "https://www.linkedin.com/in/ivy-ayuko",
      color: "from-blue-600 to-blue-400",
    },
  ];

  return (
    <div className="bg-[#FAFAF9] text-[#1a1a1a] min-h-screen relative overflow-hidden">
      {/* Progress Bar - accent color */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-[#14532d]/30 z-50">
        <div
          className="h-full bg-[#f59e0b] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Background - clean light */}
      <div
        className="fixed inset-0 pointer-events-none bg-[#FAFAF9]"
        aria-hidden
      />

      {/* Navigation - dark green header like inspo */}
      <nav className="fixed top-4 left-12 right-12 z-40 bg-[#14532d] rounded-full shadow-lg transition-all duration-300 md:left-24 md:right-24 lg:left-32 lg:right-32 xl:left-48 xl:right-48">
        <div className="container mx-auto pl-4 pr-6 py-2 flex justify-between items-center">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-white font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <span className="w-7 h-7 rounded-full bg-[#f59e0b] flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md">
              I
            </span>
            <span>Ivy Malika.</span>
          </button>

          <div className="hidden md:flex gap-6 lg:gap-8">
            {SECTION_ORDER.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative transition-all duration-300 font-medium text-white hover:opacity-90 ${
                  activeSection === section ? "" : "opacity-90"
                }`}
              >
                {SECTION_LABELS[section]}
                {activeSection === section && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f59e0b] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-5 py-2 rounded-full bg-white text-[#14532d] font-semibold border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300"
            >
              Contact Me
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:opacity-90 transition-opacity"
          >
            <div
              className={`transition-transform duration-300 ${menuOpen ? "rotate-90" : ""}`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu - dark green overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#14532d] md:hidden transition-all duration-700 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {SECTION_ORDER.map((section, idx) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-2xl font-medium transition-all text-white ${
                activeSection === section
                  ? "underline decoration-[#f59e0b] underline-offset-4"
                  : "opacity-90"
              }`}
              style={{
                animation: menuOpen
                  ? `slideInFromLeft 0.6s ease-out ${idx * 0.1}s both`
                  : "none",
              }}
            >
              {SECTION_LABELS[section]}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("contact")}
            className="px-6 py-3 rounded-full bg-white text-[#14532d] font-semibold mt-4"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Home Section */}
      <section
        ref={(el) => {
          sectionsRef.current["home"] = el;
        }}
        id="home"
        className="min-h-screen flex flex-col relative pt-[72px] overflow-hidden"
      >
        {/* Hero content */}
        <div className="bg-white relative flex-1 pb-20 md:pb-0">
          <div className="container mx-auto w-full grid md:grid-cols-2 gap-12 items-center px-6 py-8 md:py-12 z-10">
            {/* Left - greeting, headline, description, CTAs */}
            <div className="text-left">
              {/* Hello There! - outlined box with corner markers */}
              <div
                className="inline-block mb-6 relative px-4 py-2 border-2 border-[#f59e0b] rounded"
                data-animate="true"
                id="home-hello"
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#f59e0b]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#f59e0b]" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#f59e0b]" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#f59e0b]" />
                <span className="text-[#1a1a1a] font-semibold text-lg">
                  Hello There!
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight mb-2"
                data-animate="true"
                id="home-title"
              >
                I&apos;m{" "}
                <span className="text-[#f59e0b] border-b-4 border-[#f59e0b] pb-1">
                  Ivy Malika
                </span>
                ,
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2">
                Full Stack Developer
              </p>
              <p className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-6">
                Based in Kenya.
              </p>

              <p
                className="text-base md:text-lg text-neutral-600 mb-8 max-w-xl leading-relaxed"
                data-animate="true"
                id="home-description"
              >
                I&apos;m a software engineer passionate about full-stack
                development, creating beautiful web experiences, and building
                applications that make a difference.
              </p>

              {/* CTAs - Hire Me (outline) */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3.5 border-2 border-[#1a1a1a] rounded-full font-semibold text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
                >
                  Hire Me
                </button>
              </div>
            </div>

            {/* Right - image, decorative shape behind, skill tags, Hire Me badge */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Filled colored blob shapes behind the image */}
                <div
                  className="absolute inset-0 z-0 pointer-events-none overflow-visible"
                  aria-hidden
                >
                  {/* Amber blob - large, behind shoulder */}
                  <div className="absolute -top-4 -right-8 w-64 h-64 md:w-80 md:h-80 rounded-[60%_40%_50%_50%] bg-[#f59e0b]/40 blur-[1px] rotate-12" />
                  <div className="absolute top-1/4 -right-4 w-48 h-48 md:w-56 md:h-56 rounded-[40%_60%_60%_40%] bg-[#f59e0b]/30 -rotate-12" />
                  {/* Dark green blob */}
                  <div className="absolute -bottom-4 -left-4 w-40 h-40 md:w-52 md:h-52 rounded-[50%_50%_40%_60%] bg-[#14532d]/25 rotate-[-20deg]" />
                  <div className="absolute top-1/2 -left-8 w-32 h-32 rounded-[60%_40%_50%_50%] bg-[#14532d]/20 -rotate-6" />
                </div>
                {/* Photo - same image as About section */}
                <div className="absolute inset-0 flex items-center justify-center z-10 min-h-[280px] md:min-h-[340px] translate-y-0 md:translate-y-16">
                  <div className="relative flex items-end justify-center max-w-[280px] md:max-w-[340px] lg:max-w-[400px] max-h-[75vh] w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/about.png"
                      alt="Ivy Malika"
                      className="w-full h-auto max-h-[75vh] object-contain object-bottom"
                      onError={(e) => {
                        const el = e.currentTarget;
                        if (el.src.includes("/about.png")) {
                          el.src = "/hero.png";
                          el.onerror = () => {
                            el.src = "/logo-picture.jpeg";
                            el.onerror = null;
                          };
                        } else if (el.src.includes("/hero.png")) {
                          el.src = "/logo-picture.jpeg";
                          el.onerror = null;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom accent strip - tapered to nothing */}
      <div className="w-full relative z-10 h-8" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}>
        <div className="w-full h-full bg-[#f59e0b]" />
      </div>

      {/* Services Section - white background; cards use accent */}
      <section
        ref={(el) => {
          sectionsRef.current["services"] = el;
        }}
        id="services"
        className="px-6 pt-12 pb-20 relative bg-white"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-neutral-200" />
        <div className="container mx-auto">
          <h2
            className="text-4xl md:text-5xl font-semibold mb-4 text-center text-[#1a1a1a]"
            data-animate="true"
            id="services-title"
          >
            Services
          </h2>
          <p className="text-lg text-neutral-500 text-center mb-14 max-w-2xl mx-auto">
            What I offer to bring your ideas to life
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-[#F5F5F5] border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-[#14532d]/40 transition-all duration-300"
                  data-animate="true"
                  id={`service-${idx}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#14532d] text-[#f59e0b] flex items-center justify-center mb-6">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200" />
      </section>

      {/* About Section - inspo: dark green bg, left = circular photo + skill tags, right = heading, bio, stats, Download CV, signature */}
      <section
        ref={(el) => {
          sectionsRef.current["about"] = el;
        }}
        id="about"
        className="flex items-center justify-center px-6 pt-20 pb-12 md:pt-24 md:pb-16 relative bg-[#14532d] overflow-visible"
      >
        <div className="container mx-auto w-full relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - circle with image; head can span above circle */}
            <div className="relative flex justify-center lg:justify-start order-2 lg:order-1 -translate-y-8 md:-translate-y-12 overflow-visible">
              <div className="relative w-72 h-72 md:w-96 md:h-96 max-w-full overflow-visible">
                {/* Amber circle – behind */}
                <div
                  className="absolute inset-0 rounded-full bg-[#f59e0b] z-0"
                  aria-hidden
                />
                {/* Image – taller container so head can extend above circle */}
                <div className="absolute bottom-0 left-0 right-0 h-[125%] z-10 overflow-visible">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/about.png"
                    alt="Ivy Malika"
                    className="w-full h-full object-cover object-[65%_58%] rounded-full"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (el.src.includes("/about.png")) {
                        el.src = "/hero.png";
                        el.onerror = () => {
                          el.src = "/logo-picture.jpeg";
                          el.onerror = null;
                        };
                      } else if (el.src.includes("/hero.png")) {
                        el.src = "/logo-picture.jpeg";
                        el.onerror = null;
                      }
                    }}
                  />
                </div>
                {/* Skill tags - mix of amber and dark green pills around the circle */}
                {[
                  { label: "UX/UI Design", amber: true },
                  { label: "Website Design", amber: true },
                  { label: "Mobile App Design", amber: false },
                  { label: "Design System", amber: false },
                  { label: "Prototype", amber: false },
                  { label: "Dashboard", amber: false },
                  { label: "Wireframe Design", amber: false },
                ].map((tag, i) => {
                  const positions = [
                    "absolute -bottom-2 right-8",
                    "absolute bottom-8 -right-2",
                    "absolute top-1/4 -right-4",
                    "absolute -top-2 left-1/2 -translate-x-1/2",
                    "absolute top-1/4 -left-4",
                    "absolute bottom-8 -left-2",
                    "absolute -bottom-2 left-8",
                  ];
                  return (
                    <span
                      key={i}
                      className={`${positions[i]} z-20 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                        tag.amber
                          ? "bg-[#f59e0b] text-[#1a1a1a]"
                          : "bg-[#14532d] border border-[#f59e0b]/50 text-white"
                      }`}
                    >
                      {tag.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Right - About Me label, heading, bio, stats, Download CV, signature */}
            <div className="order-1 lg:order-2 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-0.5 bg-[#f59e0b] rounded" />
                <span className="text-sm font-medium uppercase tracking-widest text-white/90">
                  About Me
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white transition-all duration-1000"
                data-animate="true"
                id="about-title"
              >
                Who is{" "}
                <span className="text-[#f59e0b] italic font-serif">
                  Ivy Malika?
                </span>
              </h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                I&apos;m a passionate developer who loves turning ideas into
                reality through code. With a focus on creating seamless user
                experiences, I combine technical expertise with creative design
                to build applications that not only work flawlessly but also
                delight users.
              </p>
              {/* Stats row */}
              <div className="flex flex-wrap gap-8 md:gap-12 mb-8">
                {[
                  { value: "10+", label: "Projects Completed" },
                  { value: "2+", label: "Years of Experience" },
                  { value: "10+", label: "Technologies" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f59e0b] text-[#1a1a1a] font-semibold rounded-full hover:bg-amber-400 transition-colors"
                >
                  Download CV
                  <ArrowRight size={18} className="text-[#1a1a1a]" />
                </a>
                <span
                  className="text-[#f59e0b] italic text-xl font-serif"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Ivy Malika
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Certifications Section - tools and certifications after About */}
      <section
        ref={(el) => {
          sectionsRef.current["skills"] = el;
        }}
        id="skills"
        className="px-6 py-16 md:py-20 relative bg-white"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-neutral-200" />
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-center text-[#1a1a1a]">
            Skills & Expertise
          </h2>
          <p className="text-lg text-neutral-500 text-center mb-12 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-[#F5F5F5] border border-neutral-200 shadow-sm hover:border-[#14532d]/30 hover:shadow-md transition-all duration-300"
              >
                <skill.icon size={36} color={skill.color} className="mb-2" />
                <span className="text-sm font-medium text-[#1a1a1a]">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-center text-[#1a1a1a]">
            Certifications
          </h2>
          <p className="text-lg text-neutral-500 text-center mb-12 max-w-2xl mx-auto">
            Professional certifications and training
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#F5F5F5] border border-neutral-200 shadow-sm hover:border-[#14532d]/30 hover:shadow-md transition-all duration-300"
              >
                {cert.name === "Microsoft Azure AI in Cloud" ||
                cert.name === "Fundamentals of Cloud Computing" ? (
                  <div style={{ color: cert.color }} className="mb-3">
                    <cert.icon size={48} />
                  </div>
                ) : (
                  <cert.icon size={48} color={cert.color} className="mb-3" />
                )}
                <span className="text-sm font-semibold text-[#1a1a1a] leading-snug">
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200" />
      </section>

      {/* Projects Section - card style like Behance template */}
      <section
        ref={(el) => {
          sectionsRef.current["projects"] = el;
        }}
        id="projects"
        className="min-h-screen px-6 py-20 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-neutral-200" />

        <div className="container mx-auto">
          <h2
            className="text-4xl md:text-5xl font-semibold mb-4 text-center text-[#1a1a1a] transition-all duration-1000"
            data-animate="true"
            id="projects-title"
            style={{
              opacity: visibleElements.has("projects-title") ? 1 : 0,
              transform: visibleElements.has("projects-title")
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.95)",
            }}
          >
            Featured Projects
          </h2>

          <p
            className="text-lg text-neutral-500 text-center mb-16 max-w-2xl mx-auto transition-all duration-700"
            data-animate="true"
            id="projects-subtitle"
            style={{
              opacity: visibleElements.has("projects-subtitle") ? 1 : 0,
              transform: visibleElements.has("projects-subtitle")
                ? "translateY(0)"
                : "translateY(20px)",
              transitionDelay: "100ms",
            }}
          >
            A showcase of my recent work, each telling a unique story of
            problem-solving and creativity
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
                data-animate="true"
                id={`project-${idx}`}
                style={{
                  opacity: visibleElements.has(`project-${idx}`) ? 1 : 0,
                  transform: visibleElements.has(`project-${idx}`)
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transitionDelay: `${200 + idx * 100}ms`,
                }}
              >
                {/* Image / placeholder area */}
                <div
                  className="h-48 bg-neutral-100 relative overflow-hidden"
                  style={{
                    backgroundImage:
                      project.image &&
                      (project.image.startsWith("http") ||
                        project.image.startsWith("/"))
                        ? `url("${project.image}")`
                        : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!project.image?.startsWith("http") &&
                    !project.image?.startsWith("/") && (
                      <div className="absolute inset-0 flex items-center justify-center text-5xl bg-neutral-200/50">
                        {project.image || "📁"}
                      </div>
                    )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-[#1a1a1a]">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-neutral-100 rounded-md text-xs font-medium text-neutral-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.codeLink ? (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#14532d] hover:text-[#f59e0b] font-medium text-sm transition-colors"
                      >
                        <Github size={18} />
                        Code
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-neutral-400 text-sm">
                        Code —
                      </span>
                    )}
                    {project.liveLink ? (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#14532d] hover:text-[#f59e0b] font-medium text-sm transition-colors"
                      >
                        <ExternalLink size={18} />
                        Live
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-neutral-400 text-sm">
                        Live —
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - inspo: Testimonials Page */}
      <section
        ref={(el) => {
          sectionsRef.current["testimonials"] = el;
        }}
        id="testimonials"
        className="px-6 py-20 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-neutral-200" />
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-center text-[#1a1a1a]">
            Testimonials
          </h2>
          <p className="text-lg text-neutral-500 text-center mb-14 max-w-2xl mx-auto">
            What others say about working with me
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <p className="text-neutral-600 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-semibold text-[#1a1a1a]">{t.name}</p>
                <p className="text-sm text-neutral-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200" />
      </section>

      {/* Let's Connect Section - contact form + reach out */}
      <section
        ref={(el) => {
          sectionsRef.current["contact"] = el;
        }}
        id="contact"
        className="relative px-6 py-16 md:py-24 overflow-hidden"
      >
        {/* Subtle background accent */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#14532d]/[0.04] via-transparent to-[#f59e0b]/[0.04]"
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-neutral-200" />

        <div className="container mx-auto relative">
          {/* Header with accent line */}
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-0.5 bg-[#f59e0b] rounded" />
              <span className="text-sm font-medium uppercase tracking-widest text-[#14532d]">
                Get in touch
              </span>
              <span className="w-12 h-0.5 bg-[#f59e0b] rounded" />
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-4"
              data-animate="true"
              id="contact-title"
            >
              Let&apos;s Connect
            </h2>
            <p
              className="text-lg md:text-xl text-neutral-600 leading-relaxed"
              data-animate="true"
              id="contact-subtitle"
            >
              Have a project in mind? Drop a message and I&apos;ll get back
              within 1–2 days.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
            {/* Form card */}
            <div
              className="transition-all duration-700"
              data-animate="true"
              id="contact-form"
            >
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-lg shadow-neutral-200/50 hover:shadow-xl hover:shadow-neutral-200/50 hover:border-[#14532d]/20 transition-all duration-300">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-6">
                  Send a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-neutral-50/80 border border-neutral-200 rounded-xl focus:outline-none focus:border-[#14532d] focus:ring-2 focus:ring-[#14532d]/20 transition-all text-[#1a1a1a] placeholder:text-neutral-400"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-neutral-50/80 border border-neutral-200 rounded-xl focus:outline-none focus:border-[#14532d] focus:ring-2 focus:ring-[#14532d]/20 transition-all text-[#1a1a1a] placeholder:text-neutral-400"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-neutral-50/80 border border-neutral-200 rounded-xl focus:outline-none focus:border-[#14532d] focus:ring-2 focus:ring-[#14532d]/20 transition-all resize-none text-[#1a1a1a] placeholder:text-neutral-400"
                      placeholder="Tell me about your project or say hello..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-[#14532d] text-white rounded-xl font-semibold hover:bg-[#166534] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
                {submitStatus.type && (
                  <div
                    className={`mt-4 p-4 rounded-xl flex items-center gap-3 text-sm ${
                      submitStatus.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle2 size={20} className="flex-shrink-0" />
                    ) : (
                      <AlertCircle size={20} className="flex-shrink-0" />
                    )}
                    <p>{submitStatus.message}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reach out / contact info */}
            <div
              className="transition-all duration-700"
              data-animate="true"
              id="contact-info"
            >
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-6">
                Or reach out directly
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-md shadow-neutral-200/30 hover:shadow-lg hover:border-[#14532d]/30 hover:bg-[#14532d]/5 transition-all duration-300 group"
                    >
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#14532d] text-[#f59e0b] flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <Icon size={24} strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                          {item.label}
                        </p>
                        <p className="font-semibold text-[#1a1a1a] truncate group-hover:text-[#14532d] transition-colors">
                          {item.value}
                        </p>
                      </div>
                      <ExternalLink
                        size={18}
                        className="text-neutral-400 group-hover:text-[#14532d] flex-shrink-0 transition-colors"
                      />
                    </a>
                  );
                })}
              </div>
              <p className="mt-6 text-sm text-neutral-500">
                Prefer email? Write to{" "}
                <a
                  href="mailto:ayukoivy03@gmail.com"
                  className="font-medium text-[#14532d] hover:underline"
                >
                  ayukoivy03@gmail.com
                </a>{" "}
                and I&apos;ll reply as soon as I can.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200" />
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-10">
        <div className="container mx-auto px-6 text-center text-neutral-500 text-sm">
          <p className="mb-4">
            Designed & Built by{" "}
            <span className="text-[#1a1a1a] font-semibold">Ivy Malika</span>
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/MALIKAIVY"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#14532d] transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ivy-ayuko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#14532d] transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:ayukoivy03@gmail.com"
              className="text-neutral-400 hover:text-[#14532d] transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
