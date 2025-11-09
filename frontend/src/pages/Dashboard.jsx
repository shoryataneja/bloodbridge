import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome back, <span className="text-primary">{user?.name}</span>! 👋
            </h1>
            <p className="text-xl text-gray-600">Ready to make a difference today?</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 fade-in-up">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center card-hover border border-red-200">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🩸</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Blood Group</h3>
              <div className="text-4xl font-bold text-primary">{user?.bloodGroup}</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center card-hover border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Location</h3>
              <div className="text-2xl font-bold text-blue-600">{user?.city}</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center card-hover border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Status</h3>
              <div className="text-2xl font-bold text-green-600">Active Donor</div>
              <p className="text-green-600 text-sm mt-1">Ready to help</p>
            </div>
          </div>
          
          {/* Main Action Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16 fade-in-up">
            <Link
              to="/create-request"
              className="gradient-red rounded-2xl p-12 text-white text-center card-hover shadow-2xl"
            >
              <div className="text-6xl mb-6">🩸</div>
              <h3 className="text-3xl font-bold mb-4">Create Blood Request</h3>
              <p className="text-xl opacity-90 leading-relaxed">
                Need blood? Create a request and connect with willing donors instantly
              </p>
            </Link>
            
            <Link
              to="/requests"
              className="bg-white border-4 border-primary text-primary rounded-2xl p-12 text-center card-hover shadow-2xl hover:bg-primary hover:text-white transition-all duration-300"
            >
              <div className="text-6xl mb-6">🩸</div>
              <h3 className="text-3xl font-bold mb-4">Donate Blood</h3>
              <p className="text-xl opacity-75 leading-relaxed">
                Browse active requests near you and help save lives today
              </p>
            </Link>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <Link
                to="/profile"
                className="bg-white rounded-xl p-6 text-center card-hover shadow-md border border-gray-100"
              >
                <div className="text-3xl mb-3">👤</div>
                <div className="font-semibold text-gray-900">Edit Profile</div>
              </Link>
              <Link
                to={`/users/${user?.id}/history`}
                className="bg-white rounded-xl p-6 text-center card-hover shadow-md border border-gray-100"
              >
                <div className="text-3xl mb-3">📋</div>
                <div className="font-semibold text-gray-900">View History</div>
              </Link>
              <Link
                to="/gallery"
                className="bg-white rounded-xl p-6 text-center card-hover shadow-md border border-gray-100"
              >
                <div className="text-3xl mb-3">📸</div>
                <div className="font-semibold text-gray-900">Gallery</div>
              </Link>
              <Link
                to="/requests"
                className="bg-primary text-white rounded-xl p-6 text-center card-hover shadow-md"
              >
                <div className="text-3xl mb-3">🩸</div>
                <div className="font-semibold">Donate Blood</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;