import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials } from '../api/content';

export default function TestimonialsPage() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Client Testimonials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            What our clients say about working with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial: any) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < testimonial.rating ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}
                  >
                    ★
                  </span>
                ))}
              </div>
              
              <p className="text-gray-700 mb-4 italic">"{testimonial.message}"</p>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{testimonial.clientName}</p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>

        {(!testimonials || testimonials.length === 0) && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No testimonials available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
