import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Droplet, Search, User, History, Camera } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome back, <span className="text-primary">{user?.name}</span>!
          </h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="stats shadow-lg">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <Droplet size={40} />
                </div>
                <div className="stat-title">Your Blood Group</div>
                <div className="stat-value text-primary">{user?.bloodGroup}</div>
              </div>
            </div>
            
            <div className="stats shadow-lg">
              <div className="stat">
                <div className="stat-title">Location</div>
                <div className="stat-value text-2xl text-neutral">{user?.city}</div>
              </div>
            </div>
            
            <div className="stats shadow-lg">
              <div className="stat">
                <div className="stat-title">Status</div>
                <div className="stat-value text-2xl text-success">Active Donor</div>
                <div className="stat-desc">Ready to help</div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/create-request"
              className="card bg-gradient-to-br from-primary to-accent text-white shadow-2xl hover-lift"
            >
              <div className="card-body items-center text-center">
                <Droplet size={64} className="mb-4" />
                <h3 className="heading-lg mb-2">Create Blood Request</h3>
                <p className="body-base opacity-90">Need blood? Create a request and connect with willing donors instantly</p>
              </div>
            </Link>
            
            <Link
              to="/requests"
              className="card bg-white border-2 border-primary text-primary shadow-2xl hover-lift hover:bg-primary hover:text-white transition-all"
            >
              <div className="card-body items-center text-center">
                <Search size={64} className="mb-4" />
                <h3 className="heading-lg mb-2">Find Blood Requests</h3>
                <p className="body-base opacity-75">Browse active requests near you and help save lives today</p>
              </div>
            </Link>
          </div>
          
          <div className="bg-gray-50 rounded-lg shadow-md border border-gray-100 p-6">
            <div className="card-body">
              <h3 className="heading-md text-neutral mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Link
                  to="/profile"
                  className="btn btn-outline gap-2"
                >
                  <User size={20} />
                  Edit Profile
                </Link>
                <Link
                  to={`/users/${user?.id}/history`}
                  className="btn btn-outline gap-2"
                >
                  <History size={20} />
                  View History
                </Link>
                <Link
                  to="/gallery"
                  className="btn btn-outline gap-2"
                >
                  <Camera size={20} />
                  Gallery
                </Link>
                <Link
                  to="/requests"
                  className="btn btn-primary gap-2"
                >
                  <Search size={20} />
                  Browse Requests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;