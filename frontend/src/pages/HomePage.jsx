import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Save Lives with <span className="text-primary">BloodBridge</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect blood donors with those in need. A simple, trustworthy platform 
            that makes blood donation accessible and rewarding for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? "/requests" : "/signup"}
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Find Blood
            </Link>
            <Link
              to={user ? "/create-request" : "/signup"}
              className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Request Blood
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🩸</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Donation</h3>
            <p className="text-gray-600">Simple process to join donation queues and help those in need</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Requests</h3>
            <p className="text-gray-600">Create blood requests instantly and connect with willing donors</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Recognition</h3>
            <p className="text-gray-600">Get digital certificates for your life-saving contributions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;