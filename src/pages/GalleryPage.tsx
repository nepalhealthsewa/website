import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/mockData';
import { Modal } from '../components/ui/Modal';
import { MapPin } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_IMAGES)[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (selectedCategory === 'All') return true;
    return img.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Community Photo Gallery"
        description="View photo moments of impact from voluntary blood donation drives, oxygen relief deliveries, and health awareness seminars in Nepal."
        keywords="Nepal Health Sewa photos, blood donation gallery Birgunj, Parsa health camp pictures"
      />
      <div className="border-b border-slate-200 pb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
          Moments of Impact
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Community Gallery
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Photo highlights of voluntary blood donation drives, oxygen logistics support, and public wellness awareness events across Nepal.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Blood Donation', 'Oxygen Supply', 'Public Health'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredImages.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all relative bg-slate-100"
          >
            <div className="h-72 sm:h-80 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.date}</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Contribution CTA */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Have Photos from a Nepal Health Sewa Blood Camp?
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Volunteers and camp attendees are invited to contribute high-resolution photo moments to our public archive.
          </p>
        </div>
        <a
          href="mailto:Nepalhealthsewa@gmail.com?subject=Community%20Gallery%20Submission"
          className="px-4 py-2 bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold shrink-0 transition-colors"
        >
          Email Photos
        </a>
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title || 'Community Photograph'}
        description={selectedImage?.date}
        maxWidth="2xl"
      >
        {selectedImage && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden max-h-[70vh]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>{selectedImage.category}</span>
              <span>Nepal Health Sewa Archive</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
