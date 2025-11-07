import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={32} fill="currentColor" className="text-primary" />
              <span className="heading-md text-white">BloodBridge</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Connecting donors with those in need. Every drop counts, every donation saves lives.
            </p>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Become a Donor
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="heading-sm text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/requests" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Find Blood
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="heading-sm text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/create-request" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="heading-sm text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span className="text-sm text-gray-300">info@bloodbridge.org</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-1" />
                <span className="text-sm text-gray-300">123 Healthcare Ave, Medical District, NY 10001</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="divider divider-neutral mt-8"></div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            © 2024 BloodBridge. Made with ❤️ to save lives. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;