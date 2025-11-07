import { Heart, Target, Eye, Users, Award, TrendingUp } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import StatCard from '../components/StatCard';

const About = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-96 gradient-red">
        <div className="hero-content text-center text-white">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6">About BloodBridge</h1>
            <p className="body-lg">
              Connecting donors with those in need, one drop at a time. 
              We're building a community of life-savers across the nation.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl">
              <div className="card-body">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Target size={32} className="text-primary" />
                </div>
                <h2 className="heading-lg text-neutral mb-4">Our Mission</h2>
                <p className="text-base text-gray-700">
                  To create a seamless, trustworthy platform that connects blood donors with those in critical need, 
                  ensuring no life is lost due to blood shortage. We strive to make blood donation accessible, 
                  rewarding, and a source of pride for every donor.
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-accent/10 to-accent/5 shadow-xl">
              <div className="card-body">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Eye size={32} className="text-accent" />
                </div>
                <h2 className="heading-lg text-neutral mb-4">Our Vision</h2>
                <p className="text-base text-gray-700">
                  A world where every person in need of blood receives it on time. We envision a future where 
                  blood donation is as common as any other act of kindness, and where technology bridges the gap 
                  between donors and recipients instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading 
                title="Our Story"
                subtitle="How BloodBridge came to be"
                centered={false}
              />
              <div className="space-y-4 text-base text-gray-700">
                <p>
                  BloodBridge was founded in 2020 by a group of healthcare professionals and tech enthusiasts 
                  who witnessed firsthand the challenges of finding blood donors during emergencies.
                </p>
                <p>
                  What started as a small community initiative has now grown into a nationwide platform, 
                  connecting thousands of donors with those in need. Our technology-driven approach has 
                  reduced the time to find donors from days to hours.
                </p>
                <p>
                  Today, we're proud to have facilitated over 8,000 successful donations and saved more than 
                  26,000 lives. But we're just getting started.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1653508311361-5c3325ab051d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxtZWRpY2FsJTIwdGVhbSUyMGhlYWx0aGNhcmUlMjB3b3JrZXJzJTIwdm9sdW50ZWVycyUyMGRpdmVyc2UlMjBncm91cHxlbnwwfDB8fHwxNzYyNTQ0NzUzfDA&ixlib=rb-4.1.0&q=85"
                alt="Our team - Angels for Humanity on Unsplash"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="heading-xl text-neutral mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Numbers that tell our story
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={Users}
              label="Active Donors"
              value={15420}
              suffix="+"
              color="primary"
            />
            <StatCard 
              icon={Heart}
              label="Successful Donations"
              value={8750}
              suffix="+"
              color="accent"
            />
            <StatCard 
              icon={Award}
              label="Lives Saved"
              value={26250}
              suffix="+"
              color="success"
            />
            <StatCard 
              icon={TrendingUp}
              label="Cities Covered"
              value={150}
              suffix="+"
              color="info"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="heading-xl text-neutral mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Heart size={48} className="text-primary mb-4" />
                <h3 className="heading-md text-neutral mb-3">Compassion</h3>
                <p className="text-base text-gray-600">
                  Every action we take is driven by empathy and the desire to help those in need.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Users size={48} className="text-accent mb-4" />
                <h3 className="heading-md text-neutral mb-3">Community</h3>
                <p className="text-base text-gray-600">
                  We believe in the power of community and collective action to create change.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Award size={48} className="text-success mb-4" />
                <h3 className="heading-md text-neutral mb-3">Excellence</h3>
                <p className="text-base text-gray-600">
                  We strive for excellence in every aspect of our service and technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-xl text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg text-white mb-8">
            Be part of a community that's making a real difference. Every donor counts, every donation matters.
          </p>
          <a href="/signup" className="btn btn-lg bg-white text-primary hover:bg-base-200">
            Become a Donor Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;