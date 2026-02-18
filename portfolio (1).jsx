import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Beaker, GraduationCap, Briefcase, Award, Cpu, Code, Droplet, FlaskConical, Mail, Linkedin, Github } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [projectPdfUrl, setProjectPdfUrl] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const fullName = 'RACHAN K';
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(C:\Users\ABHIJNA\Downloads);
    }
  };

  // Handle PDF upload
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setProjectPdfUrl(url);
    }
  };

  // Mouse position tracking for lightning glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'courses', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect for hero name
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedText(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 120);
    return () => clearInterval(typingInterval);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden font-sans">
      {/* Animated Gradient Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
      </div>

      {/* Animated Multi-Color Edge Glow - Mouse Reactive */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 191, 255, 0.15), transparent 60%)`
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-40 animate-pulse-slow">
        <div className="absolute inset-0 border-[3px] border-transparent shadow-[inset_0_0_30px_rgba(0,191,255,0.3),0_0_30px_rgba(0,191,255,0.3)]"
          style={{
            borderImage: 'linear-gradient(90deg, #00bfff, #a855f7, #ec4899, #f97316, #00bfff) 1',
          }} />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-orange-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation Menu */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 group"
            >
              <FlaskConical className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                RK
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'courses', label: 'Courses' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${
                    activeSection === item.id ? 'text-cyan-400' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-3">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'courses', label: 'Courses' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-cyan-400/10 text-cyan-400 border-l-2 border-cyan-400' 
                      : 'text-gray-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-30 mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 relative pt-20">
          <div className="max-w-7xl w-full">
            {/* Profile Photo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-12"
            >
              <div className="relative group">
                {/* Animated gradient ring around photo */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-orange-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-spin-slow" 
                  style={{ padding: '4px' }} />
                
                <div className="relative">
                  {imageUrl ? (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={imageUrl}
                      alt="Rachan K"
                      className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-black shadow-2xl"
                    />
                  ) : (
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-950 border-4 border-black flex items-center justify-center shadow-2xl">
                      <label htmlFor="photo-upload" className="cursor-pointer text-center p-6 group-hover:scale-110 transition-transform">
                        <div className="text-6xl mb-2">📸</div>
                        <p className="text-gray-400 text-sm">Click to upload<br/>your photo</p>
                      </label>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                  
                  {/* Edit button overlay when photo exists */}
                  {imageUrl && (
                    <label 
                      htmlFor="photo-upload"
                      className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <span className="text-white text-sm font-semibold">Change Photo</span>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="mb-6 inline-block">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(0,191,255,0.5)', 
                      '0 0 40px rgba(168,85,247,0.5)',
                      '0 0 40px rgba(236,72,153,0.5)',
                      '0 0 20px rgba(0,191,255,0.5)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="p-4 rounded-full bg-black/50 border border-cyan-400/30"
                >
                  <FlaskConical className="w-12 h-12 text-cyan-400" />
                </motion.div>
              </div>
              
              {/* Typewriter Name */}
              <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent inline-block"
                  style={{
                    textShadow: '0 0 40px rgba(0,191,255,0.3)',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    letterSpacing: '0.02em'
                  }}>
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1 h-20 md:h-32 bg-gradient-to-b from-cyan-400 to-purple-500 ml-2 align-middle"
                    style={{ display: isTypingComplete ? 'none' : 'inline-block' }}
                  />
                </span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="text-2xl md:text-3xl text-gray-400 mb-3"
                style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic' }}
              >
                Graduate Chemical Engineer
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8, duration: 1 }}
                className="text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Minor in Petroleum Engineering
              </motion.p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16"
            >
              {[
                { label: 'CGPA', value: '6.97', icon: GraduationCap, gradient: 'from-cyan-500 to-blue-500' },
                { label: 'Projects', value: '3+', icon: Beaker, gradient: 'from-purple-500 to-pink-500' },
                { label: 'Internships', value: '2', icon: Briefcase, gradient: 'from-pink-500 to-orange-500' },
                { label: 'Certifications', value: '7', icon: Award, gradient: 'from-orange-500 to-cyan-500' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800 rounded-xl p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-transparent group relative overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent mx-auto mb-3 group-hover:scale-110 transition-transform`} 
                      style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                    <div className={`text-3xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent mb-1`} 
                      style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={() => scrollToSection('about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer group"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2 group-hover:border-cyan-400 transition-colors">
              <motion.div 
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.button>
        </section>

        {/* Education Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-12 flex items-center gap-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500" />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Education
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border-2 border-zinc-800 rounded-2xl p-8 backdrop-blur-sm hover:border-transparent transition-all duration-500 group relative overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Bachelor of Technology (BTech)
                    </h3>
                    <p className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-lg mb-2 font-semibold">
                      Chemical Engineering
                    </p>
                    <p className="text-gray-400">Manipal Institute of Technology</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-br from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                      6.97
                    </div>
                    <div className="text-gray-500 text-sm">CGPA</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full text-sm border border-purple-400/30">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                      Minor: Petroleum Engineering
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bento Box Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-12 flex items-center gap-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="w-2 h-12 bg-gradient-to-b from-purple-400 via-pink-500 to-orange-400" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Software Tools - Tall Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="md:row-span-2 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border-2 border-zinc-800 rounded-2xl p-8 backdrop-blur-sm hover:border-transparent transition-all duration-500 group relative overflow-hidden"
              >
                {/* Purple gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <Code className="w-10 h-10 text-purple-400 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Software Tools
                  </h3>
                  <div className="space-y-3">
                    {['Aspen Plus', 'MATLAB', 'AutoCAD', 'HTML/CSS'].map((skill, idx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover/item:scale-150 transition-transform" />
                        <span className="text-gray-300 group-hover/item:text-white transition-colors">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Core Expertise */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="md:col-span-2 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border-2 border-zinc-800 rounded-2xl p-8 backdrop-blur-sm hover:border-transparent transition-all duration-500 group relative overflow-hidden"
              >
                {/* Cyan gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <Cpu className="w-10 h-10 text-cyan-400 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Core Expertise
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['Thermodynamics', 'Process Safety (ISO 14001)', 'Chemical Process Design', 'Heat Transfer'].map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 bg-zinc-800/50 text-gray-300 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Lab Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="md:col-span-2 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border-2 border-zinc-800 rounded-2xl p-8 backdrop-blur-sm hover:border-transparent transition-all duration-500 group relative overflow-hidden"
              >
                {/* Orange gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <Beaker className="w-10 h-10 text-orange-400 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Laboratory Analysis
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['XRD (X-Ray Diffraction)', 'FTIR Spectroscopy', 'AAS (Atomic Absorption)', 'Material Characterization'].map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 bg-zinc-800/50 text-gray-300 rounded-lg border border-zinc-700 hover:border-orange-400/50 hover:bg-orange-400/10 hover:text-orange-300 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Project Section */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-12 flex items-center gap-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Project
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, y: -5 }}
              className="bg-gradient-to-br from-cyan-950/20 via-blue-950/20 to-zinc-950/80 border-2 border-transparent rounded-2xl p-10 backdrop-blur-sm transition-all duration-500 group relative overflow-hidden"
              style={{
                borderImage: 'linear-gradient(135deg, rgba(0,191,255,0.5), rgba(168,85,247,0.5)) 1'
              }}
            >
              {/* Multi-color animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-blue-400/10 via-purple-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-6">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="flex-shrink-0"
                  >
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
                      <Droplet className="w-12 h-12 text-cyan-400" />
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Removal of Heavy Metal from Waste Water
                    </h3>
                    <p className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-lg mb-4 font-semibold">
                      Advanced Nano-Adsorbent Research Project
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-gray-300 leading-relaxed">
                  <p>
                    Developed and optimized graphene oxide-based nano-adsorbents for efficient heavy metal removal from industrial wastewater.
                  </p>
                  <p>
                    Achieved breakthrough adsorption capacity using advanced material characterization techniques including XRD, FTIR, and surface analysis.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-400/30 rounded-lg px-6 py-3 hover:border-cyan-400/60 transition-all duration-300">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">18.12 mg/g</div>
                    <div className="text-sm text-gray-400">Adsorption Capacity</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 rounded-lg px-6 py-3 hover:border-purple-400/60 transition-all duration-300">
                    <div className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Graphene Oxide</div>
                    <div className="text-sm text-gray-400">Nano-adsorbent Base</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { tag: 'Nanotechnology', color: 'from-cyan-400 to-blue-400' },
                    { tag: 'Water Treatment', color: 'from-purple-400 to-pink-400' },
                    { tag: 'Material Science', color: 'from-pink-400 to-orange-400' },
                    { tag: 'Environmental Engineering', color: 'from-orange-400 to-cyan-400' }
                  ].map((item) => (
                    <span 
                      key={item.tag}
                      className={`px-3 py-1 text-sm bg-zinc-800/50 bg-gradient-to-r ${item.color} bg-clip-text text-transparent rounded-full border border-zinc-600 hover:border-transparent hover:shadow-lg transition-all duration-300`}
                      style={{
                        boxShadow: 'none',
                      }}
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>

                {/* PDF Upload/View Section */}
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  {projectPdfUrl ? (
                    <div className="flex items-center gap-4">
                      <a
                        href={projectPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Project Report (PDF)
                      </a>
                      <label className="cursor-pointer px-4 py-3 bg-zinc-800 text-gray-300 rounded-lg hover:bg-zinc-700 transition-all duration-300 text-sm">
                        Change PDF
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 text-purple-300 font-semibold rounded-lg hover:border-purple-400/60 hover:bg-purple-400/20 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Project Report (PDF)
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-12 flex items-center gap-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="w-2 h-12 bg-gradient-to-b from-pink-400 via-orange-500 to-cyan-400" />
              <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Experience
              </span>
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  company: 'Mangalore Chemicals & Fertilizers',
                  role: 'Chemical Engineering Intern',
                  description: 'Gained hands-on experience in industrial chemical processes, fertilizer production, and plant operations. Worked on process optimization and safety protocols.',
                  gradient: 'from-pink-400 to-orange-400'
                },
                {
                  company: 'Dakshina Kannada Milk Union',
                  role: 'Process Engineering Intern',
                  description: 'Analyzed dairy processing operations, quality control procedures, and supply chain management. Contributed to process improvement initiatives.',
                  gradient: 'from-orange-400 to-cyan-400'
                }
              ].map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ x: 10, scale: 1.01 }}
                  className="bg-gradient-to-r from-zinc-900/80 to-zinc-950/80 border-l-4 rounded-r-2xl p-8 backdrop-blur-sm transition-all duration-300 group relative overflow-hidden"
                  style={{
                    borderLeftColor: index === 0 ? '#f472b6' : '#f97316'
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <Briefcase className={`w-8 h-8 bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300`} 
                      style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {exp.company}
                    </h3>
                    <p className={`bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent mb-4 text-lg font-semibold`}>{exp.role}</p>
                    <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses & Certifications Section */}
        <section id="courses" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-12 flex items-center gap-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="w-2 h-12 bg-gradient-to-b from-orange-400 via-purple-500 to-cyan-400" />
              <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Courses & Certifications
              </span>
            </motion.h2>

            {/* Featured Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Hydrocarbon Exploration and Production',
                  issuer: 'L&T EduTech',
                  date: 'Sep 2025',
                  credentialId: 'YW1RER6JO92J',
                  icon: '⚡',
                  gradient: 'from-orange-500 to-red-500',
                  category: 'Energy Sector'
                },
                {
                  title: 'SAP Professional Fundamentals',
                  issuer: 'SAP',
                  date: 'Jul 2025',
                  credentialId: '69PNJKGO5I8F',
                  icon: '💼',
                  gradient: 'from-blue-500 to-cyan-500',
                  category: 'Project Management',
                  skills: ['Project Management']
                },
                {
                  title: 'Digital Manufacturing & Design',
                  issuer: 'University at Buffalo, SUNY',
                  date: 'Jul 2025',
                  credentialId: '6K29K1KSB3RG',
                  icon: '🏭',
                  gradient: 'from-purple-500 to-cyan-500',
                  category: 'Manufacturing & Management'
                },
                {
                  title: 'Foundations: Data, Data, Everywhere',
                  issuer: 'Google',
                  date: 'Sep 2024',
                  credentialId: 'TZA315Z5SOYA',
                  icon: '📊',
                  gradient: 'from-green-500 to-emerald-500',
                  category: 'Data Science'
                },
                {
                  title: 'HTML, CSS, and Javascript for Web Developers',
                  issuer: 'Johns Hopkins University',
                  date: 'Aug 2024',
                  credentialId: 'O037FIO62PR8',
                  icon: '💻',
                  gradient: 'from-pink-500 to-purple-500',
                  category: 'Web Development',
                  skills: ['HTML', 'CSS', 'JavaScript']
                },
                {
                  title: 'AWS S3 Basics',
                  issuer: 'Coursera Project Network',
                  date: 'Sep 2024',
                  credentialId: 'D6FBDWJRKF8S',
                  icon: '☁️',
                  gradient: 'from-orange-500 to-amber-500',
                  category: 'Cloud Computing'
                },
                {
                  title: 'Essentials of Entrepreneurship: Thinking & Action',
                  issuer: 'University of California, Irvine',
                  date: 'May 2022',
                  credentialId: '5HCTTYGK2SEZ',
                  icon: '🚀',
                  gradient: 'from-cyan-500 to-blue-500',
                  category: 'Business & Entrepreneurship'
                }
              ].map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border-2 border-zinc-800 rounded-2xl p-6 backdrop-blur-sm hover:border-transparent transition-all duration-500 group cursor-pointer relative overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    {/* Category Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-3 py-1 bg-zinc-800/50 text-gray-400 rounded-full border border-zinc-700">
                        {cert.category}
                      </span>
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {cert.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 min-h-[3.5rem] leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {cert.title}
                    </h3>
                    
                    <p className={`bg-gradient-to-r ${cert.gradient} bg-clip-text text-transparent font-semibold mb-2 text-sm`}>
                      {cert.issuer}
                    </p>
                    
                    <div className="text-xs text-gray-500 mb-3">
                      Issued {cert.date}
                    </div>

                    {/* Skills Tags */}
                    {cert.skills && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {cert.skills.map(skill => (
                          <span key={skill} className="text-xs px-2 py-1 bg-zinc-800/70 text-gray-400 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Credential ID */}
                    <div className="pt-3 border-t border-zinc-800">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-mono">{cert.credentialId}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Course Categories Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Learning Focus Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { area: 'Data Science', count: '1 Course', color: 'from-green-400 to-emerald-400' },
                  { area: 'Web Development', count: '1 Course', color: 'from-pink-400 to-purple-400' },
                  { area: 'Manufacturing & Management', count: '2 Courses', color: 'from-purple-400 to-cyan-400' },
                  { area: 'Energy Sector', count: '1 Course', color: 'from-orange-400 to-red-400' }
                ].map((item, idx) => (
                  <motion.div
                    key={item.area}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/50 hover:border-zinc-600 transition-all duration-300"
                  >
                    <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-1`}>
                      {item.count}
                    </div>
                    <div className="text-sm text-gray-400">{item.area}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-12 flex items-center gap-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 via-pink-500 to-purple-400" />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Get In Touch
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  I'm currently open to opportunities in Chemical Engineering, Process Design, and related fields. 
                  Whether you have a project in mind or just want to connect, feel free to reach out!
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <motion.a
                    href="mailto:rachankorikkar@gmail.com"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-cyan-400/50 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-cyan-400/10 rounded-lg border border-cyan-400/30 group-hover:bg-cyan-400/20 transition-all">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-white group-hover:text-cyan-400 transition-colors">rachankorikkar@gmail</div>
                    </div>
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href="https://www.linkedin.com/in/rachan-k-9a2197299/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-blue-400/50 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-blue-400/10 rounded-lg border border-blue-400/30 group-hover:bg-blue-400/20 transition-all">
                      <Linkedin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">LinkedIn</div>
                      <div className="text-white group-hover:text-blue-400 transition-colors">linkedin.com/in/rachan-k</div>
                    </div>
                  </motion.a>

                  {/* GitHub - Optional */}
                  <motion.a
                    href="https://github.com/rachank"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-purple-400/50 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-purple-400/10 rounded-lg border border-purple-400/30 group-hover:bg-purple-400/20 transition-all">
                      <Github className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">GitHub</div>
                      <div className="text-white group-hover:text-purple-400 transition-colors">github.com/rachank</div>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              {/* Quick Message Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Send a Message
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Message</label>
                    <textarea
                      rows="4"
                      placeholder="Your message..."
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all resize-none"
                    ></textarea>
                  </div>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50">
                    Send Message
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-zinc-800 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">© 2024 Rachan K. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="https://www.linkedin.com/in/rachan-k-9a2197299/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/rachank" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="mailto:rachankorikkar@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&family=Crimson+Pro:ital,wght@1,400&family=JetBrains+Mono:wght@400&family=Playfair+Display:wght@700;900&display=swap');
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, 15px) scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        * {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00bfff, #a855f7, #ec4899, #f97316);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00d4ff, #c084fc, #f472b6, #fb923c);
        }
      `}</style>
    </div>
  );
}
