import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../api/axios';

const History = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [history, setHistory] = useState({ requests: [], donations: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    fetchHistory();
  }, [id]);

  const fetchHistory = async () => {
    try {
      const response = await userAPI.getHistory(id);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {user?.id === id ? 'Your History' : 'User History'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your blood donation requests and contributions
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-xl p-2 inline-flex">
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'requests'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🩸 Blood Requests ({history.requests?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('donations')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'donations'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ❤️ Donations ({history.donations?.length || 0})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="fade-in-up">
            {activeTab === 'requests' && (
              <div>
                {history.requests?.length > 0 ? (
                  <div className="grid gap-6">
                    {history.requests.map((request) => (
                      <div key={request.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {request.bloodGroup} Blood Request
                            </h3>
                            <p className="text-gray-600">
                              {request.unitsNeeded} units needed • {formatDate(request.createdAt)}
                            </p>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                            {request.status === 'active' ? 'Active' : 'Completed'}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                            <p className="text-gray-600">{request.location}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Donors in Queue</h4>
                            <p className="text-gray-600">{request.donationQueue?.length || 0} donors</p>
                          </div>
                        </div>
                        
                        {request.message && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Message</h4>
                            <p className="text-gray-700 italic">"{request.message}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-6">🩸</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No Blood Requests</h3>
                    <p className="text-gray-600 text-lg mb-8">You haven't created any blood requests yet.</p>
                    <a
                      href="/create-request"
                      className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg inline-block"
                    >
                      Create Your First Request
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'donations' && (
              <div>
                {history.donations?.length > 0 ? (
                  <div className="grid gap-6">
                    {history.donations.map((donation) => (
                      <div key={donation.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              Donation to {donation.request.bloodGroup} Request
                            </h3>
                            <p className="text-gray-600">
                              Joined queue on {formatDate(donation.joinedAt)}
                            </p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                            ❤️ Donor
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Requested by</h4>
                            <p className="text-gray-600">{donation.request.requester.name}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                            <p className="text-gray-600">{donation.request.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-6">❤️</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No Donations Yet</h3>
                    <p className="text-gray-600 text-lg mb-8">You haven't joined any donation queues yet.</p>
                    <a
                      href="/requests"
                      className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg inline-block"
                    >
                      Browse Blood Requests
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;