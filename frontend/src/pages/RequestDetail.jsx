import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const RequestDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      const response = await requestAPI.getById(id);
      setRequest(response.data);
    } catch (error) {
      console.error('Error fetching request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinQueue = async () => {
    setActionLoading(true);
    try {
      await requestAPI.join(id);
      fetchRequest();
    } catch (error) {
      console.error('Error joining queue:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeaveQueue = async () => {
    setActionLoading(true);
    try {
      await requestAPI.leave(id);
      fetchRequest();
    } catch (error) {
      console.error('Error leaving queue:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteRequest = async () => {
    setActionLoading(true);
    try {
      await requestAPI.complete(id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing request:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const isInQueue = request?.donationQueue.some(entry => entry.donorId === user?.id);
  const isRequester = request?.requesterId === user?.id;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Request not found</h2>
          <button
            onClick={() => navigate('/requests')}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <div className="bg-gray-50 rounded-lg shadow-md border border-gray-100 p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {request.bloodGroup} Blood Request
                </h1>
                <p className="text-gray-600">
                  Requested by {request.requester.name} • {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                request.status === 'active' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {request.status === 'active' ? 'Active' : 'Completed'}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Request Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Blood Group:</span> {request.bloodGroup}</p>
                  <p><span className="font-medium">Units Needed:</span> {request.unitsNeeded}</p>
                  <p><span className="font-medium">Location:</span> {request.location}</p>
                  <p><span className="font-medium">Contact:</span> {request.requester.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Donation Queue</h3>
                <p className="text-2xl font-bold text-primary mb-2">
                  {request.donationQueue.length} Donors
                </p>
                <p className="text-gray-600">Ready to help</p>
              </div>
            </div>
            
            {request.message && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Additional Message</h3>
                <p className="text-gray-700 italic">"{request.message}"</p>
              </div>
            )}
            
            {request.status === 'active' && (
              <div className="flex gap-4">
                {!isRequester && (
                  <>
                    {!isInQueue ? (
                      <button
                        onClick={handleJoinQueue}
                        disabled={actionLoading}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 disabled:opacity-50"
                      >
                        {actionLoading ? 'Joining...' : 'Join Donation Queue'}
                      </button>
                    ) : (
                      <button
                        onClick={handleLeaveQueue}
                        disabled={actionLoading}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50"
                      >
                        {actionLoading ? 'Leaving...' : 'Leave Queue'}
                      </button>
                    )}
                  </>
                )}
                
                {isRequester && (
                  <button
                    onClick={handleCompleteRequest}
                    disabled={actionLoading}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:opacity-50"
                  >
                    {actionLoading ? 'Completing...' : 'Mark as Completed'}
                  </button>
                )}
              </div>
            )}
          </div>
          
          {request.donationQueue.length > 0 && (
            <div className="bg-gray-50 rounded-lg shadow-md border border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Donors in Queue</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {request.donationQueue.map((entry, index) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{entry.donor.name}</p>
                        <p className="text-sm text-gray-600">{entry.donor.bloodGroup} • {entry.donor.city}</p>
                      </div>
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;