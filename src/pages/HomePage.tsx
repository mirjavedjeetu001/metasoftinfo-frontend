import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchServices, fetchTestimonials } from '../api/content';
import { fetchHero, fetchPartners } from '../api/cms';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import ManagementTeam from '../components/ManagementTeam';

export default function HomePage() {
  const servicesQuery = useQuery({ queryKey: ['services'], queryFn: fetchServices });
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects });
  const testimonialsQuery = useQuery({ queryKey: ['testimonials'], queryFn: fetchTestimonials });
  const heroQuery = useQuery({ queryKey: ['hero'], queryFn: fetchHero });
  const partnersQuery = useQuery({ queryKey: ['partners'], queryFn: fetchPartners });

  const services = useMemo(() => servicesQuery.data ?? [], [servicesQuery.data]);
  const projects = useMemo(() => projectsQuery.data ?? [], [projectsQuery.data]);
  const testimonials = useMemo(() => testimonialsQuery.data ?? [], [testimonialsQuery.data]);
  const partners = useMemo(() => partnersQuery.data ?? [], [partnersQuery.data]);
  const hero = heroQuery.data;

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Carousel */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
        {/* Hero Carousel */}
        <div className="mb-8 sm:mb-12">
          <HeroCarousel />
        </div>

        {/* Hero Content */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {hero?.title || 'Scale Your Dev Team With Top Talent in 4 Weeks'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            {hero?.subtitle || 'We architect, design, and deliver world-class digital products. From concept to launch, we build solutions that drive your business forward.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              to={hero?.primaryCtaLink || '/contact'} 
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition text-sm sm:text-base text-center"
            >
              {hero?.primaryCta || 'Start Your Project'}
            </Link>
            <Link 
              to={hero?.secondaryCtaLink || '/contact'} 
              className="px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition text-sm sm:text-base text-center"
            >
              {hero?.secondaryCta || 'Schedule a Call'}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-gray-200">
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">{hero?.stat1Value || 120}+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">{hero?.stat1Label || 'Projects Shipped'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">{hero?.stat2Value || 18}+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">{hero?.stat2Label || 'Years Experience'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">{hero?.stat3Value || 98}%</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">{hero?.stat3Label || 'Client Satisfaction'}</div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Infinite Slider */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto border-t border-gray-200 overflow-hidden">
        <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">Trusted By Fast-Moving Tech Teams From Startups to Enterprises</p>
        
        {/* Infinite Scrolling Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Slider Track */}
          <div className="flex animate-scroll-partners">
            {/* First set of logos */}
            {partners.length > 0 ? partners.map((partner: any, index: number) => (
              partner.websiteUrl ? (
                <a 
                  key={`partner-1-${partner.id}-${index}`}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 h-16 sm:h-20 w-32 sm:w-40 flex items-center justify-center hover:opacity-75 transition px-4 sm:px-6"
                >
                  <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-full object-contain" />
                </a>
              ) : (
                <div key={`partner-1-${partner.id}-${index}`} className="flex-shrink-0 h-16 sm:h-20 w-32 sm:w-40 flex items-center justify-center px-4 sm:px-6">
                  <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-full object-contain" />
                </div>
              )
            )) : (
              [1, 2, 3, 4, 5].map(i => (
                <div key={`logo-1-${i}`} className="flex-shrink-0 h-16 sm:h-20 w-32 sm:w-40 bg-gray-100 rounded flex items-center justify-center text-xs sm:text-sm text-gray-400 mx-2 sm:mx-3">
                  Logo {i}
                </div>
              ))
            )}
            
            {/* Duplicate set for seamless loop */}
            {partners.length > 0 ? partners.map((partner: any, index: number) => (
              partner.websiteUrl ? (
                <a 
                  key={`partner-2-${partner.id}-${index}`}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 h-16 sm:h-20 w-32 sm:w-40 flex items-center justify-center hover:opacity-75 transition px-4 sm:px-6"
                >
                  <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-full object-contain" />
                </a>
              ) : (
                <div key={`partner-2-${partner.id}-${index}`} className="flex-shrink-0 h-16 sm:h-20 w-32 sm:w-40 flex items-center justify-center px-4 sm:px-6">
                  <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-full object-contain" />
                </div>
              )
            )) : (
              [1, 2, 3, 4, 5].map(i => (
                <div key={`logo-2-${i}`} className="flex-shrink-0 h-16 sm:h-20 w-32 sm:w-40 bg-gray-100 rounded flex items-center justify-center text-xs sm:text-sm text-gray-400 mx-2 sm:mx-3">
                  Logo {i}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto border-t border-gray-200">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Drive Growth with Our Core Capabilities
          </h2>
          <p className="text-base sm:text-lg text-gray-600">Comprehensive solutions tailored to your tech company's unique challenges</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {services.length > 0 ? services.map(service => (
            <Link 
              key={service.id} 
              to={`/services/${service.id}`}
              className="p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition group cursor-pointer"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{service.summary}</p>
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-900 font-semibold group-hover:gap-3 transition">
                Explore <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </Link>
          )) : (
            <div className="md:col-span-2 text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">
              No services added yet. <span className="text-gray-900 cursor-pointer hover:underline">Add from admin panel</span>
            </div>
          )}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto border-t border-gray-200">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Case Studies
          </h2>
          <p className="text-base sm:text-lg text-gray-600">Check out our case studies that show how innovative solutions transformed businesses</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {projects.length > 0 ? projects.map(project => (
            <Link 
              key={project.id} 
              to={`/projects/${project.id}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition group"
            >
              <div className="h-32 sm:h-40 md:h-48 bg-gray-100 flex items-center justify-center text-sm sm:text-base text-gray-400 group-hover:bg-gray-200 transition">
                Project Image
              </div>
              <div className="p-4 sm:p-6">
                <div className="inline-block px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded mb-2 sm:mb-3">
                  {project.tags || 'Case Study'}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{project.summary}</p>
                <div className="text-sm sm:text-base text-gray-900 font-semibold group-hover:gap-2 transition flex items-center gap-1">
                  View Details <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </Link>
          )) : (
            <div className="md:col-span-2 text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">
              No projects added yet. <span className="text-gray-900 cursor-pointer hover:underline">Add from admin panel</span>
            </div>
          )}
        </div>
      </section>

      {/* Our Process Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto border-t border-gray-200">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Process: AI-Optimized, Transparent, Scalable
          </h2>
          <p className="text-base sm:text-lg text-gray-600">We blend human expertise with AI precision—delivering faster outcomes without compromising security</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { step: 1, title: 'AI-Powered Discovery Audit', desc: 'Free 60-min strategy session to analyze your tech stack' },
            { step: 2, title: 'Hybrid Team Onboarding', desc: 'Match with vetted engineers (800+ experts)' },
            { step: 3, title: 'Build with AI Guardrails', desc: 'AI pair-programming assistants (70% faster dev)' },
            { step: 4, title: 'Scale with Confidence', desc: 'AI-optimized cloud deployment' },
          ].map(process => (
            <div key={process.step} className="p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">Step {process.step}</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{process.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{process.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto border-t border-gray-200">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.length > 0 ? testimonials.map(t => (
            <div key={t.id} className="p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-base sm:text-lg ${i < t.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 italic">"{t.message}"</p>
              <div>
                <p className="text-sm sm:text-base font-semibold text-gray-900">{t.clientName}</p>
                <p className="text-xs sm:text-sm text-gray-600">{t.company}</p>
              </div>
            </div>
          )) : (
            <div className="md:col-span-3 text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">
              No testimonials added yet. <span className="text-gray-900 cursor-pointer hover:underline">Add from admin panel</span>
            </div>
          )}
        </div>
      </section>

      {/* Management Team Section */}
      <ManagementTeam />

      {/* Why Choose Us Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto border-t border-gray-200">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-12">Why Leading Companies Partner With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: 'Expert Team', desc: 'Senior developers with 10+ years experience' },
            { title: 'Agile Process', desc: 'Fast iteration, quick results, full transparency' },
            { title: 'Proven Track Record', desc: '120+ shipped projects across industries' },
            { title: 'Modern Tech', desc: 'Latest frameworks, tools, and best practices' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto border-t border-gray-200 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Ready to Scale Your Team?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
          Let's discuss how our resource augmentation and AI-powered development can accelerate your project delivery.
        </p>
        <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-900 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-800 transition">
          Schedule a Call
        </button>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto border-t border-gray-200 text-center text-sm sm:text-base text-gray-600">
        <p>© 2025 Metasoft Info. All rights reserved.</p>
      </footer>
    </div>
  );
}
