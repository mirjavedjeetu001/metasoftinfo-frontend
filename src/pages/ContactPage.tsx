import { useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { submitContactForm, fetchContactSettings } from '../api/cms';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ['contact-settings'],
    queryFn: fetchContactSettings,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await submitContactForm(formData);
      setStatus('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
            {settings?.heroTitle || "Let's Build Something Great Together"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto">
            {settings?.heroSubtitle || "Ready to transform your ideas into reality? Get in touch with our team and let's discuss your project."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                {settings?.sectionTitle || 'Get In Touch'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {settings?.sectionDescription || 'Have a question or want to work together? Fill out the form or reach out directly using the information below.'}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center shadow-md">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <a href={`mailto:${settings?.email || 'info@metasoftinfo.com'}`} className="text-sm sm:text-base text-blue-600 hover:text-blue-800">
                    {settings?.email || 'info@metasoftinfo.com'}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center shadow-md">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                  <a href={`tel:${settings?.phone || '+1234567890'}`} className="text-sm sm:text-base text-blue-600 hover:text-blue-800">
                    {settings?.phone || '+1 (234) 567-890'}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center shadow-md">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Office</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {settings?.addressLine1 || '123 Business St, Suite 100'}<br />
                    {settings?.addressLine2 || 'San Francisco, CA 94107'}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm sm:text-base text-gray-700">
                <p>{settings?.businessHours1 || 'Monday - Friday: 9:00 AM - 6:00 PM'}</p>
                <p>{settings?.businessHours2 || 'Saturday: 10:00 AM - 4:00 PM'}</p>
                <p>{settings?.businessHours3 || 'Sunday: Closed'}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Send Us A Message</h2>
            
            {status && (
              <div className={`mb-6 p-4 rounded-lg ${status.includes('Failed') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'}`}>
                <p className="text-sm sm:text-base">{status}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:border-gray-900 focus:outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:border-gray-900 focus:outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:border-gray-900 focus:outline-none transition"
                  placeholder="+1 (234) 567-890"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:border-gray-900 focus:outline-none transition"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:border-gray-900 focus:outline-none resize-none transition"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-600 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-lg"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
