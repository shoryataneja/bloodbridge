import { Link } from 'react-router-dom';

const RequestCard = ({ request }) => {
  const getUrgencyColor = (urgency) => {
    const colors = {
      'critical': 'bg-red-600 text-white',
      'urgent': 'bg-orange-500 text-white',
      'today': 'bg-yellow-500 text-white',
      'needed': 'bg-blue-500 text-white'
    };
    return colors[urgency] || 'bg-gray-500 text-white';
  };

  const getUrgencyLabel = (urgency) => {
    const labels = {
      'critical': 'Critical',
      'urgent': 'Urgent',
      'today': 'Needed Today',
      'needed': 'Needed'
    };
    return labels[urgency] || 'Needed';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 md:p-6 hover:shadow-lg transition-shadow duration-300 fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {request.bloodGroup} Blood Needed
          </h3>
          <p className="text-gray-700">{request.unitsNeeded} units required</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(request.urgency)}`}>
          {getUrgencyLabel(request.urgency)}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-800">
          <span className="font-medium">Location:</span> {request.location}
        </p>
        <p className="text-gray-800">
          <span className="font-medium">Requested by:</span> {request.requester.name}
        </p>
        <p className="text-gray-800">
          <span className="font-medium">Donors in queue:</span> {request.donationQueue.length}
        </p>
      </div>
      
      {request.message && (
        <p className="text-gray-800 text-sm mb-4 italic bg-gray-50 p-3 rounded border">
          "{request.message}"
        </p>
      )}
      
      <Link
        to={`/requests/${request.id}`}
        className="block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium"
        aria-label={`View details for ${request.bloodGroup} blood request in ${request.location}`}
      >
        View Details & Donate
      </Link>
    </div>
  );
};

export default RequestCard;