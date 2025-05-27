import React, { useState } from 'react';

type TabType = 'experience' | 'education' | 'skills' | 'about';

interface Experience {
  period: string;
  position: string;
  company: string;
  companyColor: string;
  description: string;
}

interface SkillIcon {
  name: string;
  icon: string;
}

const ResumeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('experience');

  const experiences: Experience[] = [
    {
      period: '2022',
      position: 'Stage initiation',
      company: 'Tunisie Télécom',
      companyColor: 'text-green-400',
      description: 'communication avec les clients       déplacé vers plusieurs société pour construire des fibre optique'
    },
    {
      period: '2023',
      position: 'Stage Technicien',
      company: 'Leoni',
      companyColor: 'text-green-400',
      description: 'J ai intégré et développé une application de calcul en Java avec des interfaces utilisateurs intuitives et faciles à utiliser, démontrant ainsi ma capacité à créer des solutions logicielles robustes et fonctionnelles.'
    },
    {
      period: '2024',
      position: 'Stage Pfe',
      company: 'LEONI',
      companyColor: 'text-green-400',
      description: 'J ai créé une application web et mobile de gestion des visas et des visites, automatisant les processus, centralisant les documents, et améliorant la communication pour accélérer le traitement des demandes.'
    },
    {
      period: '2024 - Present',
      position: 'Technicien informatique',
      company: 'Clinique les oliviers',
      companyColor: 'text-green-400',
      description: '- Installation, maintenance et dépannage des équipements informatiques.Gestion du réseau local (LAN) et des connexions sécurisées. Assistance technique aux utilisateurs et résolution des problèmes liés aux systèmes d information. Diagnostic et réparation des ordinateurs (remplacement de disque dur, installation de systèmes d exploitation, etc.)  Veille technologique permanente. Assistez les utilisateurs dans l usage de l ERP Clinisys'
      }
  ];

  const skillIcons: SkillIcon[] = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <div>
            <p className="text-gray-400 mb-8">
            J'ai acquis de l'expérience dans différents domaines de l'informatique, notamment dans la gestion des infrastructures réseau et la maintenance des systèmes. J'ai travaillé sur des projets d'envergure, en collaborant avec des équipes pluridisciplinaires pour améliorer la performance et la sécurité des systèmes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="text-green-400 font-medium mb-2">{exp.period}</div>
                  <h3 className="text-xl font-semibold text-white mb-1">{exp.position}</h3>
                  <div className={`flex items-center gap-2 mb-4`}>
                    <span className={`h-2 w-2 rounded-full ${exp.companyColor}`}></span>
                    <span className="text-gray-400">{exp.company}</span>
                  </div>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        return (
          <div>
            <p className="text-gray-400 mb-8">
            Voici une sélection des compétences techniques que j'ai acquises au cours de mes expériences professionnelles. J'ai une expertise dans des domaines tels que le développement web, la gestion des systèmes et des réseaux, ainsi que la mise en place d'architectures sécurisées.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {skillIcons.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center border border-gray-700 hover:border-green-400/50 transition-all duration-300"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-16 h-16 mb-3 filter invert"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        return (
          <div>
            <p className="text-gray-400 mb-8">
            J'ai suivi des formations approfondies dans des domaines clés de l'informatique et du design. Ces parcours m'ont permis d'acquérir des connaissances solides en développement logiciel et en gestion des systèmes d'information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-green-400 font-medium mb-2">2018 - 2021</div>
                <h3 className="text-xl font-semibold text-white mb-1">Baccalaureat en sciences de technique                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  <span className="text-gray-400"> Lycée technique de sousse </span>
                </div>
               
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-green-400 font-medium mb-2">2021 - 2024</div>
                <h3 className="text-xl font-semibold text-white mb-1">Diplome en technologie de l'informatique
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  <span className="text-gray-400">Institut Supérieur des études technologiques de Sousse </span>
                </div>
     
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div>
            <p className="text-gray-400 mb-6">
            Passionné par la technologie, je m'efforce d'apporter des solutions innovantes pour améliorer les systèmes informatiques. Je suis constamment à la recherche de nouvelles opportunités pour mettre à profit mes compétences en développement et en gestion de projet.            </p>
            <p className="text-gray-400 mb-6">
              
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Personal Info</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="font-medium text-white w-24">Name:</span>
                    <span className="text-gray-400">Mohamed Yassine Rjiba</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium text-white w-24">Age:</span>
                    <span className="text-gray-400">23 Years</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium text-white w-24">Location:</span>
                    <span className="text-gray-400">Souuse ,tunis</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium text-white w-24">Email:</span>
                    <span className="text-gray-400">rjibayassine7@gmail.com</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">My Interests</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-gray-400">Web Design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-gray-400">Mobile Design </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-gray-400">Music</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-gray-400">Gaming</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-gray-400">Traveling</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-gray-400">Reading</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="resume" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Pourquoi m'embaucher ?  
            </h2>
            <p className="text-gray-400 mb-12">
            Grâce à mon expertise en infrastructure informatique et en résolution de problèmes, je propose des solutions efficaces et suis toujours à jour avec les dernières technologies.
            </p>

            <div className="space-y-3">
              <button
                className={`w-full py-4 px-6 text-left transition-all rounded-lg ${
                  activeTab === 'experience'
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('experience')}
              >
                <span className={activeTab === 'experience' ? 'text-green-400' : 'text-white'}>
                  Experience
                </span>
              </button>
              
              <button
                className={`w-full py-4 px-6 text-left transition-all rounded-lg ${
                  activeTab === 'education'
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('education')}
              >
                <span className={activeTab === 'education' ? 'text-green-400' : 'text-white'}>
                  Education
                </span>
              </button>
              
              <button
                className={`w-full py-4 px-6 text-left transition-all rounded-lg ${
                  activeTab === 'skills'
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('skills')}
              >
                <span className={activeTab === 'skills' ? 'text-green-400' : 'text-white'}>
                  Skills
                </span>
              </button>
              
              <button
                className={`w-full py-4 px-6 text-left transition-all rounded-lg ${
                  activeTab === 'about'
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('about')}
              >
                <span className={activeTab === 'about' ? 'text-green-400' : 'text-white'}>
                  About Me
                </span>
              </button>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              My <span className="text-green-400">
                {activeTab === 'experience' && 'Experience'}
                {activeTab === 'education' && 'Education'}
                {activeTab === 'skills' && 'Skills'}
                {activeTab === 'about' && 'Story'}
              </span>
            </h2>
            
            {renderTabContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;