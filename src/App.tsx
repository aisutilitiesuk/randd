import { useState } from 'react';
import {
  Menu,
  X,
  ShieldCheck,
  Shield,
  ClipboardCheck,
  HardHat,
  Home,
  Building,
  PenTool,
  Wrench,
  CheckCircle,
} from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection('#home')}
                className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
              >
                R&D Sprinklers
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('#services')}
                className="text-slate-600 hover:text-blue-700 font-medium transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('#why-us')}
                className="text-slate-600 hover:text-blue-700 font-medium transition-colors"
              >
                Why Us
              </button>
              <button
                onClick={() => scrollToSection('#projects')}
                className="text-slate-600 hover:text-blue-700 font-medium transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('#quote')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-blue-700 p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('#services')}
                className="block w-full text-left text-slate-600 hover:text-blue-700 font-medium py-2 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('#why-us')}
                className="block w-full text-left text-slate-600 hover:text-blue-700 font-medium py-2 transition-colors"
              >
                Why Us
              </button>
              <button
                onClick={() => scrollToSection('#projects')}
                className="block w-full text-left text-slate-600 hover:text-blue-700 font-medium py-2 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('#quote')}
                className="block w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center py-20 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt="Fire Sprinkler System"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Expert Fire Sprinkler Systems for Your Property
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-10 font-medium">
              Fully Compliant Fire Safety Solutions | BS 9251 & BS 9990 Certified
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('#quote')}
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-lg font-bold text-xl transition-all shadow-lg hover:shadow-red-900/20"
              >
                Get a Free Quote
              </button>
              <button
                onClick={() => scrollToSection('#services')}
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white px-10 py-5 rounded-lg font-bold text-xl transition-all"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Guarantee Bar */}
      <section className="bg-blue-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center justify-center text-center">
              <ShieldCheck className="text-white mr-3 flex-shrink-0" size={32} />
              <span className="text-white font-semibold text-lg">BS 9251 Certified</span>
            </div>
            <div className="flex items-center justify-center text-center">
              <Shield className="text-white mr-3 flex-shrink-0" size={32} />
              <span className="text-white font-semibold text-lg">BS 9990 Certified</span>
            </div>
            <div className="flex items-center justify-center text-center">
              <ClipboardCheck className="text-white mr-3 flex-shrink-0" size={32} />
              <span className="text-white font-semibold text-lg">Free Site Surveys</span>
            </div>
            <div className="flex items-center justify-center text-center">
              <HardHat className="text-white mr-3 flex-shrink-0" size={32} />
              <span className="text-white font-semibold text-lg">Fully Insured Engineers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-700 text-center mb-12">
            Our Fire Protection Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex justify-center mb-4">
                <Home className="text-blue-700" size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                Domestic & Residential
              </h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Protecting homes with discreet, life-saving systems.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex justify-center mb-4">
                <Building className="text-blue-700" size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                Commercial & Industrial
              </h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Robust solutions for retail, offices, and warehouses.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex justify-center mb-4">
                <PenTool className="text-blue-700" size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                System Design
              </h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Custom CAD designs and hydraulic calculations to UK standards.
              </p>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex justify-center mb-4">
                <Wrench className="text-blue-700" size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                Servicing & Maintenance
              </h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Comprehensive testing and repairs to ensure compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-4xl font-bold text-blue-700 mb-6">
                Dedicated to Fire Safety & Engineering Standards
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="text-red-600 mr-3 flex-shrink-0 mt-1" size={24} />
                  <p className="text-slate-600 text-lg">
                    Qualified, certified engineers.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-red-600 mr-3 flex-shrink-0 mt-1" size={24} />
                  <p className="text-slate-600 text-lg">
                    Custom designs tailored to your specific property.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-red-600 mr-3 flex-shrink-0 mt-1" size={24} />
                  <p className="text-slate-600 text-lg">
                    Strict safety-first approach to all installations.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-red-600 mr-3 flex-shrink-0 mt-1" size={24} />
                  <p className="text-slate-600 text-lg">
                    Transparent pricing and clear communication.
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-96 lg:h-full min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="Modern high-rise office building"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-700 text-center mb-12">
            Our Installations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group">
              <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Residential Installation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-center mt-4 text-slate-700 font-semibold">
                Residential Installation
              </p>
            </div>

            {/* Project 2 */}
            <div className="group">
              <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Commercial Sprinkler System"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-center mt-4 text-slate-700 font-semibold">
                Commercial Sprinkler System
              </p>
            </div>

            {/* Project 3 */}
            <div className="group">
              <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                  alt="Industrial Installation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-center mt-4 text-slate-700 font-semibold">
                Industrial Installation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-red-600 px-6 py-6">
                <h3 className="text-white text-3xl font-bold text-center">Get Your Free Quote</h3>
                <p className="text-red-100 text-center mt-2">Professional fire protection tailored to your property</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Form Side */}
                <div className="p-0">
                  <iframe
                    data-tally-src="https://tally.so/embed/GxrAje?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                    loading="lazy"
                    width="100%"
                    height="500"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="R&D Sprinklers Quote Form"
                    className="border-0"
                  />
                </div>

                {/* Info Side */}
                <div className="bg-slate-50 p-8 border-l border-slate-100">
                  <h4 className="text-slate-900 text-xl font-bold mb-6 flex items-center">
                    <CheckCircle className="text-blue-700 mr-2" size={24} />
                    What Happens Next?
                  </h4>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">1</div>
                      <div>
                        <p className="text-slate-900 font-semibold">Submit Form</p>
                        <p className="text-slate-600 text-sm">Send us your details and property type.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">2</div>
                      <div>
                        <p className="text-slate-900 font-semibold">Free Survey</p>
                        <p className="text-slate-600 text-sm">We'll arrange a site assessment at your convenience.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">3</div>
                      <div>
                        <p className="text-slate-900 font-semibold">Detailed Quote</p>
                        <p className="text-slate-600 text-sm">Receive a tailored, no-obligation proposal.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-slate-200 space-y-4">
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <ShieldCheck className="text-green-600 mr-3" size={20} />
                      GDPR COMPLIANT DATA HANDLING
                    </div>
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <ShieldCheck className="text-green-600 mr-3" size={20} />
                      FULLY INSURED & CERTIFIED ENGINEERS
                    </div>
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <ShieldCheck className="text-green-600 mr-3" size={20} />
                      BS 9251 & BS 9990 COMPLIANT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Side */}
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">R&D Sprinklers</h3>
              <p className="text-slate-300 leading-relaxed">
                Protecting property to the highest UK standards.
              </p>
            </div>

            {/* Right Side */}
            <div className="md:text-right">
              <p className="text-slate-300 leading-relaxed mb-2">
                <span className="font-semibold">R&D SPRINKLERS LIMITED</span>
              </p>
              <p className="text-slate-400 text-sm">
                Company Number: 17068525
              </p>
              <p className="text-slate-400 text-sm">
                Registered in England and Wales
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              Copyright 2026. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
