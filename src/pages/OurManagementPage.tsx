import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamMembers, fetchTeamCategories } from '../api/cms';
import type { TeamMember } from '../types';
import { Mail, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export default function OurManagementPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: allMembers, isLoading: membersLoading } = useQuery<TeamMember[]>({
    queryKey: ['team-members'],
    queryFn: fetchTeamMembers,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<string[]>({
    queryKey: ['team-categories'],
    queryFn: fetchTeamCategories,
  });

  const filteredMembers =
    selectedCategory === 'all'
      ? allMembers
      : allMembers?.filter((member) => member.category === selectedCategory);

  if (membersLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="h-80 bg-gray-200 rounded-xl"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1D1D35] to-[#6C5DD3] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Meet Our <span className="text-yellow-400">Team</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto px-4">
            The talented individuals behind Metasoft Info Solution's success
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-10 bg-white shadow-md py-4 sm:py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                selectedCategory === 'all'
                  ? 'bg-[#6C5DD3] text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Team
            </button>
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 capitalize text-sm sm:text-base ${
                  selectedCategory === category
                    ? 'bg-[#6C5DD3] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {filteredMembers && filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {filteredMembers.map((member) => (
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
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 sm:top-8 right-6 sm:right-8">
                      <span className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#6C5DD3] capitalize">
                        {member.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-[#6C5DD3] font-semibold text-xs sm:text-sm mb-2 sm:mb-3">{member.designation}</p>
                    
                    {member.bio && (
                      <p className="text-gray-600 text-xs mb-3 sm:mb-4 line-clamp-2">{member.bio}</p>
                    )}

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-[#6C5DD3] text-gray-700 hover:text-white transition-colors duration-300"
                          aria-label="Email"
                        >
                          <Mail size={14} className="sm:w-4 sm:h-4" />
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
                          <Linkedin size={14} className="sm:w-4 sm:h-4" />
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
                          <Twitter size={14} className="sm:w-4 sm:h-4" />
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
                          <Facebook size={14} className="sm:w-4 sm:h-4" />
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
                          <Instagram size={14} className="sm:w-4 sm:h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20">
              <p className="text-gray-500 text-lg sm:text-xl">No team members found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
