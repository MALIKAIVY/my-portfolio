'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, ArrowDown, Send, Sparkles, LucideIcon } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  image: string;
}

interface Skill {
  name: string;
  icon: LucideIcon;
  items: string[];
  color: string;
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
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate random particle properties once using useState with lazy initializer
  const [particles] = useState(() => {
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
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      // Determine active section based on scroll position
      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if the top of the section is near the viewport top
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(key);
          }
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, you would handle form submission (e.g., to an API or email service) here
    alert('Message sent! (Demo)');
    setFormData({ name: '', email: '', message: '' }); // Clear form
  };

  const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack marketplace with real-time inventory and payment processing",
      tech: ["Next.js", "Stripe", "PostgreSQL"],
      gradient: "from-purple-500 via-pink-500 to-red-500",
      image: "🛍️"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat with AI integration and custom model training",
      tech: ["React", "WebSocket", "Python"],
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      image: "🤖"
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization platform with interactive charts and reports",
      tech: ["Next.js", "D3.js", "MongoDB"],
      gradient: "from-orange-500 via-red-500 to-pink-500",
      image: "📊"
    },
    {
      title: "Social Media App",
      description: "Full-featured social platform with posts, comments, and real-time updates",
      tech: ["React", "Firebase", "Tailwind"],
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      image: "💬"
    },
    {
      title: "Task Manager",
      description: "Collaborative project management with teams and workflows",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      image: "✅"
    },
    {
      title: "Weather App",
      description: "Beautiful weather forecasts with maps and location alerts",
      tech: ["React", "API", "Leaflet"],
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      image: "🌤️"
    }
  ];

  const skills: Skill[] = [
    { name: "Frontend", icon: Code, items: ["React", "Next.js", "TypeScript", "Tailwind"], color: "from-blue-500 to-cyan-500" },
    { name: "Design", icon: Palette, items: ["UI/UX", "Figma", "Animations", "Responsive"], color: "from-purple-500 to-pink-500" },
    { name: "Backend", icon: Zap, items: ["Node.js", "API Design", "Databases", "Cloud"], color: "from-orange-500 to-red-500" }
  ];

  const contactInfo: ContactInfo[] = [
    { icon: Mail, label: 'Email', value: 'your@email.com', href: 'mailto:your@email.com', color: 'from-blue-500 to-cyan-500' },
    { icon: Github, label: 'GitHub', value: '@yourusername', href: 'https://github.com', color: 'from-purple-500 to-pink-500' },
    { icon: Linkedin, label: 'LinkedIn', value: '@yourprofile', href: 'https://linkedin.com', color: 'from-blue-600 to-blue-400' }
  ];

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 relative"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-transparent to-white/30 animate-pulse" />
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Mouse Follower Gradient */}
        <div 
          className="absolute opacity-20 transition-all duration-1000"
          style={{
            width: '800px',
            height: '800px',
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Fixed Blobs (You'll need to define 'animate-float-slow' and 'animate-float-slower' in your CSS/Tailwind config) */}
        {/* Example CSS for these animations (outside of this component):
        
        @keyframes float-slow {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 40px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes float-slower {
          0% { transform: translate(0, 0); }
          50% { transform: translate(30px, -50px); }
          100% { transform: translate(0, 0); }
        }
        
        */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slower" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-xl bg-black/50 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform relative group"
          >
            YourName
            <span className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          </button>
          
          <div className="hidden md:flex gap-8">
            {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative group capitalize transition-all duration-300 ${
                  activeSection === section ? 'text-white scale-110' : 'text-gray-400 hover:text-white'
                }`}
              >
                {section}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${
                  activeSection === section ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`} />
                {activeSection === section && (
                  <span className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg rounded-lg animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:scale-110 transition-transform relative"
          >
            <div className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-30 bg-black/98 backdrop-blur-2xl md:hidden transition-all duration-700 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {['home', 'about', 'projects', 'skills', 'contact'].map((section, idx) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="group relative text-3xl capitalize text-gray-300 hover:text-white transition-all hover:scale-110"
              // Note: You need to define the 'slideInFromLeft' keyframe in your CSS/Tailwind config
              style={{
                animation: menuOpen ? `slideInFromLeft 0.6s ease-out ${idx * 0.1}s both` : 'none'
              }}
            >
              <span className="relative z-10">{section}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 blur-2xl transition-all duration-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Home Section */}
      <section 
        ref={(el) => {sectionsRef.current['home'] = el}}
        id="home" 
        className="min-h-screen flex items-center justify-center relative px-6 pt-20"
      >
        <div className="text-center z-10 max-w-5xl">
          <div 
            className="mb-8 inline-block group"
            data-animate="true"
            id="home-avatar"
          >
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 transition-all duration-1000 ${
              visibleElements.has('home-avatar') ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            } group-hover:scale-110 group-hover:rotate-12`}>
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-bold relative overflow-hidden">
                <span className="relative z-10">YN</span>
                {/* Note: You need to define the 'animate-shimmer' keyframe in your CSS/Tailwind config */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-pink-500/0 animate-shimmer" />
              </div>
            </div>
          </div>
          
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient"
            data-animate="true"
            id="home-title"
          >
            <span className={`inline-block transition-all duration-700 ${
              visibleElements.has('home-title') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>Creative</span>{' '}
            <span className={`inline-block transition-all duration-700 delay-100 ${
              visibleElements.has('home-title') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>Developer</span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto transition-all duration-700 delay-200"
            data-animate="true"
            id="home-subtitle"
            style={{
              opacity: visibleElements.has('home-subtitle') ? 1 : 0,
              transform: visibleElements.has('home-subtitle') ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            Crafting beautiful, interactive web experiences that users love
          </p>

          <div 
            className="flex gap-6 justify-center flex-wrap mb-16 transition-all duration-700 delay-300"
            data-animate="true"
            id="home-buttons"
            style={{
              opacity: visibleElements.has('home-buttons') ? 1 : 0,
              transform: visibleElements.has('home-buttons') ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <button 
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="absolute top-2 right-2 w-4 h-4 text-white animate-ping" />
              </div>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="relative px-8 py-4 border-2 border-white/20 rounded-full font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Note: You need to define the 'animate-bounce-slow' keyframe in your CSS/Tailwind config */}
          <button 
            onClick={() => scrollToSection('about')}
            className="animate-bounce-slow inline-block text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowDown size={32} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Floating particles (You'll need to define 'float' and 'twinkle' keyframes in your CSS/Tailwind config) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                background: `rgba(${particle.colorChoice ? '99, 102, 241' : '168, 85, 247'}, ${particle.opacity})`,
                animation: `float ${particle.floatDuration}s ease-in-out infinite, twinkle ${particle.twinkleDuration}s ease-in-out infinite`,
                animationDelay: `${particle.animationDelay}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={(el) => {sectionsRef.current['about'] = el}}
        id="about" 
        className="min-h-screen flex items-center justify-center px-6 py-20 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        
        <div className="max-w-4xl relative">
          <h2 
            className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000"
            data-animate="true"
            id="about-title"
            style={{
              opacity: visibleElements.has('about-title') ? 1 : 0,
              transform: visibleElements.has('about-title') ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.9)'
            }}
          >
            About Me
          </h2>
          
          <div className="space-y-6 text-xl text-gray-300 leading-relaxed">
            {[
              "I'm a passionate developer who loves turning ideas into reality through code. With a focus on creating seamless user experiences, I combine technical expertise with creative design to build applications that not only work flawlessly but also delight users.",
              "My journey in web development has been driven by curiosity and a constant desire to learn. I believe in writing clean, maintainable code and staying updated with the latest technologies and best practices."
            ].map((text, idx) => (
              <p 
                key={idx}
                className="transition-all duration-700"
                data-animate="true"
                id={`about-p-${idx}`}
                style={{
                  opacity: visibleElements.has(`about-p-${idx}`) ? 1 : 0,
                  transform: visibleElements.has(`about-p-${idx}`) ? 'translateX(0)' : 'translateX(-30px)',
                  transitionDelay: `${idx * 100}ms`
                }}
              >
                {text}
              </p>
            ))}

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                { number: '50+', label: 'Projects Completed' },
                { number: '5+', label: 'Years Experience' },
                { number: '30+', label: 'Happy Clients' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center hover:border-white/30 transition-all duration-500 overflow-hidden"
                  data-animate="true"
                  id={`stat-${idx}`}
                  style={{
                    opacity: visibleElements.has(`stat-${idx}`) ? 1 : 0,
                    transform: visibleElements.has(`stat-${idx}`) ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                    transitionDelay: `${300 + idx * 100}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3 transition-transform duration-300 group-hover:scale-110">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        ref={(el) => {sectionsRef.current['projects'] = el}}
        id="projects" 
        className="min-h-screen px-6 py-20 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          <h2 
            className="text-5xl md:text-7xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000"
            data-animate="true"
            id="projects-title"
            style={{
              opacity: visibleElements.has('projects-title') ? 1 : 0,
              transform: visibleElements.has('projects-title') ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            }}
          >
            Featured Projects
          </h2>
          
          <p 
            className="text-xl text-gray-400 text-center mb-20 max-w-2xl mx-auto transition-all duration-700"
            data-animate="true"
            id="projects-subtitle"
            style={{
              opacity: visibleElements.has('projects-subtitle') ? 1 : 0,
              transform: visibleElements.has('projects-subtitle') ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '100ms'
            }}
          >
            A showcase of my recent work, each telling a unique story of problem-solving and creativity
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-700 overflow-hidden cursor-pointer"
                data-animate="true"
                id={`project-${idx}`}
                style={{
                  opacity: visibleElements.has(`project-${idx}`) ? 1 : 0,
                  transform: visibleElements.has(`project-${idx}`) ? 'translateY(0)' : 'translateY(50px)',
                  transitionDelay: `${200 + idx * 100}ms`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-all duration-700`} />
                
                <div className="text-6xl mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 filter group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  {project.image}
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white/10 rounded-full text-sm border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:scale-105"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all group/btn">
                      <Github size={20} className="group-hover/btn:rotate-12 transition-transform" />
                      <span>Code</span>
                    </button>
                    <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all group/btn">
                      <ExternalLink size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      <span>Live</span>
                    </button>
                  </div>
                </div>

                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${project.gradient} opacity-20 blur-2xl transition-all duration-700 group-hover:w-40 group-hover:h-40`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        ref={(el) => {sectionsRef.current['skills'] = el}}
        id="skills" 
        className="min-h-screen px-6 py-20 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
        
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-5xl md:text-7xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000"
            data-animate="true"
            id="skills-title"
            style={{
              opacity: visibleElements.has('skills-title') ? 1 : 0,
              transform: visibleElements.has('skills-title') ? 'scale(1)' : 'scale(0.8)',
            }}
          >
            Skills & Expertise
          </h2>
          
          <p 
            className="text-xl text-gray-400 text-center mb-20 max-w-2xl mx-auto transition-all duration-700"
            data-animate="true"
            id="skills-subtitle"
            style={{
              opacity: visibleElements.has('skills-subtitle') ? 1 : 0,
              transform: visibleElements.has('skills-subtitle') ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '100ms'
            }}
          >
            Technologies and tools I use to bring ideas to life
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-white/30 transition-all duration-700 overflow-hidden"
                  data-animate="true"
                  id={`skill-${idx}`}
                  style={{
                    opacity: visibleElements.has(`skill-${idx}`) ? 1 : 0,
                    transform: visibleElements.has(`skill-${idx}`) ? 'translateY(0)' : 'translateY(50px)',
                    transitionDelay: `${200 + idx * 150}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-700" />
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-purple-500/50`}>
                      <Icon size={36} />
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                      {skill.name}
                    </h3>
                    
                    <ul className="space-y-3">
                      {skill.items.map((item, i) => (
                        <li 
                          key={i} 
                          className="text-gray-400 flex items-center gap-3 group-hover:text-gray-300 transition-colors"
                        >
                          <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-150 transition-transform" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={(el) => {sectionsRef.current['contact'] = el}}
        id="contact" 
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-4xl w-full">
          <h2 
            className="text-5xl md:text-7xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000"
            data-animate="true"
            id="contact-title"
            style={{
              opacity: visibleElements.has('contact-title') ? 1 : 0,
              transform: visibleElements.has('contact-title') ? 'scale(1)' : 'scale(0.8)',
            }}
          >
            Let&apos;s Connect
          </h2>
          
          <p 
            className="text-xl text-gray-400 text-center mb-16 transition-all duration-700"
            data-animate="true"
            id="contact-subtitle"
            style={{
              opacity: visibleElements.has('contact-subtitle') ? 1 : 0,
              transform: visibleElements.has('contact-subtitle') ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '100ms'
            }}
          >
            Have a project in mind? Let&apos;s create something amazing together
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div 
              className="transition-all duration-700"
              data-animate="true"
              id="contact-form"
              style={{
                opacity: visibleElements.has('contact-form') ? 1 : 0,
                transform: visibleElements.has('contact-form') ? 'translateX(0)' : 'translateX(-30px)',
                transitionDelay: '200ms'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-400">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-400">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-400">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-2 group"
                >
                  <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </button>
              </form>
            </div>

            <div 
              className="space-y-8 transition-all duration-700"
              data-animate="true"
              id="contact-info"
              style={{
                opacity: visibleElements.has('contact-info') ? 1 : 0,
                transform: visibleElements.has('contact-info') ? 'translateX(0)' : 'translateX(30px)',
                transitionDelay: '300ms'
              }}
            >
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-500 group hover:scale-[1.02] relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${item.color} flex-shrink-0 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-purple-500/50`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-sm font-medium text-gray-400">{item.label}</p>
                      <p className="text-xl font-semibold break-words transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p className="mb-4">
            Designed & Built by <span className="text-white font-semibold">YourName</span>
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:your@email.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}