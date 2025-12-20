import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../api/content';
import { ExternalLink } from 'lucide-react';

export default function ProjectsPage() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing our successful implementations and client solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project: any) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
            >
              {project.imageUrl && (
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.summary}</p>
                
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.split(',').map((tag: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <Link
                    to={`/projects/${project.id}`}
                    className="flex-1 px-4 py-2 bg-gray-900 text-white text-center rounded-lg hover:bg-gray-800 transition font-semibold"
                  >
                    View Details
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!projects || projects.length === 0) && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No projects available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
