import { useState, useEffect } from 'react';
import { requestAPI } from '../api/axios';
import RequestCard from '../components/RequestCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    bloodGroup: '',
    city: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setError('');
      const response = await requestAPI.getAll();
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to load blood requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(request => {
    return (
      (!filters.bloodGroup || request.bloodGroup === filters.bloodGroup) &&
      (!filters.city || request.location.toLowerCase().includes(filters.city.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <LoadingSpinner fullScreen text="Loading blood requests..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Active Blood Requests</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find requests near you and help save lives
            </p>
          </div>
          
          {error && (
            <div className="mb-8">
              <ErrorAlert error={error} onClose={() => setError('')} />
            </div>
          )}
          
          {/* Filter Section */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 mb-12 fade-in-up">
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-3">🔍</span>
              <h3 className="text-2xl font-bold text-gray-900">Filter Requests</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Blood Group
                </label>
                <select
                  value={filters.bloodGroup}
                  onChange={(e) => setFilters({...filters, bloodGroup: e.target.value})}
                  className="select-field w-full"
                >
                  <option value="">All Blood Groups</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  City
                </label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                  placeholder="Enter city name"
                  className="input-field w-full"
                />
              </div>
            </div>
            {(filters.bloodGroup || filters.city) && (
              <button 
                onClick={() => setFilters({ bloodGroup: '', city: '' })}
                className="mt-4 text-primary hover:text-red-600 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
          
          {/* Results */}
          {filteredRequests.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No blood requests found</h3>
              <p className="text-gray-600 text-lg">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-up">
              {filteredRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsList;