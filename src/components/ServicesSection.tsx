import React from 'react';
import { Code, Palette, Image, Video, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, isHighlighted }) => {
  return (
    <div className={`relative overflow-hidden group rounded-lg p-6 ${
      isHighlighted 
        ? 'bg-gray-800 border border-green-500/30' 
        : 'bg-gray-800 border border-gray-700'
    }`}>
      <div className="mb-4 flex justify-between items-start">
        <div className={`p-3 rounded-full ${isHighlighted ? 'text-green-400' : 'text-gray-400'}`}>
          {icon}
        </div>
        <div className="bg-gray-700 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight size={20} className="text-white" />
        </div>
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${isHighlighted ? 'text-green-400' : 'text-white'}`}>
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            My <span className="text-green-400">Services</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Web Development"
            description="Création de sites web modernes, rapides et responsives avec les dernières technologies comme React, Node.js et MongoDB."
            icon={<Code size={28} />}
            isHighlighted={true}
          />
           
           <ServiceCard
            title="Mobile  Development"
            description="Développement d'applications mobiles performantes pour Android et iOS avec une expérience fluide et intuitive."
            icon={<Image size={28} />}
          />
          <ServiceCard
            title="UI/UX Design"
            description="Conception d’interfaces élégantes, centrées sur l’utilisateur, alliant esthétique et simplicité d’utilisation."
            icon={<Palette size={28} />}
          />
         
          <ServiceCard
            title="Video Editing"
            description="Montage vidéo dynamique et professionnel pour réseaux sociaux, présentations ou vidéos promotionnelles."
            icon={<Video size={28} />}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;