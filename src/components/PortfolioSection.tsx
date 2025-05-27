import React, { useState } from 'react';
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import frontendImage from './assetes/a.jpg';
import frontendImage1 from './assetes/travel.jpg';
import frontendImage2 from './assetes/capture.jpg';


interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string;
  image: string;
}

const projects: Project[] = [
  {
    id: '01',
    number: '01',
    title: 'Application mobile de gestion des visa',
    description: 'J ai créé une application web et mobile de gestion des visas et des visites, qui automatise les démarches, centralise les documents et améliore la communication pour accélérer le traitement des demandes.',
    technologies: 'Flutter, Dart, Node.js, MongoDB',
    image: frontendImage  },
  {
    id: '02',
    number: '02',
    title: 'Application web de gestion des réservations d’hébergement',
    description: 'Jai développé un site web de réservation en ligne, permettant aux utilisateurs de rechercher, comparer et réserver des hébergements facilement, avec un système de gestion des disponibilités, des paiements et des avis.',
    technologies: 'React, Node.js, MongoDB',
    image: frontendImage1   },
  {
    id: '03',
    number: '03',
    title: 'Application Web E-commerce',
    description: 'Un site de commerce en ligne offrant la gestion des produits, le panier, le paiement sécurisé, et l’espace client.',
    technologies: 'React, Node.js, MongoDB',
    image: frontendImage2  }
];

const PortfolioSection: React.FC = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };
  
  const currentProject = projects[currentProjectIndex];

  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Latest <span className="text-green-400">Project</span>
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-2/5">
            <div className="text-8xl font-bold opacity-20 text-green-400 mb-4">
              {currentProject.number}
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {currentProject.title}
            </h3>
            <p className="text-gray-400 mb-6">
              {currentProject.description}
            </p>
            <div className="text-sm text-green-400 mb-8">
              {currentProject.technologies}
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 w-12 h-12 rounded-full transition-colors duration-300"
              >
                <ArrowUpRight size={20} className="text-white" />
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 w-12 h-12 rounded-full transition-colors duration-300"
              >
                <Github size={20} className="text-white" />
              </a>
            </div>
          </div>
          
          <div className="lg:w-3/5">
            <div className="relative">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={currentProject.image} 
                  alt={currentProject.title} 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute -bottom-6 right-10 flex space-x-2">
                <button 
                  onClick={prevProject}
                  className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button 
                  onClick={nextProject}
                  className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;