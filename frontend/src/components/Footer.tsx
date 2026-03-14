import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-leaf-800 text-leaf-100 py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Leafy Garden Companion</p>
            <p className="text-xs mt-1 text-leaf-300">Helping plants thrive, one leaf at a time</p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-leaf-300 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <span className="text-xs flex items-center">
              Made with <Heart size={14} className="mx-1 text-blossom-400" /> for plants
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;