import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';

// Donor Card Component
const DonorCard = ({ donor, position, joinedAt, isRequester }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
            #{position}
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">{donor.name}</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                {donor.bloodGroup}
              </span>
              <span>•</span>
              <span>{donor.city}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 mb-1">Joined</div>
          <div className="text-sm font-medium text-gray-700">
            {formatDate(joinedAt)}
          </div>
        </div>
      </div>

      {isRequester && (
        <>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium mb-3"
          >
            {showDetails ? '🔼 Hide Contact Details' : '📞 Show Contact Details'}
          </button>

          {showDetails && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">📧 Email:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{donor.email}</span>
                  <button
                    onClick={() => handleEmail(donor.email)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors duration-300"
                  >
                    Email
                  </button>
                </div>
              </div>
              
              {donor.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">📞 Phone:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{donor.phone}</span>
                    <button
                      onClick={() => handleCall(donor.phone)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors duration-300"
                    >
                      Call
                    </button>
                  </div>
                </div>
              )}
              
              <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Donor Status</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Ready to Donate</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {!isRequester && (
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-blue-700 font-medium">You are in the donation queue</span>
          </div>
        </div>
      )}
    </div>
  );
};


const RequestDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    if (!user) {
      navigate('/login');
      return;
    }
    
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🩸</span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {request.bloodGroup} Blood Request
                  </h1>
                </div>
                <p className="text-gray-600 text-lg">
                  Requested by <span className="font-semibold text-gray-800">{request.requester.name}</span> • {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-6 py-3 rounded-xl text-sm font-bold shadow-md ${
                request.status === 'active' 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-green-100 text-green-800 border border-green-200'
              }`}>
                {request.status === 'active' ? '✨ Active' : '✅ Completed'}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  📝 Request Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Blood Group:</span>
                    <span className="bg-primary text-white px-3 py-1 rounded-full font-bold">{request.bloodGroup}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Units Needed:</span>
                    <span className="font-bold text-gray-900">{request.unitsNeeded}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-900">{request.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <a href={`mailto:${request.requester.email}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      {request.requester.email}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  👥 Donation Queue
                </h3>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">
                    {request.donationQueue.length}
                  </p>
                  <p className="text-gray-700 font-medium">
                    {request.donationQueue.length === 1 ? 'Donor Ready' : 'Donors Ready'}
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Active Queue</span>
                  </div>
                </div>
              </div>
            </div>
            
            {request.message && (
              <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  💬 Additional Message
                </h3>
                <p className="text-gray-800 italic text-lg leading-relaxed">
                  "{request.message}"
                </p>
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
          
          {request.donationQueue.length > 0 && (isRequester || isInQueue) && (
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {isRequester ? `Donors in Queue (${request.donationQueue.length})` : 'Donation Queue Status'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {request.donationQueue.map((entry, index) => (
                  <DonorCard 
                    key={entry.id} 
                    donor={entry.donor} 
                    position={index + 1}
                    joinedAt={entry.joinedAt}
                    isRequester={isRequester}
                  />
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