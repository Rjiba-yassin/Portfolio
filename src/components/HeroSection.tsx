import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import rjiba from './assetes/rjiba.jpg';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen bg-gray-900 flex items-center pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Mohamed Yassine Rjiba
            </h1>
            <h2 className="mt-4 text-xl md:text-2xl text-gray-300">
            Je suis un <span className="text-green-400 font-medium">Développeur </span>
            </h2>
            <p className="mt-6 text-gray-400 max-w-xl leading-relaxed">
            Je suis récemment diplômé en technologie de l'informatique, spécialisé en systèmes
embarqués et mobiles, de l'Institut Supérieur des études technologiques de Sousse. Je
dispose d'un grand sens de l'organisation et d'une capacité à prendre des initiatives, ainsi
que d'une connaissance approfondie des systèmes embarqués, du développement mobile
et web. Je suis à la recherche d'une opportunité pour mettre en pratique mes compétences
et développer ma carrière.

            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
            <a 
  href="/CV_yassin_rjiba.pdf" 
  download
  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
>
  Download CV
</a>
              
              <div className="flex space-x-4 items-center">
                <a 
                  href="https://github.com/Rjiba-yassin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 p-3 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300">
                  <Github size={20} />
                </a>
                <a 
                  href="https://github.com/Rjiba-yassin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 p-3 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-800 relative z-10">
              <img 
  src={rjiba} 
  alt="Mohamed" 
  className="w-full h-full object-cover object-center"
/>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-green-400 z-0 animate-pulse-slow" style={{ 
                width: 'calc(100% + 40px)',
                height: 'calc(100% + 40px)',
                top: '-20px',
                left: '-20px',
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;