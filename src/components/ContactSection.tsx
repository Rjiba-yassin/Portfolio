import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Get In <span className="text-green-400">Touch</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Feel free to contact me for any project or collaboration. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-800 p-4 rounded-lg text-green-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Email</h3>
                  <p className="text-gray-400">rjibayassine7@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gray-800 p-4 rounded-lg text-green-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Phone</h3>
                  <p className="text-gray-400">+216 54245936</p>
                  <p className="text-gray-400">+216 92470938</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gray-800 p-4 rounded-lg text-green-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Location</h3>
                  <p className="text-gray-400">Beb bhar</p>
                  <p className="text-gray-400">Sousse, Tunis</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Send Message
                  <Send size={18} className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;