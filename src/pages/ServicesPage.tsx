import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchServices } from '../api/content';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service: any) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition group"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{service.summary}</p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {(!services || services.length === 0) && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No services available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
