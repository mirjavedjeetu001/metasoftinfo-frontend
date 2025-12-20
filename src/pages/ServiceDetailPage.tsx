import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../api/content';
import { ArrowLeft } from 'lucide-react';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const { data: services } = useQuery({ queryKey: ['services'], queryFn: fetchServices });
  const service = services?.find((s: any) => s.id === id);

  if (!services) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Service not found</p>
          <Link to="/" className="text-gray-900 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 py-12 max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to homepage
        </Link>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{service.summary}</p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {service.description || service.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Professional expertise</li>
                <li>• Scalable solutions</li>
                <li>• Timely delivery</li>
                <li>• Ongoing support</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Modern frameworks</li>
                <li>• Cloud infrastructure</li>
                <li>• Best practices</li>
                <li>• Security first</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/#contact"
              className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition inline-block"
            >
              Get Started
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
