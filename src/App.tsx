import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ResumeSection from './components/ResumeSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.title = 'Rjiba - Personal Portfolio';
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ResumeSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;