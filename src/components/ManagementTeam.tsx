import { useQuery } from '@tanstack/react-query';
import { fetchTeamMembersByCategory } from '../api/cms';
import type { TeamMember } from '../types';
import { Mail, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export default function ManagementTeam() {
  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ['team-members', 'management'],
    queryFn: () => fetchTeamMembersByCategory('management'),
  });

  if (isLoading) {
    return (
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-[#6C5DD3]">Management Team</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Meet the visionary leaders driving innovation and excellence at Metasoft Info Solution
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-[#6C5DD3] to-[#8B7FE8] p-4">
                <div className="aspect-[3/4] w-full">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-[#6C5DD3] font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{member.designation}</p>
                
                {member.bio && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                )}

                {/* Social Links */}
                <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-[#6C5DD3] text-gray-700 hover:text-white transition-colors duration-300"
                      aria-label="Email"
                    >
                      <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-100 hover:bg-[#6C5DD3] text-gray-700 hover:text-white transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-100 hover:bg-[#6C5DD3] text-gray-700 hover:text-white transition-colors duration-300"
                      aria-label="Twitter"
                    >
                      <Twitter size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </a>
                  )}
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-100 hover:bg-[#6C5DD3] text-gray-700 hover:text-white transition-colors duration-300"
                      aria-label="Facebook"
                    >
                      <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-100 hover:bg-[#6C5DD3] text-gray-700 hover:text-white transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
