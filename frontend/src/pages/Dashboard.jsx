import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome back, {user?.name}!
          </h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Blood Group</h3>
              <p className="text-3xl font-bold text-primary">{user?.bloodGroup}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-xl text-gray-600">{user?.city}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Status</h3>
              <p className="text-xl text-green-600 font-semibold">Active Donor</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/create-request"
              className="bg-primary text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
            >
              <div className="text-4xl mb-4">🩸</div>
              <h3 className="text-xl font-semibold mb-2">Create Blood Request</h3>
              <p className="text-red-100">Need blood? Create a request and connect with donors</p>
            </Link>
            
            <Link
              to="/requests"
              className="bg-white border-2 border-primary text-primary p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center hover:bg-primary hover:text-white"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Find Blood Requests</h3>
              <p className="opacity-75">Browse active requests and help save lives</p>
            </Link>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/profile"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                Edit Profile
              </Link>
              <Link
                to={`/users/${user?.id}/history`}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                View History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;