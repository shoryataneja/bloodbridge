import { useEffect } from 'react';
import { Heart, Users, Shield, Zap, Award, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const stats = [
    { number: '10,000+', label: 'Lives Saved', icon: Heart },
    { number: '5,000+', label: 'Active Donors', icon: Users },
    { number: '50+', label: 'Partner Hospitals', icon: MapPin },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  const features = [
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by the community, for the community. We believe in the power of people helping people.'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your privacy and security are our top priorities. All data is encrypted and protected.'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Quick connections between donors and recipients when every second counts.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Medical Director',
      description: 'Leading hematologist with 15+ years in blood banking'
    },
    {
      name: 'Michael Chen',
      role: 'Technology Lead',
      description: 'Expert in healthcare technology and platform development'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      description: 'Passionate about connecting donors with those in need'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About BloodBridge</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting hearts, saving lives through the power of community and technology
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                BloodBridge was created with a simple yet powerful mission: to bridge the gap between blood donors and those in critical need. We believe that every drop of blood donated has the potential to save lives and create hope.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our platform leverages modern technology to make blood donation more accessible, efficient, and impactful. We connect generous donors with patients and hospitals, ensuring that life-saving blood reaches those who need it most.
              </p>
              <div className="bg-red-50 border-l-4 border-primary p-4 rounded">
                <p className="text-primary font-semibold">
                  "One blood donation can save up to three lives. Your contribution makes a real difference."
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8">
              <div className="text-center">
                <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Every Drop Counts</h3>
                <p className="text-gray-700 mb-6">
                  Join thousands of heroes who have already made a difference through BloodBridge.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-bold text-primary">450ml</div>
                    <div className="text-gray-600">Standard Donation</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-bold text-primary">3 Lives</div>
                    <div className="text-gray-600">Can Be Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BloodBridge?</h2>
            <p className="text-xl text-gray-600">Built with care, designed for impact</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals working to save lives</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-red-100 mb-8">
            Join our community of life-savers. Whether you want to donate or need blood, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Become a Donor
            </Link>
            <Link
              to="/requests"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Find Blood
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;