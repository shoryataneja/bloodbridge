import { Link } from 'react-router-dom';

const RequestCard = ({ request }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {request.bloodGroup} Blood Needed
          </h3>
          <p className="text-gray-600">{request.unitsNeeded} units required</p>
        </div>
        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
          Urgent
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-700">
          <span className="font-medium">Location:</span> {request.location}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Requested by:</span> {request.requester.name}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Donors in queue:</span> {request.donationQueue.length}
        </p>
      </div>
      
      {request.message && (
        <p className="text-gray-600 text-sm mb-4 italic">"{request.message}"</p>
      )}
      
      <Link
        to={`/requests/${request.id}`}
        className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
      >
        View Details & Donate
      </Link>
    </div>
  );
};

export default RequestCard;