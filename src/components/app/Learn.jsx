import React, { useState, useEffect, useRef } from 'react';
import {
  FaBars,
  FaTimes,
  FaRocket,
  FaExclamationTriangle,
  FaGoogle,
  FaMicrosoft,
  FaSpotify,
  FaAmazon,
  FaStripe,
  FaKeyboard,
  FaCogs,
  FaPaperPlane,
  FaVideo,
  FaMagic,
  FaCode,
  FaPlay,
  FaCheck,
  FaStar,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowRight
} from 'react-icons/fa';


const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.disconnect(); };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`reveal-section ${isVisible ? 'active' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-[fadeIn_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <FaTimes className="text-xl" />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600">
            <FaRocket className="text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Start Your Project</h3>
          <p className="text-slate-500">Tell us what you need.</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
            <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Aura Web App" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="you@example.com" />
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Type</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              <option>Full Website Development</option>
              <option>AI Video Series</option>
              <option>Image Asset Generation</option>
            </select>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="text-amber-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700 font-bold">Revision Policy</p>
                <p className="text-sm text-amber-600 mt-1">
                  Only 1 free revision cycle per phase. <br/>
                  <span className="font-bold">Additional changes charged at $2/change.</span>
                </p>
              </div>
            </div>
          </div>

          <button type="button" onClick={onClose} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg mt-2">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

const Learn = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  // Loading Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const portfolioItems = [
    { id: 1, type: 'video', img: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', title: 'AI Video Demo' },
    { id: 2, type: 'web', img: 'https://images.unsplash.com/photo-1481487484168-9b995ecc168d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', title: 'Website Demo' },
    { id: 3, type: 'image', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', title: 'AI Image Demo' },
    { id: 4, type: 'web', img: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', title: 'E-commerce Demo' },
    { id: 5, type: 'image', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', title: 'AI Architecture' },
    { id: 6, type: 'video', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', title: 'Commercial Demo' },
  ];

  const filteredPortfolio = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.type === filter);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-400 font-medium tracking-widest uppercase">Initializing Aura</p>
      </div>
    );
  }

  return (
    <div className="antialiased text-slate-800 bg-white font-sans scroll-smooth">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-white/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
                A
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">Aura</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#process" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Process</a>
              <a href="#services" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Services</a>
              <a href="#demos" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Work</a>
              <a href="#pricing" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Pricing</a>
              
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              
              <button className="text-slate-700 hover:text-indigo-600 font-medium border border-slate-300 hover:border-indigo-600 px-4 py-2 rounded-lg transition-all text-sm">
                Login / Signup
              </button>

              <button onClick={() => setModalOpen(true)} className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/30 text-sm">
                Start Project
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-indigo-600 focus:outline-none">
                {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Process</a>
              <a href="#demos" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Work</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Pricing</a>
              <button onClick={() => setModalOpen(true)} className="block w-full text-left px-3 py-3 text-base font-medium bg-indigo-600 text-white rounded-md mt-4">Start Project</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Now accepting new clients</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              We Build <span className="gradient-text">Digital Reality</span>.
            </h1>
            
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Your all-in-one creative engine. We generate cinematic AI videos, breathtaking images, and develop high-performance websites that convert.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <button onClick={() => setModalOpen(true)} className="px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-1">
                Start Now
              </button>
              <a href="#demos" className="px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all hover:-translate-y-1">
                Explore Work
              </a>
            </div>
          </Reveal>

          {/* Floating Mockup Elements */}
          <div className="mt-20 relative max-w-5xl mx-auto hidden md:block h-[400px]">
             <Reveal delay={200}>
              {/* Central Web Mockup */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-20 animate-float">
                <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <div className="h-32 bg-slate-100 rounded-lg animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse"></div>
                    <div className="h-20 bg-slate-100 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              {/* Video Card Left */}
              <div className="absolute left-0 top-20 w-64 h-48 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center group relative overflow-hidden">
                  <FaPlay className="text-white text-2xl z-10" />
                </div>
              </div>
              {/* Image Card Right */}
              <div className="absolute right-0 top-20 w-64 h-48 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-10 transform rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                <div className="w-full h-full bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')" }}></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-indigo-400 mb-1">500+</div>
                <div className="text-slate-400 text-sm">Videos Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-400 mb-1">1.2k</div>
                <div className="text-slate-400 text-sm">Images Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-400 mb-1">50+</div>
                <div className="text-slate-400 text-sm">Websites Deployed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-400 mb-1">99%</div>
                <div className="text-slate-400 text-sm">Client Satisfaction</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trusted By Companies */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by leading companies</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><FaGoogle className="text-2xl" /> Google</div>
              <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><FaMicrosoft className="text-2xl" /> Microsoft</div>
              <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><FaSpotify className="text-2xl" /> Spotify</div>
              <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><FaAmazon className="text-2xl" /> Amazon</div>
              <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><FaStripe className="text-2xl" /> Stripe</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">Workflow</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">How It Works</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">From concept to reality in three simple steps.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="relative text-center">
              <Reveal delay={100}>
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center relative z-10 mb-6 group hover:scale-110 transition-transform duration-300">
                  <FaKeyboard className="text-3xl text-indigo-600" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Input Text</h3>
                <p className="text-slate-600">Describe your vision in plain text. Specify details for your video, image, or website requirements.</p>
              </Reveal>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
               <Reveal delay={200}>
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center relative z-10 mb-6 group hover:scale-110 transition-transform duration-300">
                  <FaCogs className="text-3xl text-purple-600 animate-spin-slow" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI Generation</h3>
                <p className="text-slate-600">Our advanced engines generate high-fidelity videos and assets instantly, tailored to your prompt.</p>
              </Reveal>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <Reveal delay={300}>
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center relative z-10 mb-6 group hover:scale-110 transition-transform duration-300">
                  <FaPaperPlane className="text-3xl text-green-500" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Delivery</h3>
                <p className="text-slate-600">We send the completed assets directly to you. Review, download, and deploy immediately.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Capabilities</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Seamlessly blending artificial intelligence with high-end engineering.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Reveal delay={100}>
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <FaVideo className="text-indigo-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI Video Generation</h3>
                <p className="text-slate-600 leading-relaxed">Turn text prompts into high-definition videos. Perfect for marketing reels and product demos.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                  <FaMagic className="text-purple-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Image Synthesis</h3>
                <p className="text-slate-600 leading-relaxed">Create custom assets, logos, and photorealistic environments on demand using diffusion models.</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <FaCode className="text-blue-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Modern Web Dev</h3>
                <p className="text-slate-600 leading-relaxed">Fast, SEO-optimized, and responsive websites. We use the latest frameworks like React and Tailwind.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="demos" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Work</h2>
                <p className="mt-2 text-slate-600">Explore our latest generations and deployments.</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-2">
                {['all', 'video', 'image', 'web'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                      filter === type ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item, index) => (
               <Reveal key={item.id} delay={index * 100}>
                <div className="group relative rounded-xl overflow-hidden cursor-pointer aspect-video bg-white border border-slate-200">
                  {item.type === 'web' ? (
                    <div className="w-full h-full bg-slate-100 relative">
                       <div className="absolute top-0 w-full h-6 bg-slate-800 flex items-center px-2 gap-1 z-10">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                       </div>
                       <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 mt-6" />
                    </div>
                  ) : (
                    <>
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FaPlay className="text-white" />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="#demos" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              View Full Gallery <FaArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Simple Pricing</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Choose the package that fits your creative needs.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <Reveal delay={100}>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all flex flex-col shadow-sm h-full">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Starter</h3>
                  <p className="text-3xl font-bold text-slate-900 mt-2">$49<span className="text-base font-normal text-slate-500">/mo</span></p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center text-sm text-slate-600"><FaCheck className="text-green-500 mr-2" /> 100 AI Images</li>
                  <li className="flex items-center text-sm text-slate-600"><FaCheck className="text-green-500 mr-2" /> 5 Mins AI Video</li>
                  <li className="flex items-center text-sm text-slate-600"><FaCheck className="text-green-500 mr-2" /> Basic Support</li>
                </ul>
                <button className="w-full py-3 rounded-lg border border-slate-900 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white transition-colors">Get Started</button>
              </div>
            </Reveal>

            {/* Pro */}
            <Reveal>
              <div className="bg-slate-900 p-8 rounded-2xl shadow-xl transform md:-translate-y-4 flex flex-col relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">Professional</h3>
                  <p className="text-3xl font-bold text-white mt-2">$199<span className="text-base font-normal text-slate-400">/mo</span></p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center text-sm text-slate-300"><FaCheck className="text-indigo-400 mr-2" /> Unlimited AI Images</li>
                  <li className="flex items-center text-sm text-slate-300"><FaCheck className="text-indigo-400 mr-2" /> 30 Mins AI Video</li>
                  <li className="flex items-center text-sm text-slate-300"><FaCheck className="text-indigo-400 mr-2" /> 1 Web Project / mo</li>
                  <li className="flex items-center text-sm text-slate-300"><FaCheck className="text-indigo-400 mr-2" /> Priority Support</li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors">Go Pro</button>
              </div>
            </Reveal>

            {/* Agency */}
            <Reveal delay={200}>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all flex flex-col shadow-sm h-full">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Agency</h3>
                  <p className="text-3xl font-bold text-slate-900 mt-2">$499<span className="text-base font-normal text-slate-500">/mo</span></p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center text-sm text-slate-600"><FaCheck className="text-green-500 mr-2" /> Custom Solutions</li>
                  <li className="flex items-center text-sm text-slate-600"><FaCheck className="text-green-500 mr-2" /> Full API Access</li>
                  <li className="flex items-center text-sm text-slate-600"><FaCheck className="text-green-500 mr-2" /> Dedicated Manager</li>
                </ul>
                <button className="w-full py-3 rounded-lg border border-slate-900 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white transition-colors">Contact Sales</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
             <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Trusted by Innovators</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex text-yellow-400 mb-4 text-sm">
                  {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-slate-600 mb-6 italic">"Aura transformed our marketing workflow. The AI video generation is indistinguishable from real footage."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">JS</div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-slate-900">James Smith</p>
                    <p className="text-xs text-slate-500">CMO, TechFlow</p>
                  </div>
                </div>
              </div>
            </Reveal>

             <Reveal delay={200}>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex text-yellow-400 mb-4 text-sm">
                  {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-slate-600 mb-6 italic">"The website they built for us is blazing fast. The intersection of design and code is perfect."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600">AL</div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-slate-900">Ana Lopez</p>
                    <p className="text-xs text-slate-500">Founder, Artistry</p>
                  </div>
                </div>
              </div>
            </Reveal>

             <Reveal delay={300}>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex text-yellow-400 mb-4 text-sm">
                   {[...Array(5)].map((_, i) => <FaStar key={i} className={i === 4 ? "opacity-50" : ""} />)}
                </div>
                <p className="text-slate-600 mb-6 italic">"Incredible value for the price. The revision policy is strict but fair given the quality."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">DK</div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-slate-900">David Kim</p>
                    <p className="text-xs text-slate-500">Director, Studio X</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">A</div>
                <span className="font-bold text-xl text-slate-800">Aura</span>
              </div>
              <p className="text-slate-500 text-sm">Next-generation digital agency combining creativity with artificial intelligence.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">Web Development</a></li>
                <li><a href="#" className="hover:text-indigo-600">AI Video</a></li>
                <li><a href="#" className="hover:text-indigo-600">Image Gen</a></li>
                <li><a href="#" className="hover:text-indigo-600">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Social</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-indigo-600 text-xl"><FaTwitter /></a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 text-xl"><FaInstagram /></a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 text-xl"><FaLinkedin /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">&copy; 2024 Aura Platforms. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-400">
              <a href="#" className="hover:text-indigo-600">Privacy</a>
              <a href="#" className="hover:text-indigo-600">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Learn;