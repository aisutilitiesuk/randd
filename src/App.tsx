import { useState, type FormEvent } from 'react';
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
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
} from 'lucide-react';
import heroBg from './assets/hero-bg.jpg';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: 'Domestic & Residential',
    postcode: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quote request. Please try again.');
      }

      setFormStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        propertyType: 'Domestic & Residential',
        postcode: '',
        message: '',
      });
    } catch (err: unknown) {
      console.error('Form submission error:', err);
      setFormStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to submit your request at this moment. Please email us directly at enquiries@randdsprinklers.co.uk'
      );
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
              <a
                href="mailto:enquiries@randdsprinklers.co.uk"
                className="text-slate-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1.5"
              >
                <Mail size={16} />
                <span>enquiries@randdsprinklers.co.uk</span>
              </a>
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
                aria-label="Toggle Menu"
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
              <a
                href="mailto:enquiries@randdsprinklers.co.uk"
                className="flex items-center gap-2 text-slate-600 hover:text-blue-700 font-medium py-2 transition-colors"
              >
                <Mail size={18} />
                <span>enquiries@randdsprinklers.co.uk</span>
              </a>
              <button
                onClick={() => scrollToSection('#quote')}
                className="block w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center py-20 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
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

      {/* Quote Section with Brevo Integration */}
      <section id="quote" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-red-600 px-6 py-6">
                <h3 className="text-white text-3xl font-bold text-center">Get Your Free Quote</h3>
                <p className="text-red-100 text-center mt-2">
                  Professional fire protection tailored to your property
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Form Side */}
                <div className="p-6 sm:p-8">
                  {formStatus === 'success' ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={36} />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900">Thank You!</h4>
                      <p className="text-slate-600 text-base leading-relaxed">
                        Your quote request has been sent successfully. One of our certified engineers
                        will review your project details and contact you shortly.
                      </p>
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => setFormStatus('idle')}
                          className="text-blue-700 font-semibold hover:text-blue-800 text-sm underline"
                        >
                          Submit another enquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {formStatus === 'error' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700 text-sm">
                          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-semibold text-slate-700 mb-1"
                          >
                            First Name <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-semibold text-slate-700 mb-1"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Smith"
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-slate-700 mb-1"
                        >
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-slate-700 mb-1"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="07123 456789"
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="postcode"
                            className="block text-sm font-semibold text-slate-700 mb-1"
                          >
                            Postcode / Area
                          </label>
                          <input
                            type="text"
                            id="postcode"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                            placeholder="e.g. SW1A 1AA"
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="propertyType"
                          className="block text-sm font-semibold text-slate-700 mb-1"
                        >
                          Service / Property Type
                        </label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                        >
                          <option value="Domestic & Residential">Domestic & Residential</option>
                          <option value="Commercial & Industrial">Commercial & Industrial</option>
                          <option value="System Design & CAD">System Design & CAD</option>
                          <option value="Servicing & Maintenance">Servicing & Maintenance</option>
                          <option value="Other">Other Fire Protection Enquiry</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold text-slate-700 mb-1"
                        >
                          Project Details / Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your project requirements..."
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Sending Quote Request...</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Request Free Quote</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Info Side */}
                <div className="bg-slate-50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between">
                  <div>
                    <h4 className="text-slate-900 text-xl font-bold mb-6 flex items-center">
                      <CheckCircle className="text-blue-700 mr-2" size={24} />
                      What Happens Next?
                    </h4>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">
                          1
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">Submit Form</p>
                          <p className="text-slate-600 text-sm">
                            Send us your project details and requirements.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">
                          2
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">Free Survey</p>
                          <p className="text-slate-600 text-sm">
                            We'll arrange a site assessment at your convenience.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">
                          3
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">Detailed Proposal</p>
                          <p className="text-slate-600 text-sm">
                            Receive a tailored, no-obligation proposal to BS standards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
                    <div className="flex items-center text-sm text-slate-700 font-medium">
                      <Mail className="text-blue-700 mr-3 flex-shrink-0" size={18} />
                      <a
                        href="mailto:enquiries@randdsprinklers.co.uk"
                        className="hover:text-blue-700 hover:underline break-all"
                      >
                        enquiries@randdsprinklers.co.uk
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <ShieldCheck className="text-green-600 mr-3 flex-shrink-0" size={18} />
                      <span>GDPR COMPLIANT DATA HANDLING</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <ShieldCheck className="text-green-600 mr-3 flex-shrink-0" size={18} />
                      <span>FULLY INSURED & CERTIFIED ENGINEERS</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <ShieldCheck className="text-green-600 mr-3 flex-shrink-0" size={18} />
                      <span>BS 9251 & BS 9990 COMPLIANT</span>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">R&D Sprinklers</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Protecting properties and saving lives to the highest UK fire safety standards.
              </p>
              <div className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors">
                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:enquiries@randdsprinklers.co.uk"
                  className="font-medium underline hover:text-blue-200"
                >
                  enquiries@randdsprinklers.co.uk
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection('#home')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#services')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Services & Design
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#why-us')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Why Choose Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#projects')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Installations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#quote')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Get a Quote
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Column / Company Details */}
            <div className="md:text-right">
              <p className="text-slate-300 leading-relaxed mb-2">
                <span className="font-semibold text-white">R&D SPRINKLERS LIMITED</span>
              </p>
              <p className="text-slate-400 text-sm">Company Number: 17068525</p>
              <p className="text-slate-400 text-sm mb-3">Registered in England and Wales</p>
              <div className="flex md:justify-end items-center gap-2 text-slate-300 text-sm">
                <Mail size={16} className="text-blue-400" />
                <a
                  href="mailto:enquiries@randdsprinklers.co.uk"
                  className="hover:text-blue-400 transition-colors"
                >
                  enquiries@randdsprinklers.co.uk
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} R&D Sprinklers Limited. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs">
              BS 9251 & BS 9990 Compliant Fire Protection Systems
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
