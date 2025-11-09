import { Link } from 'react-router-dom';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Droplet,
  Users,
  Hospital,
  Camera,
  Shield,
  Clock,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 mt-auto relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-red-500 rounded-full blur-3xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">BloodBridge</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Connecting life-savers with those in need. Our platform has facilitated over 8,750 donations and saved 26,250+ lives.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                ISO 27001 Certified Platform
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                24/7 Emergency Support
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Award className="w-4 h-4 mr-2 text-yellow-500" />
                Healthcare Excellence Award 2024
              </div>
            </div>
            
            {!user ? (
              <Link 
                to="/signup" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Link>
            ) : (
              <Link 
                to="/requests" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <Droplet className="w-4 h-4 mr-2" />
                Donate Now
              </Link>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/requests" className="text-gray-600 hover:text-red-600 transition-colors flex items-center group">
                  <Droplet className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-300" />
                  Find Blood Requests
                </Link>
              </li>
              <li>
                <Link to="/create-request" className="text-gray-600 hover:text-red-600 transition-colors flex items-center group">
                  <Hospital className="w-4 h-4 mr-3 text-blue-400 group-hover:text-blue-300" />
                  Request Blood
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-600 hover:text-red-600 transition-colors flex items-center group">
                  <Camera className="w-4 h-4 mr-3 text-green-400 group-hover:text-green-300" />
                  Donor Gallery
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-red-600 transition-colors flex items-center group">
                  <Users className="w-4 h-4 mr-3 text-purple-400 group-hover:text-purple-300" />
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-red-600 transition-colors">
                  About BloodBridge
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-red-600 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Get in Touch</h3>
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4 mb-6">
              <h4 className="text-red-700 font-semibold mb-2 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Hotline
              </h4>
              <p className="text-gray-800 font-bold text-lg">+91 8882096255</p>
              <p className="text-red-600 text-sm">Available 24/7</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-gray-500" />
                <span className="text-sm">shoryataneja5@gmail.com</span>
              </li>
              <li className="flex items-start text-gray-600">
                <MapPin className="w-4 h-4 mr-3 text-gray-500 mt-0.5" />
                <span className="text-sm">123 Healthcare Ave<br />Medical District, NY 10001</span>
              </li>
            </ul>
            <div>
              <h4 className="text-gray-800 font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-red-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-red-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-red-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-red-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 BloodBridge. Saving lives through technology. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-red-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-red-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-red-600 transition-colors">Cookies</a>
              <span className="flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-500" fill="currentColor" /> for humanity
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;