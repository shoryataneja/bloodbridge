import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="hero min-h-96 gradient-red">
        <div className="hero-content text-center text-white">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6">Get in Touch</h1>
            <p className="text-lg text-white">
              Have questions? Need help? We're here for you. Reach out to us anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="heading-xl text-neutral mb-4">Send Us a Message</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Fill out the form and we'll get back to you within 24 hours
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="label">
                    <span className="label-text text-base font-medium text-gray-700">Your Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-base font-medium text-gray-700">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-base font-medium text-gray-700">Subject</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-base font-medium text-gray-700">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="textarea textarea-bordered w-full"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <h2 className="heading-xl text-neutral mb-4">Contact Information</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Other ways to reach us
                </p>
              </div>

              <div className="space-y-6">
                <div className="card bg-gray-50 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Phone size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="heading-sm text-neutral mb-2">Phone</h3>
                        <p className="text-base text-gray-700">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-600">Mon-Fri 9am-6pm EST</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-gray-50 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Mail size={24} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="heading-sm text-neutral mb-2">Email</h3>
                        <p className="text-base text-gray-700">info@bloodbridge.org</p>
                        <p className="text-sm text-gray-600">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-gray-50 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                        <MapPin size={24} className="text-success" />
                      </div>
                      <div>
                        <h3 className="heading-sm text-neutral mb-2">Office</h3>
                        <p className="text-base text-gray-700">
                          123 Healthcare Avenue<br />
                          Medical District<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-gray-50 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                        <Clock size={24} className="text-warning" />
                      </div>
                      <div>
                        <h3 className="heading-sm text-neutral mb-2">Business Hours</h3>
                        <p className="text-base text-gray-700">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="mb-12 text-center">
              <h2 className="heading-xl text-neutral mb-4">Find Us</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Visit our office
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <iframe 
                src="https://maps.google.com/maps?width=100%25&height=400&hl=en&q=40.7589,-73.9851&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                width="100%" 
                height="450" 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;