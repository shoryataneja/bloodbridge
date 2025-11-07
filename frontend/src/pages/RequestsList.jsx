import { useState, useEffect } from 'react';
import { requestAPI } from '../api/axios';
import RequestCard from '../components/RequestCard';
import { Filter, Search } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    city: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getAll();
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
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
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Active Blood Requests</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Find requests near you and help save lives
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg shadow-md border border-gray-100 p-6 mb-8">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Filter size={24} className="text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Filter Requests</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text text-base font-medium text-gray-700">Blood Group</span>
                  </label>
                  <select
                    value={filters.bloodGroup}
                    onChange={(e) => setFilters({...filters, bloodGroup: e.target.value})}
                    className="select select-bordered w-full"
                  >
                    <option value="">All Blood Groups</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text text-base font-medium text-gray-700">City</span>
                  </label>
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-3 text-neutral/50" />
                    <input
                      type="text"
                      value={filters.city}
                      onChange={(e) => setFilters({...filters, city: e.target.value})}
                      placeholder="Enter city name"
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                </div>
              </div>
              {(filters.bloodGroup || filters.city) && (
                <button 
                  onClick={() => setFilters({ bloodGroup: '', city: '' })}
                  className="btn btn-ghost btn-sm mt-2"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No blood requests found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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