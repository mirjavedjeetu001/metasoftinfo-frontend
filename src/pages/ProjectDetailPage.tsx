import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../api/content';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects });
  const project = projects?.find((p: any) => p.id === id);

  if (!projects) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Project not found</p>
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

        <article>
          <div className="h-80 bg-gray-100 rounded-lg mb-8 flex items-center justify-center text-gray-400">
            Project Image
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{project.summary}</p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {project.description || project.summary}
            </p>
            
            <div className="flex items-center gap-4">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  View Live Project
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Challenge</h3>
              <p className="text-gray-700">
                Building a scalable solution that meets modern standards and user expectations.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Solution</h3>
              <p className="text-gray-700">
                Implemented cutting-edge technologies with a focus on performance and reliability.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact</h3>
              <p className="text-gray-700">
                Delivered measurable results with improved efficiency and user satisfaction.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/#projects"
              className="px-8 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition inline-block"
            >
              View More Projects
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
