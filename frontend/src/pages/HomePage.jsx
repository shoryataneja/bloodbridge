import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { requestAPI } from '../api/axios';
import { 
  Droplet, 
  Hospital, 
  Users, 
  Search, 
  Heart, 
  TrendingUp, 
  HandHeart, 
  Award, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Star,
  ArrowRight,
  Calendar,
  Activity
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const [urgentRequests, setUrgentRequests] = useState([]);

  const stats = {
    totalDonors: 15420,
    totalDonations: 8750,
    livesSaved: 26250,
    pendingRequests: 42
  };

  useEffect(() => {
    fetchUrgentRequests();
  }, []);

  const fetchUrgentRequests = async () => {
    try {
      const response = await requestAPI.getAll();
      const urgent = response.data.filter(req => 
        ['urgent', 'critical', 'today'].includes(req.urgency)
      ).slice(0, 3);
      setUrgentRequests(urgent);
    } catch (error) {
      console.error('Error fetching urgent requests:', error);
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Droplet className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Save Lives with <span className="text-red-600">BloodBridge</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect blood donors with those in need through our secure, efficient platform. 
              Every donation counts, every life matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
              <Link
                to={user ? "/requests" : "/signup"}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <Droplet className="w-5 h-5 mr-2" />
                Donate Blood Now
              </Link>
              <Link
                to={user ? "/create-request" : "/signup"}
                className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <Hospital className="w-5 h-5 mr-2" />
                Request Blood
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Secure & Verified
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                24/7 Available
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                FDA Compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Stats Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Statistics</h2>
              <p className="text-gray-600">Real-time data showing our community impact</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center p-4 md:p-6 bg-red-50 rounded-lg">
                <Users className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalDonors.toLocaleString()}</p>
                <p className="text-sm font-medium text-gray-600">Registered Donors</p>
                <p className="text-xs text-gray-500 mt-1">Active community members</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Droplet className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalDonations.toLocaleString()}</p>
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-xs text-gray-500 mt-1">Units collected</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Heart className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900 mb-1">{stats.livesSaved.toLocaleString()}</p>
                <p className="text-sm font-medium text-gray-600">Lives Saved</p>
                <p className="text-xs text-gray-500 mt-1">Estimated impact</p>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <Activity className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900 mb-1">{stats.pendingRequests}</p>
                <p className="text-sm font-medium text-gray-600">Active Requests</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting donors</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How BloodBridge Works</h2>
              <p className="text-gray-600">Simple steps to save lives or get help</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* For Donors */}
              <div className="border border-gray-200 rounded-lg p-4 md:p-6">
                <div className="flex items-center mb-4">
                  <Droplet className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">For Donors</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-red-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Register & Verify</h4>
                      <p className="text-sm text-gray-600">Create account with medical verification</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-red-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Find Requests</h4>
                      <p className="text-sm text-gray-600">Browse compatible blood requests nearby</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-red-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Donate & Earn</h4>
                      <p className="text-sm text-gray-600">Complete donation and receive certificates</p>
                    </div>
                  </div>
                </div>
                <Link
                  to={user ? "/requests" : "/signup"}
                  className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Start Donating
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              
              {/* For Recipients */}
              <div className="border border-gray-200 rounded-lg p-4 md:p-6">
                <div className="flex items-center mb-4">
                  <Hospital className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">For Recipients</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Create Request</h4>
                      <p className="text-sm text-gray-600">Submit blood requirement details</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Get Matched</h4>
                      <p className="text-sm text-gray-600">Receive notifications from compatible donors</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Coordinate</h4>
                      <p className="text-sm text-gray-600">Connect with donors and arrange donation</p>
                    </div>
                  </div>
                </div>
                <Link
                  to={user ? "/create-request" : "/signup"}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Request Blood
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Choose BloodBridge</h2>
              <p className="text-gray-600">Advanced features for safe and efficient blood donation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Verified</h3>
                <p className="text-gray-600 text-sm mb-3">
                  All users undergo medical verification and background checks for safety
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Medical history verification</li>
                  <li>• Identity confirmation</li>
                  <li>• Regular health updates</li>
                </ul>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Matching</h3>
                <p className="text-gray-600 text-sm mb-3">
                  AI-powered algorithms match donors with recipients based on compatibility
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Blood type compatibility</li>
                  <li>• Geographic proximity</li>
                  <li>• Urgency prioritization</li>
                </ul>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Recognition System</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Earn badges, certificates, and recognition for your life-saving contributions
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Digital certificates</li>
                  <li>• Achievement badges</li>
                  <li>• Leaderboard rankings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Urgent Requests Section */}
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 text-red-600 mr-2" />
                    Urgent Blood Requests
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Critical requests requiring immediate attention</p>
                </div>
                <Link 
                  to="/requests" 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              {urgentRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {urgentRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Droplet className="w-4 h-4 text-red-600 mr-2" />
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {request.bloodGroup}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                          request.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' :
                          request.urgency === 'today' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {getUrgencyLabel(request.urgency)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {request.unitsNeeded} Units Required
                      </h4>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {request.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <Calendar className="w-3 h-3 mr-1" />
                        Posted {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                      <Link 
                        to={user ? `/requests/${request.id}` : '/login'}
                        className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Respond Now
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Urgent Requests</h3>
                  <p className="text-sm text-gray-600 mb-4">All current requests are being handled by our community</p>
                  <Link 
                    to="/requests"
                    className="text-red-600 hover:text-red-700 font-medium text-sm inline-flex items-center"
                  >
                    View All Requests
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Testimonials Section */}
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Success Stories</h2>
                <p className="text-gray-600">Real experiences from our community members</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                      <p className="text-sm text-gray-600">Regular Donor</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm italic mb-3">
                    "BloodBridge made donating blood so easy. I've helped save 12 lives in the past year!"
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-2" />
                    Verified Donor
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Hospital className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Dr. Michael Chen</h4>
                      <p className="text-sm text-gray-600">Emergency Physician</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm italic mb-3">
                    "This platform helped us find compatible donors within hours during a critical emergency."
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-2" />
                    Medical Professional
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                      <p className="text-sm text-gray-600">Recipient's Family</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm italic mb-3">
                    "When my father needed blood urgently, BloodBridge connected us with donors immediately."
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <Star className="w-3 h-3 text-yellow-500 mr-2" />
                    Grateful Family
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Support</h2>
              <p className="text-gray-600">Need help? Our team is here to assist you 24/7</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Hotline</h3>
                <p className="text-gray-600 text-sm mb-2">24/7 emergency support</p>
                <p className="text-green-600 font-semibold">+91 8882096255</p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-2">General inquiries</p>
                <p className="text-blue-600 font-semibold">shoryataneja5@gmail.com</p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <MapPin className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm mb-2">Main office location</p>
                <p className="text-red-600 font-semibold">123 Healthcare Ave, NY</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      

    </div>
  );
};

export default HomePage;