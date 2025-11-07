import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Users, Award, Clock, Droplet, Shield, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import SectionHeading from '../components/SectionHeading';
import TestimonialCard from '../components/TestimonialCard';

const HomePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDonors: 15420,
    totalDonations: 8750,
    livesSaved: 26250,
    pendingRequests: 42
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="hero min-h-screen relative"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbCUyMGhlYWx0aGNhcmUlMjB2b2x1bnRlZXJ8ZW58MHwwfHxyZWR8MTc2MjU0NDc1M3ww&ixlib=rb-4.1.0&q=85)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="hero-content text-left text-neutral-content max-w-7xl w-full px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="fade-in">
              <h1 className="heading-hero text-white mb-6">
                Every Drop <span className="text-primary">Counts</span>.<br />
                Every Donation <span className="text-accent">Saves Lives</span>.
              </h1>
              <p className="text-lg text-white mb-8 max-w-xl leading-relaxed">
                Join thousands of heroes who are making a difference. Your blood donation can save up to three lives. 
                Be the reason someone smiles today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to={user ? "/requests" : "/signup"}
                  className="btn btn-primary btn-lg"
                >
                  <Droplet size={20} />
                  Donate Now
                </Link>
                <Link
                  to={user ? "/create-request" : "/signup"}
                  className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-neutral"
                >
                  Request Blood
                </Link>
              </div>

              {/* Quick Stats Overlay */}
              <div className="grid grid-cols-3 gap-4 glass-card rounded-box p-6">
                <div className="text-center">
                  <div className="heading-lg text-primary">{stats.totalDonors.toLocaleString()}+</div>
                  <div className="text-sm font-medium text-white">Donors</div>
                </div>
                <div className="text-center">
                  <div className="heading-lg text-accent">{stats.totalDonations.toLocaleString()}+</div>
                  <div className="text-sm font-medium text-white">Donations</div>
                </div>
                <div className="text-center">
                  <div className="heading-lg text-success">{stats.livesSaved.toLocaleString()}+</div>
                  <div className="text-sm font-medium text-white">Lives Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="heading-xl text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Real-time statistics showing the difference we're making together
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-up">
            <StatCard 
              icon={Users}
              label="Registered Donors"
              value={stats.totalDonors}
              suffix="+"
              color="primary"
            />
            <StatCard 
              icon={Droplet}
              label="Total Donations"
              value={stats.totalDonations}
              suffix="+"
              color="accent"
            />
            <StatCard 
              icon={Heart}
              label="Lives Saved"
              value={stats.livesSaved}
              suffix="+"
              color="success"
            />
            <StatCard 
              icon={Clock}
              label="Pending Requests"
              value={stats.pendingRequests}
              color="warning"
            />
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="heading-xl text-neutral mb-4">Why Your Donation Matters</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding the critical importance of blood donation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl hover-lift">
              <div className="card-body items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Heart size={40} className="text-primary" />
                </div>
                <h3 className="heading-md text-neutral mb-3">Save Lives</h3>
                <p className="text-base text-gray-600">
                  One donation can save up to 3 lives. Your contribution directly impacts patients in critical need.
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-accent/10 to-accent/5 shadow-xl hover-lift">
              <div className="card-body items-center text-center">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Shield size={40} className="text-accent" />
                </div>
                <h3 className="heading-md text-neutral mb-3">Health Benefits</h3>
                <p className="text-base text-gray-600">
                  Regular donation reduces iron overload, improves cardiovascular health, and provides free health screening.
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-success/10 to-success/5 shadow-xl hover-lift">
              <div className="card-body items-center text-center">
                <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-4">
                  <Award size={40} className="text-success" />
                </div>
                <h3 className="heading-md text-neutral mb-3">Recognition</h3>
                <p className="text-base text-gray-600">
                  Receive digital certificates, badges, and join our community of life-saving heroes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Requests Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="heading-xl text-neutral mb-4">Urgent Blood Requests</h2>
              <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                People who need your help right now
              </p>
            </div>
            <Link to="/requests" className="btn btn-primary">
              View All Requests
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { bloodGroup: 'O+', units: 2, location: 'City Hospital, Mumbai', urgency: 'Critical' },
              { bloodGroup: 'AB-', units: 1, location: 'Metro Medical, Delhi', urgency: 'Urgent' },
              { bloodGroup: 'B+', units: 3, location: 'Care Hospital, Bangalore', urgency: 'Needed' }
            ].map((request, index) => (
              <div key={index} className="card bg-base-100 shadow-xl hover-lift">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <div className="badge badge-error badge-lg">{request.bloodGroup}</div>
                    <div className="badge badge-outline badge-warning">{request.urgency}</div>
                  </div>
                  <h3 className="heading-sm text-neutral mb-2">{request.units} Units Needed</h3>
                  <p className="text-sm text-gray-600 mb-4">{request.location}</p>
                  <Link to="/requests" className="btn btn-primary btn-sm btn-block">
                    Respond to Request
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stories from Our Heroes</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Real experiences from donors and recipients
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="text-4xl text-primary mb-4">"</div>
              <p className="text-gray-800 mb-4 italic">
                Donating blood has become a meaningful part of my life. Knowing that I'm helping save lives gives me immense satisfaction.
              </p>
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?img=1" alt="Sarah Johnson" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Regular Donor</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="text-4xl text-primary mb-4">"</div>
              <p className="text-gray-800 mb-4 italic">
                BloodBridge helped us find donors when my father needed emergency surgery. We're forever grateful to this community.
              </p>
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?img=2" alt="Michael Chen" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Recipient's Family</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="text-4xl text-primary mb-4">"</div>
              <p className="text-gray-800 mb-4 italic">
                I was nervous at first, but the process was smooth and the staff was incredibly supportive. I'll definitely donate again!
              </p>
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?img=3" alt="Priya Sharma" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                  <p className="text-gray-600 text-sm">First-time Donor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-xl text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-white mb-8">
            Join our community of life-savers today. Your single act of kindness can create a ripple effect of hope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn btn-lg bg-white text-primary hover:bg-base-200">
              <Users size={20} />
              Become a Donor
            </Link>
            <Link to="/about" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;